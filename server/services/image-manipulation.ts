import sizeOf from "buffer-image-size"
import sharp from "sharp"
import logger from "../logger"
import { ensureGetStream, streamToBuffer } from "../helpers"


const FORMATS_TO_RESIZE = ['jpeg', 'jpg', 'png', 'webp', 'avif', 'tiff', 'gif', 'svg+xml']
const SUPPORTED_MIME_TYPES = FORMATS_TO_RESIZE.map(type => `image/${type}`)

export const isMimeTypeSupported = (mime: string) => SUPPORTED_MIME_TYPES.includes(mime)



export async function generateBlurredImage(data: any) {
    const { mime, name, hash } = data

    data.is_blurred = false
    data.can_be_blurred = false

    if (isMimeTypeSupported(mime)) {
        try {
            ensureGetStream(data)
            const orginalImageBuffer = await streamToBuffer(data.getStream())
            const bluredImageBuffer = await sharp(orginalImageBuffer).resize({ width: 16, fit: 'inside' }).jpeg({ quality: 75 }).toBuffer();
            const { height, width } = sizeOf(bluredImageBuffer)
            data.can_be_blurred = true

            const blurredImageFormat = {
                name,
                hash,
                ext: '.jpg',
                mime: 'image/jpeg',
                path: null,
                width,
                height,
                size: Number.parseFloat((Buffer.byteLength(bluredImageBuffer) / 1000).toFixed(2)),
                url: `data:image/jpg;base64, ${bluredImageBuffer.toString('base64')}`
            };

            const formats = { ...data.formats, blurred: blurredImageFormat }
            data.formats = formats
            data.is_blurred = true
        } catch (error) {
            logger.warn(`[blurred-image-format] Failed to generate blurred format for upload "${name}"`, error)
        }
    } else {
        data.can_be_blurred = false
    }
}
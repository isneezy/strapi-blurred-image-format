import sizeOf from "buffer-image-size"
import sharp from "sharp"
import logger from "../logger"

const FORMATS_TO_RESIZE = ['jpeg', 'jpg', 'png', 'webp', 'avif', 'tiff', 'gif', 'svg+xml']
const SUPPORTED_MIME_TYPES = FORMATS_TO_RESIZE.map(type => `image/${type}`)

export const isMimeTypeSupported = (mime: string) => SUPPORTED_MIME_TYPES.includes(mime)

export async function generateBlurredImage(data: any) {
    const { mime, name, hash, ext } = data

    data.is_blurred = false
    data.can_be_blurred = false

    if (isMimeTypeSupported(mime)) {
        try {
            const stream = data.getStream()
            const image = await sharp(stream.path).resize({ width: 16, fit: 'inside' }).jpeg({ quality: 75 }).toBuffer();
            const { height, width } = sizeOf(image)
            data.can_be_blurred = true

            const blurredImageFormat = {
                name,
                hash,
                ext: '.jpg',
                mime: 'image/jpeg',
                path: null,
                width,
                height,
                size: Number.parseFloat((Buffer.byteLength(image) / 1000).toFixed(2)),
                url: `data:image/pgeg;base64, ${image.toString('base64')}`
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
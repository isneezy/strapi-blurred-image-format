import logger from "../logger"
import path from 'node:path'
import fs from 'node:fs'

const MODEL_UUID = 'plugin::upload.file'

async function ensureGetStream(data: any) {
    const { url } = data
    if (data.provider !== 'local') {
        const filePath = path.join(strapi.dirs.static.public, data.url)
        data.getStream = () => fs.createReadStream(filePath)
    } else if (url.startsWith('http')) {
        const res = await fetch(url, {})
        const stream = (await res.blob()).stream()
        data.getStream = () => stream
    }
}

export async function migrate() {
    try {
        logger.info('[blurred-image-format] generating blurred image for older uploads')

        const items = await strapi.db.queryBuilder(MODEL_UUID).where({
            $or: [
                {
                    can_be_blurred: {
                        $null: true
                    },
                },
                {
                    is_blurred: { $eq: false },
                    can_be_blurred: { $eq: true }
                }
            ]
        }).execute<any[]>()

        if (items.length) logger.info(`[blurred-image-format] ${items.length} upload found, migrating...`)
        else {
            logger.info(`[blurred-image-format] no upload found, nothing to process`)
            return
        }

        const promisses = items.map(async (data) => {
            try {
                const uploadService = strapi.plugin('upload').service('upload')
                const { generateBlurredImage } = strapi.service('plugin::blurred-image-format.image-manipulation')
                await ensureGetStream(data)
                await generateBlurredImage(data)
                await uploadService.update(data.id, data)
            } catch (error) {
                logger.error(`[blurred-image-format] Failed to generate blurred image: `, error)
                throw error
            }
        })

        const res = await Promise.allSettled(promisses)
        const fulfilledCount = res.filter(res => res.status === 'fulfilled').length
        const rejectedCount = res.filter(res => res.status === 'rejected').length

        logger.info(
            `[blurred-image-format] Blurred image generation completed.
        Total upload files processed: ${items.length}
        Successful migrations: ${fulfilledCount}
        Failed migrations: ${rejectedCount}`
        )
    } catch (error) {
        logger.error('[blurred-image-format] Migration failed:', error)
    }
}
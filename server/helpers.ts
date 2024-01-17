import path from 'node:path'
import fs from 'node:fs'
import axios from 'axios'
import streamToArray from 'stream-to-array'

export async function ensureGetStream(data: any) {
    const { url } = data
    if (data.getStream) return
    else if (data.provider == 'local') {
        const filePath = path.join(strapi.dirs.static.public, data.url)
        data.getStream = () => fs.createReadStream(filePath)
    } else if (url.startsWith('http')) {
        const res = await axios.get(url, { responseType: 'stream' })
        data.getStream = () => res.data
    }
}

export const streamToBuffer = async (stream: NodeJS.ReadStream) => {
    let parts = await streamToArray(stream)
    parts = parts.map(part => Buffer.isBuffer(part) ? part : Buffer.from(part))
    return Buffer.concat(parts)
}

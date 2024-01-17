import logger from './logger'

export default async () => {
  const { migrate } = strapi.service('plugin::blurred-image-format.migration')
  migrate()

  strapi.db?.lifecycles.subscribe({
    async beforeCreate(event) {
      if (event.model.singularName !== 'file') return
      const { name } = event.params.data
      const { generateBlurredImage } = strapi.service('plugin::blurred-image-format.image-manipulation')
      try {
        await generateBlurredImage(event.params.data)
      } catch (error) {
        logger.warn(`[blurred-image-format] Failed to generate blurred format for upload ${name}`, error)
      }
    }
  })
};

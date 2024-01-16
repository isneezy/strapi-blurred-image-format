export default async () => {
  const { migrate } = strapi.service('plugin::blurred-image-format.migration')
  migrate()

  strapi.db?.lifecycles.subscribe({
    async beforeCreate(event) {
      if (event.model.singularName !== 'file') return
      const { generateBlurredImage } = strapi.service('plugin::blurred-image-format.image-manipulation')
      await generateBlurredImage(event.params.data)
    }
  })
};

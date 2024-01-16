export default () => {
  strapi.db?.lifecycles.subscribe({
    async beforeCreate(event) {
      if (event.model.singularName !== 'file') return
      const { generateBluredImage } = strapi.service('plugin::blured-image-format.image-manipulation')
      await generateBluredImage(event.params.data)
    }
  })
};

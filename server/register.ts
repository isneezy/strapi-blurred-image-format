import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  const contentType = strapi.contentType('plugin::upload.file')
  contentType.attributes.is_blurred = {
    type: 'boolean',
    configurable: false,
    visible: false,
    private: true,
    default: false,
    required: false
  }

  contentType.attributes.can_be_blurred = {
    type: 'boolean',
    configurable: false,
    visible: false,
    private: true,
    default: undefined,
    required: false
  }
};

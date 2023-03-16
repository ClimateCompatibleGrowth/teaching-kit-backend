import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('ccg-custom-ui-fields')
      .service('myService')
      .getWelcomeMessage();
  },
});

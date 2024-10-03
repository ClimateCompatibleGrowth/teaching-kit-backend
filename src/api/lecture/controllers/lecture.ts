/**
 * lecture controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::lecture.lecture',
  ({ strapi }) => ({
    async findByVuid(ctx) {
      try {
        const { vuid } = ctx.params
        const {
          populate,
          locale,
          fallbackToDefaultLocale = 'false',
        } = ctx.query

        let entries = await strapi.entityService.findMany(
          'api::lecture.lecture',
          {
            filters: {
              vuid,
            },
            locale: locale ?? 'en',
            populate,
          }
        )

        if (
          fallbackToDefaultLocale === 'true' &&
          (entries === undefined || entries.length === 0)
        ) {
          entries = await strapi.entityService.findMany(
            'api::lecture.lecture',
            {
              filters: {
                vuid,
              },
              locale: 'en',
              populate,
            }
          )
        }

        const entry = entries.find(
          (entry) => entry.isVisibleInListView && entry.publishedAt !== null
        )

        if (entry === undefined) {
          return notFound(ctx, vuid)
        }

        const sanitizedEntry = await this.sanitizeOutput(entry, ctx)
        ctx.body = sanitizedEntry
      } catch (error) {
        ctx.status = 500
        ctx.body = error
      }
    },
  })
)

const notFound = (ctx, vuid: string) => {
  ctx.status = 404
  ctx.body = `Unable to find block with vuid ${vuid}`
}

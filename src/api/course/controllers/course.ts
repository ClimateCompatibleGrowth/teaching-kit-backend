/**
 * course controller
 */

import { factories } from '@strapi/strapi'

type Course = {
  vuid: string
  isVisibleInListView: boolean
  publishedAt: Date | string
}

export default factories.createCoreController(
  'api::course.course',
  ({ strapi }) => ({
    async findByVuid(ctx) {
      try {
        const { vuid } = ctx.params
        const {
          populate,
          locale,
          fallbackToDefaultLocale = 'false',
        } = ctx.query

        let entries: Partial<Course>[] = await strapi.entityService.findMany(
          'api::course.course',
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
          entries = await strapi.entityService.findMany('api::course.course', {
            filters: {
              vuid,
            },
            locale: 'en',
            populate,
          })
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

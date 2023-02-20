/**
 * course controller
 */

import { factories } from '@strapi/strapi'

type Course = {
  id: number
  vuid: string
  isVisibleInListView: boolean
  publishedAt: null | string
}

export default factories.createCoreController(
  'api::course.course',
  ({ strapi }) => ({
    async findByVuid(ctx) {
      try {
        const { vuid } = ctx.params
        const { populate } = ctx.query

        const entries: Course[] = await strapi.entityService.findMany(
          'api::course.course',
          {
            filters: {
              vuid,
            },
            populate,
          }
        )

        if (entries === undefined || entries.length === 0) {
          ctx.status = 404
          ctx.body = `Unable to find course with vuid ${vuid}`
          return
        }

        const entry = entries.find(
          (entry) => entry.isVisibleInListView && entry.publishedAt !== null
        )

        if (entry === undefined) {
          ctx.body = 404
          ctx.body = `Unable to find a published course with vuid ${vuid}`
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

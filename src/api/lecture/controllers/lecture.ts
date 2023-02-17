/**
 * lecture controller
 */

import { factories } from '@strapi/strapi'

type Lecture = {
  id: number
  vuid: string
  isVisibleInListView: boolean
  publishedAt: null | string
}

export default factories.createCoreController(
  'api::lecture.lecture',
  ({ strapi }) => ({
    async findByVuid(ctx) {
      try {
        const { vuid } = ctx.params
        const { populate } = ctx.query

        const entries: Lecture[] = await strapi.entityService.findMany(
          'api::lecture.lecture',
          {
            filters: {
              vuid,
            },
            populate,
          }
        )

        if (entries === undefined || entries.length === 0) {
          ctx.status = 404
          ctx.body = `Unable to find lecture with vuid ${vuid}`
          return
        }

        const entry = entries.find(
          (entry) => entry.isVisibleInListView && entry.publishedAt !== null
        )

        if (entry === undefined) {
          ctx.body = 404
          ctx.body = `Unable to find a published lecture with vuid ${vuid}`
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

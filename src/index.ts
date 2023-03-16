type User = {
  id: number
  firstname: string
  lastname: string
  email: string
  isActive: boolean
  blocked: boolean
  username?: string
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    await strapi.admin.services.permission.conditionProvider.register({
      displayName: 'Is in author list',
      name: 'is-in-author-list',
      plugin: 'admin',
      async handler(user: User) {
        return {
          Authors: { $elemMatch: { Email: user.email } },
        }
      },
    })

    await strapi.admin.services.permission.conditionProvider.register({
      displayName: 'Is in lecture creator list',
      name: 'is-in-lecture-creator-list',
      plugin: 'admin',
      async handler(user: User) {
        return {
          LectureCreators: { $elemMatch: { Email: user.email } },
        }
      },
    })

    await strapi.admin.services.permission.conditionProvider.register({
      displayName: 'Is in course creator list',
      name: 'is-in-course-creator-list',
      plugin: 'admin',
      async handler(user: User) {
        return {
          CourseCreators: { $elemMatch: { Email: user.email } },
        }
      },
    })
  },
}

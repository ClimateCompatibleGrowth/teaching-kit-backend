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
      displayName: 'Is in creator list',
      name: 'is-in-creator-list',
      plugin: 'admin',
      async handler(user: User) {
        return {
          Authors: { $elemMatch: { Email: user.email } },
        }
      },
    })
  },
}

# About Strapi

Most of Strapi’s data and configuration is handled by the source code, which is source controlled in this repository. However, some settings are held in the database, which means that if you change such settings locally for instance, they will not be reflected in production when your PR is merged. Below are some settings that need to be re-configured when setting up your local environment, or if we ever have to reset the settings in the database.Some of these are bigger things to configure, and might change a bit from the time writing this, so it’s not worth writing instructions on e.g how to setup each role definition. Instead, you should always have one version (either locally, or in Production) which you can manually mimic when you need to re-configure your instance.

**NOTE** “Permissions of External Users” below is essential to setup in order for the Curriculum to work in case you want to run your local Curriculum with your local Strapi project.

#### Role definitions

The roles are for some reason not preserved in the source code, and must be re-configured on each running instance of Strapi.
The roles must be created, and the permission grid must be filled in from scratch. The custom conditions are part of the code, thankfully.
You can read more about [configuring administrator roles here](https://docs.strapi.io/user-docs/users-roles-permissions/configuring-administrator-roles)

#### Content type views

The view configuration of the content type defines in which order each field comes in the Content Type Editor. You can also configure which width each fields can have, if they’re editable, and descriptions.
All fields of a content type might not be visible from the start. In that case you can configure the view and see if you can “Insert another field”.
You can read more about [configuring the view of a content type here](https://docs.strapi.io/user-docs/content-manager/configuring-view-of-content-type)

#### API tokens

Not used in the application at the time of writing (2023-03-29). It has been used in periods when uploading pre-existing material to Strapi using [the REST API](https://docs.strapi.io/dev-docs/api/rest#create-an-entry).

#### Permissions of External Users

There are two types of Strapi roles; the roles of the internal users (i.e authenticated members. Mentioned in the section above), and the external users; Authenticated (API auth) and Public. The Curriculum website is regarded as an external user by Strapi, and since it doesn’t have any authentication, it has the role Public.

The permissions of the External roles can be viewed in the Strapi UI; Settings > Users & Permissions Plugin > Roles

By default, most (or all?) permissions of the Public external are checked off. In a scenario where you’ve just pulled a local clone of both the Curriculum and the Strapi services, the Curriculum will likely not work as intended locally until you’ve configured these External roles. Everything that the Curriculum reads have to have their “find” attributes checked. For instance, if you open the Permissions of Block, you will have to check “find”, “findByVuid” and “findOne”.
At the time of writing (2023-03-29), the same goes for all other permissions, except for: Content types builder, Content-versioning, Email, i18n and Upload - none of which are used by the Curriculum.

You can read more about the [different types of roles and its settings here](https://docs.strapi.io/user-docs/users-roles-permissions), and about [editing an External User role here](https://docs.strapi.io/user-docs/users-roles-permissions/configuring-end-users-roles#editing-a-role).

#### Webhooks

At the time of writing (2023-03-29), we use two Webhooks; Purge Entry and Zenodo Deposit. These are not part of the source code either, so you have to set them up on your new instance.

The webhooks can be found in the Strapi UI; Settings > Global Settings > Webhooks.

1. Purge Entry. This webhook listens for all types of events on all content types. It is used to purge the Curriculum when a change has occured. For instance, if you publish a new Lecture, the Curriculum has to be notified about this and build a static page for your lecture. Set this up by adding the URL “<CurriculumURL>/api/revalidate?secret=<INCREMENTAL_STATIC_REGENERATION_SECRET>”. The INCREMENTAL_STATIC_REGENERATION_SECRET can be found among the Curriculum’s environment variables (see Vercel or contact a code owner). No headers need to be added. All events should be checked.
2. Zenodo deposit. This webhook listens for publish events on entries. It is used to trigger the Zenodo flow (see `/docs/zenodo` in the Curriculum repo). Set this up by adding the URL “<CurriculumURL>/api/zenodo?secret=<ZENODO_PUBLISH_SECRET>”. The ZENODO_PUBLISH_SECRET can be found among the Curriculum’s environment variables (see Vercel or contact a code owner). No headers need to be added. Only the Entry > Publish event should be checked.

import type { Schema, Attribute } from '@strapi/strapi'

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions'
  info: {
    name: 'Permission'
    description: ''
    singularName: 'permission'
    pluralName: 'permissions'
    displayName: 'Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    properties: Attribute.JSON & Attribute.DefaultTo<{}>
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users'
  info: {
    name: 'User'
    description: ''
    singularName: 'user'
    pluralName: 'users'
    displayName: 'User'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    username: Attribute.String
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    resetPasswordToken: Attribute.String & Attribute.Private
    registrationToken: Attribute.String & Attribute.Private
    isActive: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
    preferedLanguage: Attribute.String
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles'
  info: {
    name: 'Role'
    description: ''
    singularName: 'role'
    pluralName: 'roles'
    displayName: 'Role'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    description: Attribute.String
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens'
  info: {
    name: 'Api Token'
    singularName: 'api-token'
    pluralName: 'api-tokens'
    displayName: 'Api Token'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }> &
      Attribute.DefaultTo<''>
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    lastUsedAt: Attribute.DateTime
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >
    expiresAt: Attribute.DateTime
    lifespan: Attribute.BigInteger
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions'
  info: {
    name: 'API Token Permission'
    description: ''
    singularName: 'api-token-permission'
    pluralName: 'api-token-permissions'
    displayName: 'API Token Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens'
  info: {
    name: 'Transfer Token'
    singularName: 'transfer-token'
    pluralName: 'transfer-tokens'
    displayName: 'Transfer Token'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }> &
      Attribute.DefaultTo<''>
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    lastUsedAt: Attribute.DateTime
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >
    expiresAt: Attribute.DateTime
    lifespan: Attribute.BigInteger
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions'
  info: {
    name: 'Transfer Token Permission'
    description: ''
    singularName: 'transfer-token-permission'
    pluralName: 'transfer-token-permissions'
    displayName: 'Transfer Token Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminWorkflow extends Schema.CollectionType {
  collectionName: 'strapi_workflows'
  info: {
    name: 'Workflow'
    description: ''
    singularName: 'workflow'
    pluralName: 'workflows'
    displayName: 'Workflow'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique
    stages: Attribute.Relation<
      'admin::workflow',
      'oneToMany',
      'admin::workflow-stage'
    >
    contentTypes: Attribute.JSON & Attribute.Required & Attribute.DefaultTo<[]>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::workflow',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::workflow',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminWorkflowStage extends Schema.CollectionType {
  collectionName: 'strapi_workflows_stages'
  info: {
    name: 'Workflow Stage'
    description: ''
    singularName: 'workflow-stage'
    pluralName: 'workflow-stages'
    displayName: 'Stages'
  }
  options: {
    version: '1.1.0'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String
    color: Attribute.String & Attribute.DefaultTo<'#4945FF'>
    workflow: Attribute.Relation<
      'admin::workflow-stage',
      'manyToOne',
      'admin::workflow'
    >
    permissions: Attribute.Relation<
      'admin::workflow-stage',
      'manyToMany',
      'admin::permission'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::workflow-stage',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::workflow-stage',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files'
  info: {
    singularName: 'file'
    pluralName: 'files'
    displayName: 'File'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String & Attribute.Required
    alternativeText: Attribute.String
    caption: Attribute.String
    width: Attribute.Integer
    height: Attribute.Integer
    formats: Attribute.JSON
    hash: Attribute.String & Attribute.Required
    ext: Attribute.String
    mime: Attribute.String & Attribute.Required
    size: Attribute.Decimal & Attribute.Required
    url: Attribute.String & Attribute.Required
    previewUrl: Attribute.String
    provider: Attribute.String & Attribute.Required
    provider_metadata: Attribute.JSON
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders'
  info: {
    singularName: 'folder'
    pluralName: 'folders'
    displayName: 'Folder'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases'
  info: {
    singularName: 'release'
    pluralName: 'releases'
    displayName: 'Release'
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String & Attribute.Required
    releasedAt: Attribute.DateTime
    scheduledAt: Attribute.DateTime
    timezone: Attribute.String
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions'
  info: {
    singularName: 'release-action'
    pluralName: 'release-actions'
    displayName: 'Release Action'
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >
    contentType: Attribute.String & Attribute.Required
    locale: Attribute.String
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >
    isEntryValid: Attribute.Boolean
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginTranslateBatchTranslateJob
  extends Schema.CollectionType {
  collectionName: 'translate_batch_translate_jobs'
  info: {
    singularName: 'batch-translate-job'
    pluralName: 'batch-translate-jobs'
    displayName: 'Translate Batch Translate Job'
  }
  options: {
    draftAndPublish: false
    comment: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    contentType: Attribute.String
    sourceLocale: Attribute.String
    targetLocale: Attribute.String
    entityIds: Attribute.JSON
    status: Attribute.Enumeration<
      [
        'created',
        'setup',
        'running',
        'paused',
        'finished',
        'cancelled',
        'failed'
      ]
    > &
      Attribute.DefaultTo<'created'>
    failureReason: Attribute.JSON
    progress: Attribute.Float & Attribute.DefaultTo<0>
    autoPublish: Attribute.Boolean & Attribute.DefaultTo<false>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::translate.batch-translate-job',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::translate.batch-translate-job',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale'
  info: {
    singularName: 'locale'
    pluralName: 'locales'
    collectionName: 'locales'
    displayName: 'Locale'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1
          max: 50
        },
        number
      >
    code: Attribute.String & Attribute.Unique
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions'
  info: {
    name: 'permission'
    description: ''
    singularName: 'permission'
    pluralName: 'permissions'
    displayName: 'Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String & Attribute.Required
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles'
  info: {
    name: 'role'
    description: ''
    singularName: 'role'
    pluralName: 'roles'
    displayName: 'Role'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3
      }>
    description: Attribute.String
    type: Attribute.String & Attribute.Unique
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users'
  info: {
    name: 'user'
    description: ''
    singularName: 'user'
    pluralName: 'users'
    displayName: 'User'
  }
  options: {
    draftAndPublish: false
    timestamps: true
  }
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3
      }>
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    provider: Attribute.String
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    resetPasswordToken: Attribute.String & Attribute.Private
    confirmationToken: Attribute.String & Attribute.Private
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiAffiliationAffiliation extends Schema.CollectionType {
  collectionName: 'affiliations'
  info: {
    singularName: 'affiliation'
    pluralName: 'affiliations'
    displayName: 'Affiliation'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    Affiliation: Attribute.String & Attribute.Required & Attribute.Unique
    Authors: Attribute.Relation<
      'api::affiliation.affiliation',
      'oneToMany',
      'api::author.author'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::affiliation.affiliation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::affiliation.affiliation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiAuthorAuthor extends Schema.CollectionType {
  collectionName: 'authors'
  info: {
    singularName: 'author'
    pluralName: 'authors'
    displayName: 'Author'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    FirstName: Attribute.String & Attribute.Required
    LastName: Attribute.String & Attribute.Required
    Email: Attribute.String & Attribute.Required
    ORCID: Attribute.String & Attribute.Required
    Affiliation: Attribute.Relation<
      'api::author.author',
      'manyToOne',
      'api::affiliation.affiliation'
    >
    Courses: Attribute.Relation<
      'api::author.author',
      'manyToMany',
      'api::course.course'
    >
    Lectures: Attribute.Relation<
      'api::author.author',
      'manyToMany',
      'api::lecture.lecture'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::author.author',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::author.author',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiCopyCoursePageCopyCoursePage extends Schema.CollectionType {
  collectionName: 'copy_course_pages'
  info: {
    singularName: 'copy-course-page'
    pluralName: 'copy-course-pages'
    displayName: 'Copy - course page'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    CiteAs: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    Acknowledgement: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    DescriptionHeader: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    Authors: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    DownloadContent: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    PowerpointDownloadDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    DocxDownloadDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    WasCreatedAt: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    WasUpdatedAt: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::copy-course-page.copy-course-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::copy-course-page.copy-course-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::copy-course-page.copy-course-page',
      'oneToMany',
      'api::copy-course-page.copy-course-page'
    >
    locale: Attribute.String
  }
}

export interface ApiCopyFilterPageCopyFilterPage extends Schema.CollectionType {
  collectionName: 'copy_filter_pages'
  info: {
    singularName: 'copy-filter-page'
    pluralName: 'copy-filter-pages'
    displayName: 'Copy - filter page'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    Header: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    FilterHeader: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    KeywordDropdown: Attribute.Component<'site-copy.dropdown'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    AuthorDropdown: Attribute.Component<'site-copy.dropdown'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    DefaultFilterResultHeader: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    FilterResultHeader: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::copy-filter-page.copy-filter-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::copy-filter-page.copy-filter-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::copy-filter-page.copy-filter-page',
      'oneToMany',
      'api::copy-filter-page.copy-filter-page'
    >
    locale: Attribute.String
  }
}

export interface ApiCopyGeneralCopyGeneral extends Schema.CollectionType {
  collectionName: 'copy_generals'
  info: {
    singularName: 'copy-general'
    pluralName: 'copy-generals'
    displayName: 'Copy - general'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    TranslationDoesNotExist: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::copy-general.copy-general',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::copy-general.copy-general',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::copy-general.copy-general',
      'oneToMany',
      'api::copy-general.copy-general'
    >
    locale: Attribute.String
  }
}

export interface ApiCopyLecturePageCopyLecturePage
  extends Schema.CollectionType {
  collectionName: 'copy_lecture_pages'
  info: {
    singularName: 'copy-lecture-page'
    pluralName: 'copy-lecture-pages'
    displayName: 'Copy - lecture page'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    DescriptionHeader: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    Authors: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    DownloadContent: Attribute.String &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    PowerpointDownloadDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    DocxDownloadDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    WasCreatedAt: Attribute.String &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    WasUpdatedAt: Attribute.String &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    AlsoPartOf: Attribute.String &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    LearningOutcomes: Attribute.String &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    Acknowledgement: Attribute.String &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    CiteAs: Attribute.String &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    Prerequisites: Attribute.String &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::copy-lecture-page.copy-lecture-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::copy-lecture-page.copy-lecture-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::copy-lecture-page.copy-lecture-page',
      'oneToMany',
      'api::copy-lecture-page.copy-lecture-page'
    >
    locale: Attribute.String
  }
}

export interface ApiCopySubmissionConfirmationPageCopySubmissionConfirmationPage
  extends Schema.CollectionType {
  collectionName: 'copy_submission-confirmation_pages'
  info: {
    singularName: 'copy-submission-confirmation-page'
    pluralName: 'copy-submission-confirmation-pages'
    displayName: 'Copy - submission confirmation page'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    Title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    Body: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::copy-submission-confirmation-page.copy-submission-confirmation-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::copy-submission-confirmation-page.copy-submission-confirmation-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::copy-submission-confirmation-page.copy-submission-confirmation-page',
      'oneToMany',
      'api::copy-submission-confirmation-page.copy-submission-confirmation-page'
    >
    locale: Attribute.String
  }
}

export interface ApiCopySubmitMaterialPageCopySubmitMaterialPage
  extends Schema.CollectionType {
  collectionName: 'copy_submit-material_pages'
  info: {
    singularName: 'copy-submit-material-page'
    pluralName: 'copy-submit-material-pages'
    displayName: 'Copy - submit material page'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    PageHeader: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    ContactEmail: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    ContentLanguage: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    CourseTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    CourseAbstract: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    CourseMaterials: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    LectureWrapper: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    LectureTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    LectureAbstract: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    LectureFiles: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    AddNewLecture: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    SubmitButton: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    Prerequisites: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        versions: {
          versioned: true
        }
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::copy-submit-material-page.copy-submit-material-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::copy-submit-material-page.copy-submit-material-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::copy-submit-material-page.copy-submit-material-page',
      'oneToMany',
      'api::copy-submit-material-page.copy-submit-material-page'
    >
    locale: Attribute.String
  }
}

export interface ApiCourseCourse extends Schema.CollectionType {
  collectionName: 'courses'
  info: {
    singularName: 'course'
    pluralName: 'courses'
    displayName: 'Course'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    versions: {
      versioned: true
    }
    i18n: {
      localized: true
    }
  }
  attributes: {
    Title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    Abstract: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    CourseCreators: Attribute.Relation<
      'api::course.course',
      'manyToMany',
      'api::author.author'
    > &
      Attribute.SetPluginOptions<{
        deepl: {
          translate: 'translate'
        }
      }>
    Lectures: Attribute.Relation<
      'api::course.course',
      'manyToMany',
      'api::lecture.lecture'
    > &
      Attribute.SetPluginOptions<{
        deepl: {
          translate: 'translate'
        }
      }>
    Prerequisites: Attribute.Component<
      'about-the-material.prerequisite',
      true
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    Acknowledgement: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    CiteAs: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'copy'
        }
      }>
    LearningOutcomes: Attribute.Component<
      'about-the-material.learning-outcomes',
      true
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    Files: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    Logo: Attribute.Media<'images'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
        deepl: {
          translate: 'translate'
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    versions: Attribute.Relation<
      'api::course.course',
      'manyToMany',
      'api::course.course'
    >
    vuid: Attribute.String
    versionNumber: Attribute.Integer & Attribute.DefaultTo<1>
    versionComment: Attribute.String
    isVisibleInListView: Attribute.Boolean & Attribute.DefaultTo<true>
    localizations: Attribute.Relation<
      'api::course.course',
      'oneToMany',
      'api::course.course'
    >
    locale: Attribute.String
  }
}

export interface ApiKeywordKeyword extends Schema.CollectionType {
  collectionName: 'keywords'
  info: {
    singularName: 'keyword'
    pluralName: 'keywords'
    displayName: 'Keyword'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    Keyword: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::keyword.keyword',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::keyword.keyword',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::keyword.keyword',
      'oneToMany',
      'api::keyword.keyword'
    >
    locale: Attribute.String
  }
}

export interface ApiLectureLecture extends Schema.CollectionType {
  collectionName: 'lectures'
  info: {
    singularName: 'lecture'
    pluralName: 'lectures'
    displayName: 'Lecture'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    versions: {
      versioned: true
    }
    i18n: {
      localized: true
    }
  }
  attributes: {
    Title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    Abstract: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    LectureCreators: Attribute.Relation<
      'api::lecture.lecture',
      'manyToMany',
      'api::author.author'
    > &
      Attribute.SetPluginOptions<{
        deepl: {
          translate: 'translate'
        }
      }>
    Courses: Attribute.Relation<
      'api::lecture.lecture',
      'manyToMany',
      'api::course.course'
    >
    LearningOutcomes: Attribute.Component<
      'about-the-material.learning-outcomes',
      true
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    Acknowledgement: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    CiteAs: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'copy'
        }
      }>
    Files: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::lecture.lecture',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::lecture.lecture',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    versions: Attribute.Relation<
      'api::lecture.lecture',
      'manyToMany',
      'api::lecture.lecture'
    >
    vuid: Attribute.String
    versionNumber: Attribute.Integer & Attribute.DefaultTo<1>
    versionComment: Attribute.String
    isVisibleInListView: Attribute.Boolean & Attribute.DefaultTo<true>
    localizations: Attribute.Relation<
      'api::lecture.lecture',
      'oneToMany',
      'api::lecture.lecture'
    >
    locale: Attribute.String
  }
}

export interface ApiSiteCopySiteCopy extends Schema.CollectionType {
  collectionName: 'site_copies'
  info: {
    singularName: 'site-copy'
    pluralName: 'site-copies'
    displayName: 'Copy - home page'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    Header: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    HeaderParagraph: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    PrimaryCallToActionButtonLabel: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    InfoCardHeader: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    InfoCards: Attribute.Component<'site-copy.info-card', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    InfoCardsLarge: Attribute.Component<'site-copy.info-card-large', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    DynamicContentHeader: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    DynamicContentButtonLabel1: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    BottomTextColumn1: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    BottomTextColumn2: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    HeroImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    DynamicContentButtonLabel2: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    HowTheTeachingMaterialIsStructured: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    InfoTextCourseLectureLectureBlock: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    InfoTextCourseStructure: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    dataStructureDesktop: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    dataStructureMobile: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
        deepl: {
          translate: 'translate'
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::site-copy.site-copy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::site-copy.site-copy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::site-copy.site-copy',
      'oneToMany',
      'api::site-copy.site-copy'
    >
    locale: Attribute.String
  }
}

export interface AdminAuditLog extends Schema.CollectionType {
  collectionName: 'strapi_audit_logs'
  info: {
    singularName: 'audit-log'
    pluralName: 'audit-logs'
    displayName: 'Audit Log'
  }
  options: {
    draftAndPublish: false
    timestamps: false
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String & Attribute.Required
    date: Attribute.DateTime & Attribute.Required
    user: Attribute.Relation<'admin::audit-log', 'oneToOne', 'admin::user'>
    payload: Attribute.JSON
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::audit-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::audit-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission
      'admin::user': AdminUser
      'admin::role': AdminRole
      'admin::api-token': AdminApiToken
      'admin::api-token-permission': AdminApiTokenPermission
      'admin::transfer-token': AdminTransferToken
      'admin::transfer-token-permission': AdminTransferTokenPermission
      'admin::workflow': AdminWorkflow
      'admin::workflow-stage': AdminWorkflowStage
      'plugin::upload.file': PluginUploadFile
      'plugin::upload.folder': PluginUploadFolder
      'plugin::content-releases.release': PluginContentReleasesRelease
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction
      'plugin::translate.batch-translate-job': PluginTranslateBatchTranslateJob
      'plugin::i18n.locale': PluginI18NLocale
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission
      'plugin::users-permissions.role': PluginUsersPermissionsRole
      'plugin::users-permissions.user': PluginUsersPermissionsUser
      'api::affiliation.affiliation': ApiAffiliationAffiliation
      'api::author.author': ApiAuthorAuthor
      'api::copy-course-page.copy-course-page': ApiCopyCoursePageCopyCoursePage
      'api::copy-filter-page.copy-filter-page': ApiCopyFilterPageCopyFilterPage
      'api::copy-general.copy-general': ApiCopyGeneralCopyGeneral
      'api::copy-lecture-page.copy-lecture-page': ApiCopyLecturePageCopyLecturePage
      'api::copy-submission-confirmation-page.copy-submission-confirmation-page': ApiCopySubmissionConfirmationPageCopySubmissionConfirmationPage
      'api::copy-submit-material-page.copy-submit-material-page': ApiCopySubmitMaterialPageCopySubmitMaterialPage
      'api::course.course': ApiCourseCourse
      'api::keyword.keyword': ApiKeywordKeyword
      'api::lecture.lecture': ApiLectureLecture
      'api::site-copy.site-copy': ApiSiteCopySiteCopy
      'admin::audit-log': AdminAuditLog
    }
  }
}

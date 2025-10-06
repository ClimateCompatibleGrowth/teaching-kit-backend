module.exports = ({ env }) => {
  const baseConfig = {
    'content-versioning': {
      enabled: true,
    },
    translate: {
      config: {
        provider: "deepl",
        providerOptions: {
          apiKey: env('DEEPL_API_KEY'),
        },
        translatedFieldTypes: [
          'string',
          'text',
          'richtext',
          'component',
          'dynamiczone',
          'media',
        ],
        translateRelations: true,
      },
    },
    'ccg-custom-ui-fields': {
      enabled: true,
      resolve: './src/plugins/ccg-custom-ui-fields',
    },
  }

  if (env('NODE_ENV') === 'production') {
    return {
      ...baseConfig,
      upload: {
        config: {
          provider: 'strapi-provider-upload-azure-sa',
          providerOptions: {
            authType: 'default',
            account: env('STORAGE_ACCOUNT'),
            accountKey: env('STORAGE_ACCOUNT_KEY'),
            containerName: env('STORAGE_CONTAINER_NAME'),
            baseUrl: `https://${env('STORAGE_ACCOUNT')}.blob.core.windows.net/${env('STORAGE_CONTAINER_NAME')}`,
            cdnBaseUrl: env('STORAGE_CDN_ENABLED') === 'true' ? env('STORAGE_CDN_URL') : undefined,
          },
        },
      },
    }
  }

  return baseConfig
}

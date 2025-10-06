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
          provider: '@allyusd/strapi-provider-upload-azure-storage',
          providerOptions: {
            account: env('STORAGE_ACCOUNT'),
            accountKey: env('STORAGE_ACCOUNT_KEY'),
            // serviceBaseURL: env('STORAGE_URL'), // Ta bort denna - kan orsaka konflikter
            containerName: env('STORAGE_CONTAINER_NAME'),
            createContainerIfNotExist: false,
          },
        },
      },
    }
  }

  return baseConfig
}

module.exports = ({ env }) => {
  const baseConfig = {
    'content-versioning': {
      enabled: true,
    },
    'vuid-field': {
      enabled: true,
      resolve: './src/plugins/vuid-field',
    },
  }
  if (env('NODE_ENV') === 'production') {
    return {
      ...baseConfig,
      upload: {
        config: {
          provider: 'aws-s3',
          providerOptions: {
            accessKeyId: env('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env('AWS_ACCESS_SECRET'),
            region: env('AWS_REGION'),
            params: {
              Bucket: env('AWS_BUCKET_NAME'),
            },
          },
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        },
      },
    }
  }

  return baseConfig
}

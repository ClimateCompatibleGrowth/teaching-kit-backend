import React from 'react'

import { useCMEditViewDataManager } from '@strapi/helper-plugin'
import { Typography } from '@strapi/design-system'

const GRAY = 'rgb(165, 165, 186)'

const VuidField = () => {
  const { initialData } = useCMEditViewDataManager()

  return (
    <div
      style={{
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        color: GRAY,
        borderTop: `1px solid rgb(165, 165, 186, 0.5)`,
        paddingTop: '1rem',
        gap: '1rem',
      }}
    >
      {initialData?.vuid !== undefined ? (
        <>
          <Typography textColor="rgb(165, 165, 186)" fontWeight="bold">
            uuid
          </Typography>
          <Typography textAlign="right">{initialData.vuid}</Typography>
        </>
      ) : (
        <Typography textColor="rgb(165, 165, 186)">
          You must save a version to get a UUID
        </Typography>
      )}
    </div>
  )
}

export default VuidField

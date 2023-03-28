import React from 'react'

import { useCMEditViewDataManager } from '@strapi/helper-plugin'
import { Typography } from '@strapi/design-system'

const GRAY = 'rgb(165, 165, 186)'

type Entry = {
  id: string
  zenodo_deposit_id: string | null
}

const CCGCustomFields = () => {
  const [linkToZenodoDeposit, setLinkToZenodoDeposit] = React.useState<
    string | undefined
  >(undefined)
  const { initialData } = useCMEditViewDataManager()

  const dataIsLearningMaterial = initialData?.Abstract !== undefined

  React.useEffect(() => {
    fetchDepositDatabaseEntry(initialData?.vuid, initialData.versionNumber)
  }, [initialData?.vuid, initialData?.versionNumber])

  const fetchDepositDatabaseEntry = async (vuid: string, version: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_ENDPOINT}/get-zenodo-deposit?secret=${process.env.GET_ZENODO_SECRET}&vuid=${vuid}&version=${version}`,
        { method: 'GET' }
      )
      console.log(response)
      const matchingEntry: Entry = await response.json()
      const link = `https://zenodo.org/deposit/${matchingEntry.zenodo_deposit_id}`
      setLinkToZenodoDeposit(link)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {dataIsLearningMaterial ? (
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
          {initialData?.vuid !== undefined && initialData?.vuid !== null ? (
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
      ) : null}
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
        <Typography textColor="rgb(165, 165, 186)" fontWeight="bold">
          Zenodo deposit
        </Typography>
        {linkToZenodoDeposit !== undefined ? (
          <Typography textAlign="right">{linkToZenodoDeposit}</Typography>
        ) : null}
      </div>
    </div>
  )
}

export default CCGCustomFields

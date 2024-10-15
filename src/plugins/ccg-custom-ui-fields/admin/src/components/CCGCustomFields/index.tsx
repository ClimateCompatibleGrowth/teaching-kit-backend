import React from 'react'

import { useCMEditViewDataManager } from '@strapi/helper-plugin'
import { Typography } from '@strapi/design-system'

const GRAY = 'rgb(165, 165, 186)'

type Entry = {
  id: string
  zenodo_deposit_id: string | null
  zenodo_doi: string | null
}

// Note: Since Strapi doesn't allow requests to http-domains (which the Curriculum website of course is locally), this
// is a bit challengin to test locally.
// What I've done is to hard code the request to fetch some combination of vuid/version from production which I know
// exists in production.
// A slightly more cumbersome approach (but also better) is to use https tunneling with e.g ngrok (https://ngrok.com/). In that
// case you must edit the CORS configuration of the get-zenodo-deposit endpoint to accept your custom ngrok https-domain in development.

// For some reason, the entry you're at when browsing this plugin is automatically saved when you click the button to look for a new
// Zenodo link. I really can't understand why this happens. If anyone is curious in the future, someone has hopefully answered this
// forum post: https://forum.strapi.io/t/custom-plugin-entry-is-automatically-saved-when-performing-api-call/27079
// Update: Seems to be an issue with content management panel not using the same API: https://github.com/strapi/strapi/issues/18214#issuecomment-1763159261
const CCGCustomFields = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [zenodoEntry, setZenodoEntry] = React.useState<Entry | undefined>(
    undefined
  )
  const { initialData } = useCMEditViewDataManager()

  const dataIsLearningMaterial = initialData?.Abstract !== undefined

  React.useEffect(() => {
    fetchDepositDatabaseEntry(initialData?.vuid, initialData.versionNumber)
  }, [initialData?.vuid, initialData?.versionNumber])

  const fetchDepositDatabaseEntry = async (vuid: string, version: number) => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_ENDPOINT}/get-zenodo-deposit?secret=${process.env.GET_ZENODO_SECRET}&vuid=${vuid}&version=${version}`,
        { method: 'GET' }
      )
      const matchingEntry: Entry = await response.json()
      if (!matchingEntry.zenodo_deposit_id) {
        setIsLoading(false)
        return setZenodoEntry(undefined)
      }
      setZenodoEntry(matchingEntry)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
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
          <Typography textColor="rgb(165, 165, 186)" fontWeight="bold">
            Zenodo deposit
          </Typography>
          {zenodoEntry?.zenodo_deposit_id !== undefined &&
            zenodoEntry?.zenodo_doi !== undefined ? (
            <Typography textAlign="right">
              <a
                href={`https://zenodo.org/deposit/${zenodoEntry.zenodo_deposit_id}`}
                target="_blank"
              >
                {zenodoEntry.zenodo_doi}
              </a>
            </Typography>
          ) : (
            <button
              onClick={() =>
                fetchDepositDatabaseEntry(
                  initialData?.vuid,
                  initialData?.versionNumber
                )
              }
            >
              {isLoading ? 'Loading...' : 'Check for Zenodo link'}
            </button>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default CCGCustomFields

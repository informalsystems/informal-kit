import { Career } from '@/lib/types'

export const getCareersFromBambooHR = async () => {
  const response = await fetch(
    'https://api.bamboohr.com/api/gateway.php/informalsystems/v1/applicant_tracking/jobs?statusGroups=Open&sortBy=title&sortOrder=ASC',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${process.env.BAMBOO_HR_BASIC_AUTH_TOKEN}`,
      },
    },
  )

  const careers = (await response.json()) as Career[]

  return careers.map(career => ({
    ...career,
    department: {
      ...career.department,
      label: career.department.label?.toLowerCase() || 'general',
    },
    location: {
      ...career.location,
      label:
        career.location.label ||
        'Berlin, Lausanne, Paris, Remote, Toronto, Vienna',
    },
  }))
}

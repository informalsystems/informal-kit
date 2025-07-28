'use server'

import shuffle from 'lodash/shuffle'

type EmployeeReportEntry = Record<(typeof fieldNamesInReport)[number], string>

const fieldNamesInReport = [
  'id',
  'displayName',
  'firstName',
  'lastName',
  'jobTitle',
  'location',
  'department',
  'division',
  'isPhotoUploaded',
  'status',
] as const

export const getEmployeesFromBambooHR = async () => {
  const response = await fetch(
    'https://api.bamboohr.com/api/gateway.php/informalsystems/v1/reports/custom?onlyCurrent=true&format=JSON',
    {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${process.env.BAMBOO_HR_BASIC_AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        title: 'Employees for Company Website About Page',
        fields: fieldNamesInReport,
      }),
    },
  )

  const { employees } = await response.json()

  const filteredEmployees = shuffle(
    (employees as EmployeeReportEntry[])
      .filter(
        employee =>
          employee.isPhotoUploaded === 'true' && employee.status === 'Active',
      )
      .map(employee => ({
        ...employee,
        jobTitle: employee.jobTitle?.split(' - ')[0],
      })),
  )

  return filteredEmployees as EmployeeReportEntry[]
}

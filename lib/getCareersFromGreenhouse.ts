import { Career } from './types'

interface GreenhouseLocation {
  name: string
}

interface GreenhouseDepartment {
  id: number
  name: string
  parent_id: number | null
  child_ids: number[]
}

interface GreenhouseOffice {
  id: number
  name: string
  location: string
  parent_id: number | null
  child_ids: number[]
}

interface GreenhouseJob {
  id: number
  internal_job_id: number
  title: string
  updated_at: string
  requisition_id: string
  location: GreenhouseLocation
  absolute_url: string
  metadata: Record<string, unknown> | null
  content?: string
  departments?: GreenhouseDepartment[]
  offices?: GreenhouseOffice[]
  company_name?: string
  first_published?: string
}

interface GreenhouseDepartmentsResponse {
  departments: {
    id: number
    name: string
    parent_id: number | null
    child_ids: number[]
    jobs: GreenhouseJob[]
  }[]
  meta: {
    total: number
  }
}

export interface DepartmentWithJobs {
  id: number
  name: string
  jobs: Career[]
}

export const getCareersFromGreenhouse = async () => {
  const response = await fetch(
    'https://boards-api.greenhouse.io/v1/boards/informal/departments?content=true',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
  )

  const data = (await response.json()) as GreenhouseDepartmentsResponse

  // Flatten all jobs from all departments
  const careers: Career[] = []

  for (const department of data.departments) {
    for (const job of department.jobs) {
      // Find the primary department (first one from departments array, or fallback to parent department)
      const primaryDepartment = job.departments?.[0] || department

      careers.push({
        id: job.id,
        title: {
          id: job.id.toString(),
          label: job.title,
        },
        postedDate: job.first_published || job.updated_at,
        location: {
          id: job.location.name,
          label: job.location.name,
          address: {
            name: null,
            description: null,
            addressLine1: null,
            addressLine2: null,
            city: null,
            state: null,
            zipcode: null,
            country: null,
            phoneNumber: null,
          },
        },
        department: {
          id: primaryDepartment.id,
          label: primaryDepartment.name.toLowerCase(),
        },
        status: {
          id: 1,
          label: 'Open',
        },
        newApplicantsCount: 0,
        activeApplicantsCount: 0,
        totalApplicantsCount: 0,
        postingUrl: job.absolute_url,
      })
    }
  }

  return careers
}

export const getDepartmentsWithJobsFromGreenhouse = async (): Promise<
  DepartmentWithJobs[]
> => {
  const response = await fetch(
    'https://boards-api.greenhouse.io/v1/boards/informal/departments?content=true',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
  )

  const data = (await response.json()) as GreenhouseDepartmentsResponse

  return data.departments.map(department => ({
    id: department.id,
    name: department.name,
    jobs: department.jobs.map(job => {
      const primaryDepartment = job.departments?.[0] || department

      return {
        id: job.id,
        title: {
          id: job.id.toString(),
          label: job.title,
        },
        postedDate: job.first_published || job.updated_at,
        location: {
          id: job.location.name,
          label: job.location.name,
          address: {
            name: null,
            description: null,
            addressLine1: null,
            addressLine2: null,
            city: null,
            state: null,
            zipcode: null,
            country: null,
            phoneNumber: null,
          },
        },
        department: {
          id: primaryDepartment.id,
          label: primaryDepartment.name.toLowerCase(),
        },
        status: {
          id: 1,
          label: 'Open',
        },
        newApplicantsCount: 0,
        activeApplicantsCount: 0,
        totalApplicantsCount: 0,
        postingUrl: job.absolute_url,
      }
    }),
  }))
}

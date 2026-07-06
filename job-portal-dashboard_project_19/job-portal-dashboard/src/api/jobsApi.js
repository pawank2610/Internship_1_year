// Live job data comes from the Remotive public API (no key required, CORS-enabled).
// Docs: https://remotive.com/api-documentation
const BASE_URL = 'https://remotive.com/api/remote-jobs'

/**
 * Fetch jobs from the Remotive API.
 * @param {Object} params
 * @param {string} [params.search] - free text search term (title, company, tags)
 * @param {string} [params.category] - Remotive category filter
 * @returns {Promise<Array>} normalized job objects
 */
export async function fetchJobs({ search = '', category = '' } = {}) {
  const url = new URL(BASE_URL)
  if (search) url.searchParams.set('search', search)
  if (category) url.searchParams.set('category', category)

  const res = await fetch(url.toString())
  if (!res.ok) {
    throw new Error(`Failed to load jobs (status ${res.status})`)
  }
  const data = await res.json()
  return (data.jobs || []).map(normalizeJob)
}

function normalizeJob(job) {
  return {
    id: job.id,
    title: job.title,
    company: job.company_name,
    logo: job.company_logo || job.company_logo_url || '',
    category: job.category,
    jobType: job.job_type,
    location: job.candidate_required_location,
    salary: job.salary,
    tags: job.tags || [],
    description: job.description,
    url: job.url,
    publicationDate: job.publication_date
  }
}

// Fallback/demo categories users can filter by (mirrors Remotive's own taxonomy).
export const CATEGORIES = [
  { value: '', label: 'All categories' },
  { value: 'software-dev', label: 'Software Development' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales-business', label: 'Sales / Business' },
  { value: 'customer-support', label: 'Customer Support' },
  { value: 'product', label: 'Product' },
  { value: 'writing', label: 'Writing' },
  { value: 'data', label: 'Data' },
  { value: 'devops-sysadmin', label: 'DevOps / SysAdmin' },
  { value: 'finance-legal', label: 'Finance / Legal' },
  { value: 'hr', label: 'Human Resources' }
]

export const JOB_TYPES = ['full_time', 'part_time', 'contract', 'freelance', 'internship']

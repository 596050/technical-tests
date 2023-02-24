import { axios } from "../lib/axios"

export type TaskAPIResponse = {
  id: string,
  date_created: string,
  date_updated: string,
  title: string,
  body: string,
  status: `INCOMPLETE` | `COMPLETE`,
  assignees: string[]
}

export const getTasks = () => {
  return axios.get<TaskAPIResponse[]>(`/search/task`)
}


import { axios } from "../lib/axios"
import { UserAPIResponse } from "./user"
import { TaskAPIResponse } from "./task"

export type SearchTaskAPIResponse = {
  "count": number,
  "next": string,
  "previous": string,
  "results": {
    "id": string,
    "assignees": UserAPIResponse[],
    "title": TaskAPIResponse['title'],
    "body": TaskAPIResponse['body'],
    "status": TaskAPIResponse['status']
  }[]
}

export const searchTasks = ({ data }: {
  data: {
    params: string
  }
}) => {
  return axios.get<SearchTaskAPIResponse>(`/search/search-task/${data?.params}`)
}

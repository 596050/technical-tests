import { axios } from "../lib/axios"

export type UserAPIResponse = {
    id: string,
    status: `INACTIVE` | `ACTIVE`,
    email: string,
    first_name: string,
    last_name: string,
    tasks: string[]
}

export const getUsers = () => {
    return axios.get<UserAPIResponse[]>(`/search/user`)
}


export const createUser = (data: {
    status: `INACTIVE` | `ACTIVE`,
    email: string,
    first_name: string,
    last_name: string,
}) => {
    return axios.post<UserAPIResponse[]>(`/search/user/`, data)
}


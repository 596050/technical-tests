import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getTasks, getUsers, searchTasks } from "@tbi/api";
import { AxiosResponse } from "axios";
import { SearchTaskAPIResponse } from "../api/search";
import { UserAPIResponse } from "../api/user";
import { TaskAPIResponse } from "../api/task";

export const useGetAllTasksQuery = (): UseQueryResult<
  AxiosResponse<TaskAPIResponse[]>
> => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });
};

export const useGetAllUsersQuery = (): UseQueryResult<
  AxiosResponse<UserAPIResponse[]>
> => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
};

export const useGetSearchTasksQuery = (params: string): UseQueryResult<AxiosResponse<SearchTaskAPIResponse>> => {
  return useQuery({
    queryKey: ["search-tasks", params],
    queryFn: () => searchTasks({ data: { params } }),
  });
};

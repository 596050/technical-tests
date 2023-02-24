import { useState } from "react";

import {
  AppBar,
  Box,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  LoadingSpinner,
  SelectChangeEvent,
} from "@tbi/components";

import { SELECT_OPTIONS } from "@tbi/helpers";
import { useSearchParams } from "@tbi/hooks";
import {
  useGetAllTasksQuery,
  useGetAllUsersQuery,
  useGetSearchTasksQuery,
} from "@tbi/query";
import { cleanParams } from "./Tasks.helpers";

export const TasksPage = () => {
  const [filterParam, setFilterParam] = useState<Record<string, string | null>>(
    {},
  );
  const [sortParam, setSortParam] = useState<Record<string, string | null>>({});

  const { queryParams } = useSearchParams({ filterParam, sortParam });

  const tasksQueryResponse = useGetAllTasksQuery();
  const usersQueryResponse = useGetAllUsersQuery();

  const searchQueryResponse = useGetSearchTasksQuery(
    !!queryParams?.value ? `${queryParams?.value}` : "",
  );

  const handleFilterChange =
    (key: string) => (event: SelectChangeEvent<string>) => {
      setFilterParam(cleanParams(key, event));
    };

  const handleSortChange =
    (key: string) => (event: SelectChangeEvent<string>) => {
      setSortParam(cleanParams(key, event));
    };

  const statuses = tasksQueryResponse?.data?.data
    ?.map(task => {
      return task.status;
    })
    ?.filter((value, index, array) => array.indexOf(value) === index)
    .sort();

  const searchResults = searchQueryResponse?.data?.data?.results;

  return (
    <>
      <AppBar
        position="relative"
        sx={{
          textAlign: "center",
          width: 1,
        }}
      >
        <Typography variant="h6" noWrap component="div" p={2}>
          Tasks
        </Typography>
      </AppBar>
      <Box display="flex" component="main" sx={{ flexGrow: 1, width: 1 }}>
        <Grid
          container
          sx={{ px: { xs: 1, md: 5 }, pb: 2, mt: "0 !important" }}
          rowSpacing={{ xs: 2 }}
        >
          <Grid item container spacing={2} xs={12}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="sort-by-status-select-label">
                  Sort by Status
                </InputLabel>
                <Select
                  labelId="sort-by-status-select-label"
                  id="sort-by-status-select"
                  label="Sort by status"
                  onChange={handleSortChange("status")}
                  sx={{
                    textTransform: "capitalize",
                  }}
                  defaultValue={SELECT_OPTIONS.None}
                >
                  <MenuItem value={SELECT_OPTIONS.None}>
                    {SELECT_OPTIONS.None}
                  </MenuItem>
                  {[
                    { value: "status", label: "ascending" },
                    { value: "-status", label: "descending" },
                  ]?.map((item, index) => {
                    return (
                      <MenuItem
                        key={`${item.label}${index}`}
                        value={item.value}
                        sx={{
                          textTransform: "capitalize",
                        }}
                      >
                        {item?.label?.toLocaleLowerCase()}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="sort-by-assignees__email-select-label">
                  Sort by Email
                </InputLabel>
                <Select
                  labelId="sort-by-assignees__email-select-label"
                  id="sort-by-assignees__email-select"
                  label="Sort by Email"
                  onChange={handleSortChange("assignees__email")}
                  sx={{
                    textTransform: "capitalize",
                  }}
                  defaultValue={SELECT_OPTIONS.None}
                >
                  <MenuItem value={SELECT_OPTIONS.None}>
                    {SELECT_OPTIONS.None}
                  </MenuItem>
                  {[
                    { value: "assignees__email", label: "ascending" },
                    { value: "-assignees__email", label: "descending" },
                  ]?.map((item, index) => {
                    return (
                      <MenuItem
                        key={`${item.label}${index}`}
                        value={item.value}
                        sx={{
                          textTransform: "capitalize",
                        }}
                      >
                        {item?.label?.toLocaleLowerCase()}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item container spacing={2} xs={12}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  label="Status"
                  onChange={handleFilterChange("status")}
                  sx={{
                    textTransform: "capitalize",
                  }}
                  defaultValue={SELECT_OPTIONS.None}
                >
                  <MenuItem value={SELECT_OPTIONS.None}>
                    {SELECT_OPTIONS.None}
                  </MenuItem>
                  {statuses?.map((item, index) => {
                    return (
                      <MenuItem
                        key={`${item}${index}`}
                        value={item}
                        sx={{
                          textTransform: "capitalize",
                        }}
                      >
                        {item?.toLocaleLowerCase()}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="assignees__email-select-label">
                  Email
                </InputLabel>
                <Select
                  labelId="assignees__email-select-label"
                  id="assignees__email-select"
                  label="Email"
                  onChange={handleFilterChange("assignees__email")}
                  defaultValue={SELECT_OPTIONS.None}
                >
                  <MenuItem value={SELECT_OPTIONS.None}>
                    {SELECT_OPTIONS.None}
                  </MenuItem>
                  {usersQueryResponse?.data?.data?.map((user, index) => {
                    return (
                      <MenuItem key={`${user.id}${index}`} value={user?.email}>
                        {user?.email}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item container spacing={{ md: 2 }} columns={{ xs: 1 }}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: { xs: 1, md: 3 },
                  maxHeight: { xs: "350px", md: "500px" },
                  width: 1,
                  overflow: "scroll",
                  border: 2,
                }}
              >
                <Grid
                  container
                  columns={{ xs: 1 }}
                  spacing={{ md: 2 }}
                  rowSpacing={{ xs: 1, md: 2 }}
                >
                  {!searchQueryResponse?.isLoading &&
                  searchQueryResponse.isSuccess &&
                  searchResults?.length ? (
                    searchResults?.map((item, index) => (
                      <Grid item xs={12} md={6} key={`${item?.id}${index}`}>
                        <Card
                          sx={{ p: 2, border: 1 }}
                          variant="elevation"
                          elevation={2}
                        >
                          <Box sx={{ pt: 1 }}>
                            <Box sx={{ fontWeight: "700" }}>Status:</Box>
                            {item.status}
                          </Box>
                          <Box sx={{ pt: 1 }}>
                            <Box sx={{ fontWeight: "700" }}>Title:</Box>
                            {item.title}
                          </Box>
                          <Box sx={{ pt: 1 }}>
                            <Box sx={{ fontWeight: "700" }}>Body: </Box>
                            {!!item.body ? item.body : "-"}
                          </Box>
                          <Box sx={{ pt: 1 }}>
                            <Box sx={{ fontWeight: "700" }}>Assignees:</Box>
                            {item?.assignees?.map((assignee, i) => {
                              return (
                                <Box sx={{ pt: 1 }} key={`${assignee?.id}${i}`}>
                                  {assignee.email}
                                </Box>
                              );
                            })}
                          </Box>
                        </Card>
                      </Grid>
                    ))
                  ) : !searchQueryResponse?.isLoading &&
                    searchQueryResponse.isSuccess &&
                    !searchResults?.length ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      width="100%"
                      sx={{ p: 1 }}
                    >
                      No Results
                    </Box>
                  ) : (
                    <LoadingSpinner />
                  )}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

import { useEffect, useState } from "react";

export type Props = {
  filterParam?: Record<string, string | undefined | null>;
  sortParam?: Record<string, string | undefined | null>;
};

export const useSearchParams = ({
  filterParam = {},
  sortParam = {},
}: Props) => {
  const [queryParams, setQueryParams] = useState<{ value?: string }>({
    value: "",
  });

  useEffect(() => {
    let params = "";

    const [cleanedFilterParams, cleanedSortParams] = [
      filterParam,
      sortParam,
    ]?.map(params => {
      return Object.fromEntries(
        Object.entries({
          ...params,
        }).filter(([_, value]) => !!value),
      ) as Record<string, string>;
    });

    params = new URLSearchParams(cleanedFilterParams).toString();

    if (Object.keys(cleanedSortParams)?.length) {
      params = [
        params,
        `o=${Object.entries(cleanedSortParams)
          .map(([_, param]) => param)
          .join(",")}`,
      ]
        .filter(v => v!!)
        .join("&");
    }
    params = !!params ? `?${params}` : "";
    setQueryParams({
      value: params,
    });
  }, [filterParam, sortParam]);

  return { queryParams };
};

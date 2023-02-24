import { renderHook } from "@testing-library/react";
import { useSearchParams } from "./useSearchParams";

describe("useSearchParams", () => {
  it("should return empty string on empty params", () => {
    const searchParams = { filterParam: {}, sortParam: {} }
    const { result } = renderHook(() => useSearchParams(searchParams));
    expect(result.current.queryParams.value).toBe("");
  });

  it.each([
    {
      filterParam: {
        "status": '-status'
      },
      output: { current: { queryParams: { value: '?status=-status' } } }
    },
    {
      filterParam: {
        "status": '-status',
        "email": '-email',
      },
      output: { current: { queryParams: { value: '?status=-status&email=-email' } } }
    },
    {
      filterParam: {
        "status": '-status',
        "email": null,
      },
      output: { current: { queryParams: { value: '?status=-status' } } }
    }
    ,
    {
      filterParam: {
        "status": '',
        "email": undefined,
      },
      output: { current: { queryParams: { value: '' } } }
    }
  ])("should create filter params %o given filterParam", ({ filterParam, output }) => {
    const searchParams = { filterParam, sortParam: {} }
    const { result } = renderHook(() => useSearchParams(searchParams));
    expect(result).toEqual(output);
  });

  it.each([
    {
      sortParam: {
        "status": '-status'
      },
      output: { current: { queryParams: { value: '?o=-status' } } }
    },
    {
      sortParam: {
        "status": '-status',
        "email": '-email',
      },
      output: { current: { queryParams: { value: '?o=-status,-email' } } }
    },
    {
      sortParam: {
        "status": '-status',
        "email": null,
      },
      output: { current: { queryParams: { value: '?o=-status' } } }
    }
    ,
    {
      sortParam: {
        "status": '',
        "email": undefined,
      },
      output: { current: { queryParams: { value: '' } } }
    }
  ])("should create sort params %o given sortParam", ({ sortParam, output }) => {
    const searchParams = { filterParam: {}, sortParam }
    const { result } = renderHook(() => useSearchParams(searchParams));
    expect(result).toEqual(output);
  });

  it.each([
    {
      sortParam: {
        "status": '-status'
      },
      filterParam: {
        "status": '-status'
      },
      output: { current: { queryParams: { value: '?status=-status&o=-status' } } }
    },
    {
      sortParam: {
        "status": '-status',
        "email": '-email',
      },
      filterParam: {
        "status": '-status',
        "email": '-email',
      },
      output: { current: { queryParams: { value: '?status=-status&email=-email&o=-status,-email' } } }
    },
    {
      sortParam: {
        "status": '-status',
        "email": null,
      },
      filterParam: {
        "status": null
      },
      output: { current: { queryParams: { value: '?o=-status' } } }
    },
    {
      sortParam: {
        "status": '',
        "email": undefined,
      },
      filterParam: {
        "status": null
      },
      output: { current: { queryParams: { value: '' } } }
    },
    {
      sortParam: {},
      filterParam: {
        "status": null
      },
      output: { current: { queryParams: { value: '' } } }
    }
  ])("should create filter and sort params %o given filterParam and sortParam", ({ filterParam, sortParam, output }) => {
    const searchParams = { filterParam, sortParam }
    const { result } = renderHook(() => useSearchParams(searchParams));
    expect(result).toEqual(output);
  });
});

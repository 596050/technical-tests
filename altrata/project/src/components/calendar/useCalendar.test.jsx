import { render, renderHook, screen } from "@testing-library/react";
import {
  getCalendarDayDates,
  getFormattedTitleDate,
  useCalendar,
} from "./useCalendar";

describe("useCalendar", () => {
  it.each([
    [
      new Date("Thu Oct 20 2020"),
      {
        calendar: [
          [0, 0, 0, 0, 1, 2, 3],
          [4, 5, 6, 7, 8, 9, 10],
          [11, 12, 13, 14, 15, 16, 17],
          [18, 19, 20, 21, 22, 23, 24],
          [25, 26, 27, 28, 29, 30, 31],
        ],
        formattedTitleDate: { month: "October", year: "2020" },
      },
    ],
    [
      undefined,
      {
        calendar: getCalendarDayDates({ date: new Date() }),
        formattedTitleDate: getFormattedTitleDate({ date: new Date() }),
      },
    ],
    [null, {}],
  ])("should call with %s and return %o", (input, expected) => {
    const { result } = renderHook(() =>
      useCalendar({
        target: input,
      }),
    );
    expect(result.current).toEqual(expected);
  });
});

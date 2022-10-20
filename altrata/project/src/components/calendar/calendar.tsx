import { forwardRef, ReactNode } from "react";
import { clsx } from "clsx";

import { useCalendar, UseCalendarProps } from "./useCalendar";

const WEEKDAY_NAME = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type CalendarProps = {
  date?: UseCalendarProps["target"];
};

const CalendarHeader = ({ month, year }: { month: string; year: string }) => {
  return (
    <div data-testid="CalendarHeader" className="flex justify-center">
      <span>{month}</span>
      <span className="px-1" />
      <span>{year}</span>
    </div>
  );
};

const CalendarRow = ({ children }: { children: ReactNode }) => {
  return (
    <div
      data-testid="CalendarRow"
      className="grid grid-cols-7 gap-1 text-center"
    >
      {children}
    </div>
  );
};

const CalendarCell = forwardRef<
  HTMLSpanElement,
  React.HTMLProps<HTMLSpanElement>
>(({ children, ...rest }, ref) => {
  return (
    <span {...rest} ref={ref}>
      {children}
    </span>
  );
});

export const Calendar = ({ date }: CalendarProps) => {
  const { calendar, formattedTitleDate } = useCalendar({ target: date });

  const calendarDaysOfWeek = WEEKDAY_NAME.map((name, i) => {
    return <CalendarCell key={`${name}${i}`}>{name}</CalendarCell>;
  });

  const calendarDays = calendar?.map((week, weekIndex) => {
    return week.map((day, dayIndex) => {
      const shouldHighlightCell = date?.getDate() === day;
      return (
        <CalendarCell
          key={`${day}${weekIndex}${dayIndex}`}
          className={clsx({
            "bg-neutral-200 text-[#282c34]": shouldHighlightCell,
          })}
        >
          {day === 0 ? "" : day}
        </CalendarCell>
      );
    });
  });

  const shouldShowCalendar =
    !!calendarDays?.length &&
    !!formattedTitleDate?.month &&
    !!formattedTitleDate?.year;
  return shouldShowCalendar ? (
    <div data-testid="Calendar" className="overflow-hidden min-w-fit">
      <CalendarHeader
        month={formattedTitleDate?.month}
        year={formattedTitleDate?.year}
      />
      <CalendarRow>{calendarDaysOfWeek}</CalendarRow>
      <CalendarRow>{calendarDays}</CalendarRow>
    </div>
  ) : null;
};

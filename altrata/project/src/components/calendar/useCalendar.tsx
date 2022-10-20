export type UseCalendarProps = {
  target?: Date;
};

export const getFormattedTitleDate = ({ date }: { date: Date }) => {
  let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  let month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
  return { month, year };
};

export const getCalendarDayDates = ({ date }: { date: Date }) => {
  let i = 0,
    j = 0,
    week,
    calendarDates = [],
    dateFormatted = new Date(date);
  const year = dateFormatted.getFullYear(),
    month = dateFormatted.getMonth();

  let first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();

  while (i < days) {
    for (j = 0, week = Array(7); j < 7; ) {
      while (j < first) week[j++] = 0;
      week[j++] = ++i > days ? 0 : i;
      first = 0;
    }
    calendarDates.push(week);
  }
  return calendarDates;
};

export const useCalendar = ({ target = new Date() }: UseCalendarProps) => {
  if (!target) return {};

  return {
    calendar: getCalendarDayDates({ date: target }),
    formattedTitleDate: getFormattedTitleDate({ date: target }),
  };
};

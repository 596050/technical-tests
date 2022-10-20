# Pre-Interview Development Exercise

The following is a practical programming test designed to allow you to showcase
your development skills and form a point of technical discussion in any
forthcoming interview.

We expect you will be able to submit the "correct" solution, so we are looking
for coding standards and techniques that stand out.

You should submit a complete, well-thought-out solution and are advised to pay
particular attention to the requirements. This exercise should take no more than
2 hours.

Good Luck!

## React Calendar

An organisation is building a React component library, which various front-end
React solutions can import and use in their projects.

A new reusable calendar component has been requested to add to the component
library: `<Calendar date={someDate} />`. Your task is to implement this
component.

This component should use the date prop and render a simple calendar for the
given date's year and month, with its date highlighted. See
[cal-2022-10-03.png](./cal-2022-10-03.png) for an example of what the calendar
component might render if the date of 03/10/2022 was passed in as a prop.
Likewise, a calendar with a date prop of 23/03/2020 might render
[cal-2020-03-23.png](./cal-2020-03-23.png).

You may implement this component in React TypeScript or JavaScript. You may use
CSS modules or any other style or class utility library, such as TailwindCSS,
for styling. You may use an appropriate bootstrapping tool, such as Create React
App, to get started:

`npx create-react-app cal --template typescript`

## Requirements

- A reusable calendar component which has a `date` prop.
- The first row of the calendar should display the `date` prop's month and year.
- The second row of the calendar should display the days of the week, one per
  column.
- The following rows should display the dates for the `date` prop's month and
  year, appropriately aligned with the day headings.
- The appropriate date cell should be highlighted based on the `date` prop.

Pay attention to the following:

- Showing the component can take a date prop and renders the correct calendar
  through a set of component tests. You may use tools such as
  `react-testing-library` to achieve this, or other methods.
- Good code and component separation of concerns.
- Careful consideration of what types are used in the solution.
- Suitable use of JavaScript libraries and functional programming techniques
  where appropriate.
- Clear and easy to understand JavaScript / TypeScript code.

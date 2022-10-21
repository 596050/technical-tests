import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Calendar } from "./calendar";

describe("Calendar", () => {
  it("Correct element is highlighted", async () => {
    const date = new Date();
    // ARRANGE
    render(<Calendar date={date} />);
    // ACT
    const element = await screen.findByTestId("highlighted-date");
    // ASSERT
    expect(Number(element.innerHTML)).toBe(date.getDate());
  });

  it("Correct element is highlighted", async () => {
    const date = new Date();
    // ARRANGE
    render(<Calendar date={date} />);
    // ACT
    const element = await screen.findByTestId("highlighted-date");
    // ASSERT
    expect(Number(element.innerHTML)).toBe(date.getDate());
  });

  it.each([
    [null, null],
    ["", null],
    ["Hello", null],
    [1234, null],
    [new Date("random"), null],
  ])(
    "should handle invalid input %s and return %s",
    async (input, expected) => {
      // ARRANGE
      render(<Calendar date={input} />);
      // ACT
      const element = await screen.queryByTestId("Calendar");
      // ASSERT
      expect(element).toBeNull();
    },
  );
});

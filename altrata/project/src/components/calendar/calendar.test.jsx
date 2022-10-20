import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Calendar } from "./calendar";

describe("loads and displays greeting", () => {
  it.only("", async () => {
    // ARRANGE
    render(<Calendar date={new Date()} />);
    console.log("screen", await screen.findAllByTestId("Calendar"));
    screen.findAllByTestId("Calendar");
    // // ACT
    // await userEvent.click(screen.getByText("Load Greeting"));
    // await screen.findByRole("heading");

    // // ASSERT
    // expect(screen.getByRole("heading")).toHaveTextContent("hello there");
    // expect(screen.getByRole("button")).toBeDisabled();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import StringCalculator from "../app/page";
import "@testing-library/jest-dom";

test("renders String Calculator component", () => {
  render(<StringCalculator />);
  expect(screen.getByText("String Calculator")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Enter numbers")).toBeInTheDocument();
  expect(screen.getByText("Calculate")).toBeInTheDocument();
});

test("calculates sum for an empty string", () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate");
  fireEvent.change(input, { target: { value: "" } });
  fireEvent.click(button);
  expect(screen.getByText("Sum: 0")).toBeInTheDocument();
});

test("calculates sum for a single number", () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate");
  fireEvent.change(input, { target: { value: "1" } });
  fireEvent.click(button);
  expect(screen.getByText("Sum: 1")).toBeInTheDocument();
});

test("calculates sum for two numbers", () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate");
  fireEvent.change(input, { target: { value: "1,5" } });
  fireEvent.click(button);
  expect(screen.getByText("Sum: 6")).toBeInTheDocument();
});

test("calculates sum for multiple numbers", () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate");
  fireEvent.change(input, { target: { value: "1,2,3,4,5" } });
  fireEvent.click(button);
  expect(screen.getByText("Sum: 15")).toBeInTheDocument();
});

test("calculates sum for numbers with new lines", () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate");
  fireEvent.change(input, { target: { value: "1\\n2,3" } });
  fireEvent.click(button);
  expect(screen.getByText("Sum: 6")).toBeInTheDocument();
});

test("calculates sum for numbers with custom delimiter", () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate");
  fireEvent.change(input, { target: { value: "//;\\n1;2" } });
  fireEvent.click(button);
  expect(screen.getByText("Sum: 3")).toBeInTheDocument();
});

test("throws error for negative numbers", () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate");
  fireEvent.change(input, { target: { value: "1,-2,3" } });
  fireEvent.click(button);
  expect(
    screen.getByText("Negative numbers not allowed: -2")
  ).toBeInTheDocument();
});

test("throws error for multiple negative numbers", () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate");
  fireEvent.change(input, { target: { value: "1,-2,-3" } });
  fireEvent.click(button);
  expect(
    screen.getByText("Negative numbers not allowed: -2, -3")
  ).toBeInTheDocument();
});

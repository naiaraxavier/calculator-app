import React from "react";
import Calculator from "../app/index";
import { render, fireEvent, screen } from "@testing-library/react-native";

describe("Calculator", () => {
  it("renders correctly", () => {
    render(<Calculator />);
    expect(screen.getByText("%")).toBeTruthy();
    expect(screen.getByTestId("display").props.children).toBe("0");
  });

  it("handles number input", () => {
    render(<Calculator />);
    fireEvent.press(screen.getByText("1"));
    fireEvent.press(screen.getByText("2"));
    fireEvent.press(screen.getByText("3"));
    expect(screen.getByText("123")).toBeTruthy();
    expect(screen.getByTestId("display").props.children).toBe("123");
  });

  it("handles operator input", () => {
    render(<Calculator />);
    fireEvent.press(screen.getByText("1"));
    fireEvent.press(screen.getByText("+"));
    expect(screen.getByText("1+")).toBeTruthy();
  });

  it("performs basic calculations", () => {
    render(<Calculator />);
    fireEvent.press(screen.getByText("2"));
    fireEvent.press(screen.getByText("+"));
    fireEvent.press(screen.getByText("3"));
    fireEvent.press(screen.getByText("="));
    expect(screen.getByTestId("display").props.children).toBe("5");
  });

  it("handles percentage calculations", () => {
    render(<Calculator />);
    fireEvent.press(screen.getByText("1"));
    fireEvent.press(screen.getByText("0"));
    fireEvent.press(screen.getByText("0"));
    fireEvent.press(screen.getByText("-"));
    fireEvent.press(screen.getByText("1"));
    fireEvent.press(screen.getByText("0"));
    fireEvent.press(screen.getByText("%"));
    fireEvent.press(screen.getByText("="));
    expect(screen.getByTestId("display").props.children).toBe("90");
  });

  it("handles decimal input", () => {
    render(<Calculator />);
    fireEvent.press(screen.getByText("1"));
    fireEvent.press(screen.getByText("."));
    fireEvent.press(screen.getByText("5"));
    expect(screen.getByTestId("display").props.children).toBe("1.5");
  });

  it("handles backspace", () => {
    render(<Calculator />);
    fireEvent.press(screen.getByText("1"));
    fireEvent.press(screen.getByText("2"));
    fireEvent.press(screen.getByText("3"));
    fireEvent.press(screen.getByText("⌫"));
    expect(screen.getByTestId("display").props.children).toBe("12");
  });

  it("handles division", () => {
    render(<Calculator />);
    fireEvent.press(screen.getByText("1"));
    fireEvent.press(screen.getByText("0"));
    fireEvent.press(screen.getByText("÷"));
    fireEvent.press(screen.getByText("2"));
    fireEvent.press(screen.getByText("="));
    expect(screen.getByTestId("display").props.children).toBe("5");
  });

  it("handles consecutive operations", () => {
    render(<Calculator />);
    fireEvent.press(screen.getByText("5"));
    fireEvent.press(screen.getByText("+"));
    fireEvent.press(screen.getByText("3"));
    fireEvent.press(screen.getByText("="));
    fireEvent.press(screen.getByText("+"));
    fireEvent.press(screen.getByText("2"));
    fireEvent.press(screen.getByText("="));
    expect(screen.getByTestId("display").props.children).toBe("10");
  });

  it("handles percentage without previous operation", () => {
    render(<Calculator />);
    fireEvent.press(screen.getByText("5"));
    fireEvent.press(screen.getByText("0"));
    fireEvent.press(screen.getByText("%"));
    expect(screen.getByText("0.5")).toBeTruthy();
  });

  it("handles changing operators", () => {
    render(<Calculator />);
    fireEvent.press(screen.getByText("5"));
    fireEvent.press(screen.getByText("+"));
    fireEvent.press(screen.getByText("-"));
    fireEvent.press(screen.getByText("3"));
    fireEvent.press(screen.getByText("="));
    expect(screen.getByTestId("display").props.children).toBe("2");
  });
});

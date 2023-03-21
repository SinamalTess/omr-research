import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders application", () => {
  render(<App />);

  const trainButton = screen.getByText(/Train model/i);

  expect(trainButton).toBeInTheDocument();
});

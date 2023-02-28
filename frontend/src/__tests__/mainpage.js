import { render, screen } from "@testing-library/react";
import MainPage from "../MainPage";

test("render main page", () => {
  render(<MainPage />);
  const linkElement = screen.getByText(/List all/i);
  expect(linkElement).toBeInTheDocument();
});

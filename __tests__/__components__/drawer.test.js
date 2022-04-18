import TemporaryDrawer from "../../components/header/Drawer"
import { render, screen, fireEvent } from "@testing-library/react";

test("Drawer Componentsのテスト", () => {
  render(<TemporaryDrawer/>)

  expect(screen.queryByText(/Home/)).toBeNull();
  expect(screen.queryByText(/About/)).toBeNull();
  expect(screen.queryByText(/Setting/)).toBeNull();
  expect(screen.queryByText(/Logout/)).toBeNull();


  const button = screen.getByRole("button")
  fireEvent.click(button)
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("About")).toBeInTheDocument();
  expect(screen.getByText("Setting")).toBeInTheDocument();
  expect(screen.getByText("Logout")).toBeInTheDocument();

});

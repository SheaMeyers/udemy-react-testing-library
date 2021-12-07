import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  // make sure total start out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);

  // make sure total start out $0.00
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // update the toppings to include M&Ms
  const cherries = await screen.findByRole("checkbox", { name: "Cherries" });
  userEvent.click(cherries);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // remove cherries and check total
  userEvent.click(cherries);
  expect(toppingsSubtotal).toHaveTextContent("0.00");
});

describe("Grand total", () => {
  test("grand total start at $0.00", () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      level: 2,
      name: /grand total/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");
  });

  test("grand total updates properly when scoop is added first", async () => {
    render(<OrderEntry />);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    const grandTotal = screen.getByRole("heading", {
      level: 2,
      name: /grand total/i,
    });
    expect(grandTotal).toHaveTextContent("2.00");
  });

  test("grand total updates properly when topping is added first", async () => {
    render(<OrderEntry />);

    const cherries = await screen.findByRole("checkbox", { name: "Cherries" });
    userEvent.click(cherries);

    const grandTotal = screen.getByRole("heading", {
      level: 2,
      name: /grand total/i,
    });
    expect(grandTotal).toHaveTextContent("1.50");
  });

  test("grand total updates properly when an item is removed", async () => {
    render(<OrderEntry />);

    const cherries = await screen.findByRole("checkbox", { name: "Cherries" });
    userEvent.click(cherries);

    const grandTotal = screen.getByRole("heading", {
      level: 2,
      name: /grand total/i,
    });
    expect(grandTotal).toHaveTextContent("1.50");

    userEvent.click(cherries);
    expect(grandTotal).toHaveTextContent("0.00");
  });
});

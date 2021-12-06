import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

// Checkbox is unchecked by default
// Checking checkbox enables button
// Unchecking checkbox again disables button

test("checkbox not checked by default", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test("clicking checkbox enables and disables button", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  // Confirm the button is enabled
  userEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  // Confirm the button is disabled when checkbox is unclicked
  userEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);

  // test popover is hidden at initial render
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // appears when we mouse over
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // disappears when mouse is no longer over
  userEvent.unhover(termsAndConditions);

  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});

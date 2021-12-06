import { render, screen, fireEvent } from '@testing-library/react';
import App, { replaceCamelWithSpaces } from './App';

test('button has correct initial color and text', () => {
  render(<App />);

  // find an element with a role of button AND text of 'Change to MediumVioletRed'
  const colorButton = screen.getByRole('button', { name: 'Change to MidnightBlue' });

  // expect the background color to be MediumVioletRed
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed'})
});

test('button turns blue when clicked', () => {
  render(<App />);

  // find an element with a role of button AND text of 'Change to MediumVioletRed'
  const colorButton = screen.getByRole('button', { name: 'Change to MidnightBlue' });

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed'});

  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue'});

  // expect the button text to be 'Change to red'
  expect(colorButton.textContent).toBe('Change to MediumVioletRed');
});

test('initial conditions', () => {
  render(<App />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to MidnightBlue'});
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');

  expect(checkbox).not.toBeChecked();
});

test('checking checkbox disables button', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: 'Change to MidnightBlue'});
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

  // Test initial state
  expect(colorButton).toBeEnabled();
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox)

  // Test button disabled when checkbox clicked
  expect(colorButton).toBeDisabled();
  expect(checkbox).toBeChecked();

  fireEvent.click(checkbox)

  // Test unclicking checkbox enables button again
  expect(colorButton).toBeEnabled();
  expect(checkbox).not.toBeChecked();
});

test('disabling button turns color gray', () => {
  render(<App />);

  const colorButton = screen.getByRole('button');
  const checkbox = screen.getByRole('checkbox');
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed'});

  // Disable button and check color
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray'});

  // Enable button and check color
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed'});
});

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });

  test('Works for one inner capital letters', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });

  test('Works for multiple capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
})
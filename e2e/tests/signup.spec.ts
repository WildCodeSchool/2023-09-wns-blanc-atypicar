import { test, expect } from "playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}/signup`);
});

test("should display the signup form", async ({ page }) => {
  const form = await page.waitForSelector('[data-testid="signup-form"]');
  expect(form).toBeTruthy();
});

test("should disable the submit button when the form is empty", async ({
  page,
}) => {
  const submitButton = await page.waitForSelector(
    '[data-testid="submit-signup"]'
  );
  expect(submitButton).toBeTruthy();
  expect(await submitButton.isDisabled()).toBeTruthy();
});

test("should submit the form successfully", async ({ page }) => {
  await page.fill('[data-testid="first-name"]', "John");
  expect(await page.inputValue('[data-testid="first-name"]')).toBe("John");

  await page.fill('[data-testid="last-name"]', "Doe");
  expect(await page.inputValue('[data-testid="last-name"]')).toBe("Doe");

  await page.fill('[data-testid="email"]', "john@example.com");
  expect(await page.inputValue('[data-testid="email"]')).toBe(
    "john@example.com"
  );

  await page.fill('[data-testid="password"]', "password123");
  expect(await page.inputValue('[data-testid="password"]')).toBe("password123");

  await page.fill('[data-testid="password-confirmation"]', "password123");
  expect(await page.inputValue('[data-testid="password-confirmation"]')).toBe(
    "password123"
  );

  await page.fill('[data-testid="birthday-input"]', "2024-02-14");
  const birthdayInput = await page.inputValue('[data-testid="birthday-input"]');
  expect(birthdayInput).toBe("2024-02-14");

  const submitButton = await page.waitForSelector(
    '[data-testid="submit-signup"]'
  );
  await submitButton.click();
});

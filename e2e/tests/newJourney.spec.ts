import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://frontend:3000/journeys/new");
});

test("should display the new journey form", async ({ page }) => {
  const journeyForm = page.getByTestId("journey-form");
  expect(journeyForm).toBeVisible();
});

test("should add a new journey and redirect to journeys page", async ({
  page,
}) => {
  await page.getByLabel("Ville de départ").click();
  await page.getByLabel("Ville de départ").fill("Paris");

  await page.getByLabel("Ville d'arrivée").click();
  await page.getByLabel("Ville d'arrivée").fill("Lyon");

  await page.getByLabel("Date de départ").click();
  await page.getByLabel("Date de départ").fill("2024-02-14T12:00");

  await page.getByLabel("Date d'arrivée (estimée)").click();
  await page.getByLabel("Date d'arrivée (estimée)").fill("2024-02-14T22:30");

  await page.getByTestId("journey-price").click();
  await page.getByTestId("journey-price").fill("80");

  await page.getByTestId("journey-seats").click();
  await page.getByTestId("journey-seats").fill("2");

  await page
    .getByPlaceholder("Décrivez votre trajet en quelques mots...")
    .click();
  await page
    .getByPlaceholder("Décrivez votre trajet en quelques mots...")
    .fill("test");

  await page.click('[data-testid="confirm-journey"]');
  await page.waitForURL("http://frontend:3000/journeys");

  expect(page.url()).toEqual("http://frontend:3000/journeys");
});

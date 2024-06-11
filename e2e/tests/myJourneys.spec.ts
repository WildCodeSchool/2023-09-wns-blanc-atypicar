import { test, expect, ElementHandle } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}/journeys`);

});

test("renders title", async ({ page }) => {
  await page.waitForSelector('[data-testid="journey-title"]');
  const title = await page.$('[data-testid="journey-title"]');
  const titleText = await title?.innerText();
  expect(titleText).toBe("Tous mes trajets publiés");
});

test("renders the JourneyCard component correctly", async ({ page }) => {
  const journeyCard = await page.$(
    '[data-testid="journey-card"]:nth-of-type(1)'
  );
  if (journeyCard) {
    await checkElementDefined(
      journeyCard,
      '[data-testid="journey-starting-point"]'
    );
    await checkElementDefined(
      journeyCard,
      '[data-testid="journey-arrival-point"]'
    );
    await checkElementDefined(
      journeyCard,
      '[data-testid="journey-start-date"]'
    );
    await checkElementDefined(journeyCard, '[data-testid="journey-end-date"]');
    await checkElementDefined(journeyCard, '[data-testid="journey-price"]');
  }
});

async function checkElementDefined(element: ElementHandle, selector: string) {
  const childElement = await element.$(selector);
  expect(childElement).toBeDefined();
}

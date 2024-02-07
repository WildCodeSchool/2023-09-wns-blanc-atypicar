import {
  test,
  expect,
  chromium,
  Browser,
  Page,
  ElementHandle,
} from "@playwright/test";
import { describe } from "node:test";

let browser: Browser;
let page: Page;

test.beforeAll(async () => {
  browser = await chromium.launch();
});

describe("My Journeys page", () => {
  test.beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://localhost:3000/journeys");
  });

  test("renders title", async () => {
    const title = await page.$('[data-testid="journey-title"]');
    const titleText = await title?.innerText();
    expect(titleText).toBe("Tous mes trajets publiés");
  });

  test("renders correct number of JourneyCard components", async () => {
    const journeyCards = await page.$$('[data-testid="journey-card"]');
    expect(journeyCards.length).toBe(3);
  });

  test("renders the JourneyCard component correctly", async () => {
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
      await checkElementDefined(
        journeyCard,
        '[data-testid="journey-end-date"]'
      );
      await checkElementDefined(journeyCard, '[data-testid="journey-price"]');
    }
  });
});

async function checkElementDefined(element: ElementHandle, selector: string) {
  const childElement = await element.$(selector);
  expect(childElement).toBeDefined();
}

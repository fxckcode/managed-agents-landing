import { expect, test, type Page } from "@playwright/test";

const SIZES = [320, 375, 390, 768, 1280] as const;

async function openLanding(page: Page) {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
}

test.describe("metadatos y estructura", () => {
  test("idioma, título y metadatos sociales en español", async ({ page }) => {
    await openLanding(page);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page).toHaveTitle(/^Pausa — Micro-descansos guiados/);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "es_ES");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  });

  test("el skip link es el primer foco de teclado", async ({ page }) => {
    await openLanding(page);
    await page.keyboard.press("Tab");
    await expect(page.locator(".skip-link")).toBeFocused();
  });
});

test.describe("formulario de lista de espera (demo)", () => {
  test("envío vacío muestra ambos errores y enfoca el primer campo", async ({ page }) => {
    await openLanding(page);
    await page.getByRole("button", { name: "Unirme a la lista (demo)" }).click();

    await expect(page.locator("#nombre-error")).toHaveText("Escribe tu nombre.");
    await expect(page.locator("#email-error")).toHaveText("Escribe tu correo electrónico.");
    await expect(page.locator("#nombre")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#nombre")).toBeFocused();
    await expect(page.locator("#nombre-error")).toHaveAttribute("role", "alert");
  });

  test("formato de correo inválido y corrección del error", async ({ page }) => {
    await openLanding(page);
    await page.locator("#nombre").fill("Ana");
    await page.locator("#email").fill("ana@");
    await page.getByRole("button", { name: "Unirme a la lista (demo)" }).click();

    await expect(page.locator("#email-error")).toHaveText(
      "Revisa el formato del correo (por ejemplo, nombre@dominio.com).",
    );
    await expect(page.locator("#email")).toBeFocused();

    await page.locator("#email").fill("ana@ejemplo.com");
    await expect(page.locator("#email-error")).toBeHidden();
    await expect(page.locator("#email")).not.toHaveAttribute("aria-invalid", "true");
  });

  test("envío válido muestra el aviso de demo sin red ni almacenamiento", async ({ page, baseURL }) => {
    await openLanding(page);

    const externalOrWrite: string[] = [];
    page.on("request", (req) => {
      const sameOrigin = req.url().startsWith(baseURL!);
      if (!sameOrigin || req.method() !== "GET") externalOrWrite.push(`${req.method()} ${req.url()}`);
    });

    await page.locator("#nombre").fill("Ana");
    await page.locator("#email").fill("ana@ejemplo.com");
    await page.getByRole("button", { name: "Unirme a la lista (demo)" }).click();

    await expect(page.locator("#demo-form")).toBeHidden();
    await expect(page.locator("#demo-result")).toBeVisible();
    await expect(page.locator("#demo-result")).toBeFocused();
    await expect(page.locator("#demo-result")).toContainText("Esto es una demo.");

    const storage = await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
      cookie: document.cookie,
    }));
    expect(storage).toEqual({ local: 0, session: 0, cookie: "" });
    expect(externalOrWrite).toEqual([]);
  });
});

test.describe("diseño responsive", () => {
  for (const width of SIZES) {
    test(`sin desbordamiento horizontal ni CTA oculto a ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await openLanding(page);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
      await expect(page.locator(".hero .btn")).toBeVisible();
    });
  }
});

test("reduced-motion desactiva el desplazamiento suave", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openLanding(page);
  const behavior = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
  expect(behavior).toBe("auto");
});

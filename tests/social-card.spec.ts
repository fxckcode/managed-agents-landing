import { expect, test } from "@playwright/test";

test.describe("tarjeta para compartir (Open Graph / Twitter)", () => {
  test("og:image y twitter:image apuntan a una URL absoluta de 1200 × 630", async ({ page, baseURL }) => {
    await page.goto("/");
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute("content", /^https?:\/\//);
    await expect(ogImage).toHaveAttribute("content", new RegExp(`^${baseURL!.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/opengraph-image`));
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "630");
    await expect(page.locator('meta[property="og:image:type"]')).toHaveAttribute("content", "image/png");
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", /\/opengraph-image/);
  });

  test("la imagen existe, es PNG y tiene las dimensiones anunciadas", async ({ request }) => {
    const res = await request.get("/opengraph-image");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
    const body = await res.body();
    // PNG IHDR: width and height are big-endian uint32 at bytes 16..23.
    expect(body.subarray(1, 4).toString("ascii")).toBe("PNG");
    expect(body.readUInt32BE(16)).toBe(1200);
    expect(body.readUInt32BE(20)).toBe(630);
  });
});

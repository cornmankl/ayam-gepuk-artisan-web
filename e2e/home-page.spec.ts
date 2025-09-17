import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Check if the page title is correct
    await expect(page).toHaveTitle(/Ayam Gepuk Artisan/);

    // Check for main navigation elements
    await expect(page.locator('nav')).toBeVisible();

    // Check for key sections on homepage
    await expect(page.locator('text=Ayam Gepuk')).toBeVisible();
    await expect(page.locator('text=Artisan')).toBeVisible();
  });

  test('should navigate to menu page', async ({ page }) => {
    await page.goto('/');

    // Find and click menu link
    const menuLink = page.locator('a[href="/menu"], a:has-text("Menu")');
    await menuLink.first().click();

    // Verify we're on the menu page
    await expect(page).toHaveURL(/.*\/menu/);
    await expect(page.locator('text=Menu')).toBeVisible();
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');

    // Find and click about link
    const aboutLink = page.locator('a[href="/about"], a:has-text("About")');
    await aboutLink.first().click();

    // Verify we're on the about page
    await expect(page).toHaveURL(/.*\/about/);
    await expect(page.locator('text=About')).toBeVisible();
  });

  test('should display contact information', async ({ page }) => {
    await page.goto('/');

    // Check for contact information (phone number should be visible somewhere)
    const phoneNumber = '0182442017';
    await expect(
      page.locator(`text=${phoneNumber}, a[href="tel:${phoneNumber}"]`)
    ).toBeVisible();
  });

  test('cart functionality - add item and view cart', async ({ page }) => {
    await page.goto('/menu');

    // Wait for menu items to load
    await page.waitForLoadState('networkidle');

    // Look for "Add to Cart" buttons and click the first one available
    const addToCartButton = page
      .locator('button:has-text("Add to Cart"), button:has-text("Order Now")')
      .first();
    if ((await addToCartButton.count()) > 0) {
      await addToCartButton.click();

      // Navigate to cart
      const cartLink = page.locator('a[href="/cart"], a:has-text("Cart")');
      await cartLink.first().click();

      // Verify we're on the cart page
      await expect(page).toHaveURL(/.*\/cart/);
    }
  });

  test('responsive design - mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check if mobile menu button is visible
    const mobileMenuButton = page.locator(
      'button[aria-label*="menu"], .mobile-menu-button, button:has-text("☰")'
    );
    if ((await mobileMenuButton.count()) > 0) {
      await expect(mobileMenuButton).toBeVisible();
    }

    // Verify main content is still accessible
    await expect(page.locator('text=Ayam Gepuk')).toBeVisible();
  });

  test('404 page handling', async ({ page }) => {
    // Navigate to a non-existent page
    await page.goto('/non-existent-page');

    // Should see 404 content
    await expect(page.locator('text=404, text=Not Found')).toBeVisible();

    // Should have a way to get back home
    const homeLink = page.locator(
      'a[href="/"], a:has-text("Home"), a:has-text("Back to Home")'
    );
    await expect(homeLink.first()).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

test('should load the homepage and display the correct content', async ({ page }) => {
  await page.goto('/'); // Uses the baseURL defined in the configuration

  // Check if the page title is correct
  await expect(page).toHaveTitle(/React App/);

  // Check if a specific element is visible
  const header = await page.locator('h1');
  await expect(header).toHaveText('Welcome to React');

  // Simulate a user interaction
  await page.click('button#login');
  await expect(page.locator('text="Login successful"')).toBeVisible();
});

test.describe('React Counter App', () => {
    test('카운터 초기 상태 확인', async ({ page }) => {
      // 애플리케이션 로드
      await page.goto('/');
  
      // 초기 카운터 값 확인
      const counter = await page.locator('#counter').textContent();
      expect(counter).toBe('0');
    });
  
    test('카운터 증가 버튼 테스트', async ({ page }) => {
      await page.goto('/');
  
      // 증가 버튼 클릭
      await page.click('#increment');
  
      // 카운터 값 확인
      const counter = await page.locator('#counter').textContent();
      expect(counter).toBe('1');
    });
  
    test('카운터 감소 버튼 테스트', async ({ page }) => {
      await page.goto('/');
  
      // 감소 버튼 클릭
      await page.click('#decrement');
  
      // 카운터 값 확인
      const counter = await page.locator('#counter').textContent();
      expect(counter).toBe('-1');
    });
  });
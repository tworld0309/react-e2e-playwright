import { test, expect, TestInfo } from '@playwright/test';
import * as fs from 'fs';

// test('should load the homepage and display the correct content', async ({ page }) => {
//   await page.goto('/'); // Uses the baseURL defined in the configuration

//   // Check if the page title is correct
//   await expect(page).toHaveTitle(/React App/);

//   // Check if a specific element is visible
//   const header = await page.locator('h1');
//   await expect(header).toHaveText('Welcome to React');

//   // Simulate a user interaction
//   await page.click('button#login');
//   await expect(page.locator('text="Login successful"')).toBeVisible();
// });

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

let testStartTime;

test.beforeEach(async () => {
  testStartTime = Date.now();
});

// 치환 함수 정의
function sanitizeString(input) {
  if (!input) return null; // null 값은 그대로 반환
  return input
    .replace(/-/g, " - ") // `-` 주변에 공백 추가
    .replace(/'/g, "&#39;") // 작은따옴표를 HTML 엔티티로 변환
    .replace(/"/g, "&quot;") // 큰따옴표를 HTML 엔티티로 변환
    .replace(/[\n\r]/g, " "); // 줄바꿈을 공백으로 치환
}

test.afterEach(async ({}, testInfo) => {
  const logEntry = {
    testName: sanitizeString(testInfo.title),
    status: testInfo.status,
    duration: testInfo.duration || 0,
    startTime: new Date(testStartTime).toISOString(),
    endTime: new Date(Date.now()).toISOString(),
    browser: testInfo.project.name,
    platform: process.platform,
    error: sanitizeString(testInfo.error ? testInfo.error.message : null),
    callLog: sanitizeString(
      testInfo.attachments.find((a) => a.name === "call-log")?.body || null
    ),
    screenshot:
      testInfo.attachments.find((a) => a.name === "screenshot")?.path || null,
  };

  // JSON.stringify로 안전한 JSON 문자열로 변환 후 저장
  fs.appendFileSync(
    "playwright-results/playwright-results.log",
    JSON.stringify(logEntry) + "\n"
  );
});

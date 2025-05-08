import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import fs from 'fs';

// Setup Environment
export const env = process.env.TEST_ENV || 'beta'; // Default to beta
const envFile = `.${env}.env`;
if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile });
} else {
    throw new Error(`Environment file ${envFile} not found!`);
}

// todo: remove after test
console.log('Loaded ENV:', process.env.EXPECT_TIMEOUT, envFile);



/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  
    timeout: Number(process.env.EXPECT_TIMEOUT) || 60000,
  /* Configure projects for major browsers */
  projects: [
    //{
     // name: 'chromium',
    //  use: { ...devices['Desktop Chrome'] },
    //},

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
    {
      name: "setup-login",
      use: {
        ...devices["Desktop Chrome"]
      },
      testMatch: /.*login\.setup\.ts/
    },
    {
      name: "setup-sign-up",
      use: {
        ...devices["Desktop Chrome"]
      },
      testMatch: /.*sign-up\.setup\.ts/
    },
    {
      name: "behind-login",
      use:{
        ...devices["Desktop Chrome"],
        storageState: "storageState/login.json"
      },
      dependencies: ["setup-login"],
    },
    {
      name: "behind-sign-up",
      use:{
        ...devices["Desktop Chrome"],
        storageState: "storageState/sign-up.json"
      },
      dependencies: ["setup-sign-up"],
    }
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

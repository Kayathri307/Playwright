import { test as base } from '@playwright/test';

// Custom test with fixture
export const test = base.extend({
  testDatafixture: async ({}, use) => {
    const data = {
      userName: 'kayaui@gmail.com',
      password: 'Test@1234',
      productName: 'ZARA COAT 3'
    };

    await use(data);
  }
});

export { expect } from '@playwright/test';

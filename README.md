# playwright-login

Helper function to login and persist session when using playwright

[![npm Package Version](https://img.shields.io/npm/v/playwright-login.svg?maxAge=3600)](https://www.npmjs.com/package/playwright-login)

## Typescript Signature

```typescript
export function restoreLoginContext(options: {
  browser: Browser
  storageFile: string
  url: string // of the home page or login page
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle'
  shouldLogin: (page: Page) => Promise<boolean>
  login: (page: Page) => Promise<void>
}): Promise<Page>
```

## Usage Example

```typescript
let username = process.env.USERNAME!
let password = process.env.PASSWORD!

let browser = await chromium.launch()
let page = await restoreLoginContext({
  browser,
  storageFile: 'browserState.json',
  url: 'https://example.net/login',
  shouldLogin: (page: Page) =>
    page.evaluate(() => !!document.querySelector('#loginform')),
  login: async page => {
    await page.fill('#loginform [name="username"]', username)
    await page.fill('#loginform [name="password"]', password)
    await Promise.all([
      page.click('#loginform [type="submit"]'),
      page.waitForNavigation(),
    ])
  },
})

await page.evaluate(() => {
  // perform further operations that is only accessible after login
})
```

Details refers to [example/demo.ts](./example/demo.ts)

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others

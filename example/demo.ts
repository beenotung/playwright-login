import { chromium, Page } from 'playwright'
import { restoreLoginContext } from '../src'

export async function main() {
  let storageFile = 'browserState.json'
  let url = 'https://example.net/login'
  let username = process.env.USERNAME!
  let password = process.env.PASSWORD!

  let browser = await chromium.launch({ headless: false })
  let page = await restoreLoginContext({
    browser,
    storageFile,
    url,
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
  console.log('ready')

  let body = await page.innerHTML('body')
  console.log('body:', body.length)
  await browser.close()
}
main()

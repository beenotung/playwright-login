import { Browser, Page } from 'playwright'
import * as fs from 'fs'

export async function restoreLoginContext(options: {
  browser: Browser
  storageFile: string
  url: string
  shouldLogin: (page: Page) => Promise<boolean>
  login: (page: Page) => Promise<void>
}): Promise<Page> {
  let page: Page
  if (!fs.existsSync(options.storageFile)) {
    page = await options.browser.newPage()
    await page.context().storageState({ path: options.storageFile })
  } else {
    let context = await options.browser.newContext({
      storageState: options.storageFile,
    })
    page = await context.newPage()
  }
  await page.goto(options.url)
  if (await options.shouldLogin(page)) {
    await options.login(page)
    await page.context().storageState({ path: options.storageFile })
  }
  return page
}

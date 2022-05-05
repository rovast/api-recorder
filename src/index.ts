import puppeteer, {Browser, HTTPResponse, Page} from 'puppeteer-core'
import {ERROR, INFO, FLASH} from "./shared"
import {Config, Header, PostmanCollection} from "./types"
import URL from "url"
import fs from "fs"
import {Command} from "commander"

let Config: Config

// @ts-ignore
const PostmanCollection: PostmanCollection = {
  info: {
    name: "OpenMSP",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  // @ts-ignore
  item: []
}

function setupConfiguration() {
  const program = new Command()

  program
    .description('A tool for record your api')
    .option('-n, --name <name>', 'collection name', 'record-api')
    .option('-o, --output <output_file>', 'output json file path', 'postman-collection.json')
    .option('-b, --browser <execute_path>', 'browser execute path', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
    .option('-m, --match <regex>', 'match the api path', '/api/');

  program.parse(process.argv);

  Config = program.opts();
}

async function launchAPP(): Promise<{ browser: Browser; page: Page; }> {
  INFO('Launch chrome...')
  const browser: Browser = await puppeteer.launch({
    executablePath: Config.browser,
    headless: false,
    userDataDir: './user-data',
    defaultViewport: {width: 1366, height: 768}
  })

  INFO('Open new page')
  const page: Page = await browser.newPage()

  return {browser, page}
}

function headerObjToKV(headers: Record<string, string>): Array<Header> {
  const arr: Array<Header> = []
  Object.keys(headers).forEach(key => {
    arr.push({
      key,
      value: headers[key]
    })
  })

  return arr
}

function listenBrowserEvents(browser: Browser): void {
  // page close event or browser close event
  browser.on('targetdestroyed', async (_) => {
    ERROR('Page close, write postman collection to file')
    await fs.writeFileSync(Config.output, JSON.stringify(PostmanCollection), {flag: 'w'})
    FLASH('EXIT process')
    process.exit(0)
  })
}

function listenPageEvents(page: Page): void {
  page.on('response', async (response: HTTPResponse) => {
    const url = response.request().url()
    if (!url.includes(Config.match)) return

    const urlObj = URL.parse(url)
    const pathname = urlObj.pathname || ' '
    const pathArr = pathname?.split('/')
    pathArr?.shift()

    const request = {
      method: response.request().method(),
      header: headerObjToKV(response.request().headers()),
      url: {
        raw: pathname,
        host: urlObj.hostname,
        path: pathArr
      }
    }

    PostmanCollection.item.push({
      name: pathname,
      // @ts-ignore
      request,
      response: [
        {
          name: 'success',
          // @ts-ignore
          originalRequest: request,
          // @ts-ignore
          header: headerObjToKV(response.request().headers()),
          status: response.statusText(),
          code: response.status(),
          // @ts-ignore
          body: await response.text()
        }
      ]
    })
  });
}

;(async () => {
  setupConfiguration()

  const {browser, page} = await launchAPP()
  listenBrowserEvents(browser)
  listenPageEvents(page)
})()

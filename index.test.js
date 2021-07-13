require("dotenv").config();

const puppeteer = require('puppeteer-core')

jest.setTimeout(20000)


const isShowTestInBrowser = (process.env.SHOW_TEST_IN_BROWSER.toLowerCase()==="yes")

const baseUrl = process.env.BASE_URL;
const routes = {
  public: {
    login: `${baseUrl}/admin`,
  },
  private: {
    home: `${baseUrl}/admin/home`,
    general_freight_booking: `${baseUrl}/admin/general_freight.general_freight_booking`,
  }
}

const user = {
  username: process.env.APP_USERNAME,
  password: process.env.APP_PASSWORD,
}

var browser = null;
var page = null;

async function isBrowserClosed() {
  if(browser === null) return true; 
  const procInfo = await browser.process();
  return !!procInfo.signalCode;
}

beforeAll(async () => {
    // set some options (set headless to false so we can see 
    // this automated browsing experience)
    let launchOptions = { 
      headless: !isShowTestInBrowser, 
      slowMo: 100,
      executablePath: process.env.GOOGLE_CHROME_EXECUTABLE_PATH,
      // args: ['--start-maximized'],
      // args: [`--window-size=1920,1080`],
      args: ["--start-maximized", "--force-device-scale-factor=1"],
      defaultViewport: {
        width:1920,
        height:1080
      }
    };

    browser = await puppeteer.launch(launchOptions);
    page = await browser.newPage();

    page.on("close", function() {
      console.log("Browser closed!")
    })
})

describe("private routes", () => {
  test("redirects to login page when logged out", async() => {
    await page.goto(routes.private.general_freight_booking)
    await page.waitForSelector(`input[name="username"]`)
  })
})

describe("public routes", () => {
  test("can login", async() => {
    await page.goto(routes.public.login)
    await page.waitForSelector(`input[name="username"]`)
    await page.type(`input[name="username"]`, user.username)
    await page.type(`input[name="password"]`, user.password)
    await page.click(`button[type="submit"]`)
    await page.waitForSelector(`.lastlogin a`)
  })
})

afterAll(async () => {
  if(isShowTestInBrowser) {
    while(await isBrowserClosed() === false) {}
  }
  else {
    browser.close()
  }
})

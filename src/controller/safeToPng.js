const puppeteer = require('puppeteer')

/**
 * @param url
 * @return {Promise<Buffer|null>}
 */
const saveToPng = async url => {
  let img

  // Browser actions & buffer creator
  const browser = await puppeteer.launch(
    {
      executablePath: '/usr/bin/chromium-browser',
      args: ['--disable-dev-shm-usage'],
    }
  )

  try {
    const page = await browser.newPage()
    await page.goto(url)
    img = await page.screenshot({fullPage: true})
  } catch (ex) {

  }

  await browser.close()

  // Return Buffer
  return img
}

module.exports = saveToPng

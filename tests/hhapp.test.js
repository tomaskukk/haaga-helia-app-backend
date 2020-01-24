// const webdriver = require('selenium-webdriver')
// const chrome = require('selenium-webdriver/chrome')
// const { Builder, By, Key, until } = require('selenium-webdriver')
// const chromedriver = require('chromedriver')

// describe('test hhapp lukkari', () => {

//    let driver

//   beforeEach( async () => {
//     driver = new webdriver.Builder()
//     .forBrowser('chrome')
//     .build()
//   })

//   afterEach(() => {
//     driver.quit()
//   })

//   it('should open hhapp', async () => {
//     try {
//       jest.setTimeout(30000)
//       await driver.get('https://hhapp.info')
//       driver
//         .getTitle()
//         .then(title => {
//           expect(title).toBe('Haaga-Helia App')
//         })
//     } catch(exception) {
//       console.log(exception)
//     }

//   })

//   it('should be able to search tn2pd timetable and find ENG1TN003-3002 course',
//   async () => {
//       await driver.get('http://localhost:3000')
//       await driver.findElement(By.name('groupId')).sendKeys('tn2pd')
//       const searchButton = await driver.findElement(By.id('searchButton'))
//       await searchButton.click()
//       await driver.wait(until.elementLocated(By.className('cl-event-dl'),
//       5000, 'looking for element'))
//       const element = await driver.findElement(By.className('cl-event-dl'))
//       const text = await element.getText()
//       expect(text).toContain('ENG1TN003-3002')
//   })

// })

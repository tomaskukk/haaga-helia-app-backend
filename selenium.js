const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver')
const { Builder, By, Key, until } = require('selenium-webdriver')


chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const mainTest = async ()  => {


  let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build()

  await driver.get('https://hhapp.info')
  await driver.findElement(By.name('groupId')).sendKeys('tn2pd')
  const search = await driver.findElement(By.id('searchButton'))
  search.click()

}

mainTest()
  


'use strict';

const properties = require('../../../../properties.json');

module.exports = class LoginPage {

	constructor(driver) {
		this.driver = driver;
	}

	async EnterLoginCredentials() {
		await this.driver.url(`${properties.GHOST_BASE_URL}/ghost`);
		let emailElement = await this.driver.$('input[name="identification"]');
		await emailElement.setValue(properties.EMAIL);

		let passwordElement = await this.driver.$('input[name="password"]');
		await passwordElement.setValue(properties.PASSWORD);

		this.driver.takeScreenshot();

		let submitElement = await this.driver.$('button[type="submit"]');
		await submitElement.click();

		return new Promise(r => setTimeout(r, 2000));
	}
};
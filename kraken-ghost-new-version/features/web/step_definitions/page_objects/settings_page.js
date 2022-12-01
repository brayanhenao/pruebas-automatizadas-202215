'use strict';

const properties = require('../../../../properties.json');
const {expect} = require('chai');

module.exports = class SettingsPage {
	constructor(driver) {
		this.driver = driver;
	}

	async NavigateToSettings() {
		await this.driver.url(`${properties.GHOST_BASE_URL}/ghost/#/settings`);
	}

	async NavigateToGhost() {
		await this.driver.url(`${properties.GHOST_BASE_URL}`);
	}

	async ClickCodeInjectionFeature() {
		await this.driver.url(`${properties.GHOST_BASE_URL}/ghost/#/settings/code-injection/`);
	}

	async FillInCodeInjectionEditor(code) {
		let codeInjectionEditorElement = await this.driver.$('.settings-code-editor');
		await codeInjectionEditorElement.click();
		let spanContentElement = await this.driver.$('span[role="presentation"]');
		await spanContentElement.setValue(code);
	}

	async FillInCodeInjectionEditorFooter(code) {
		let codeInjectionEditorElement = await this.driver.$('#ghost-foot');
		await codeInjectionEditorElement.click();
		let spanContentElement = await this.driver.$('span[role="presentation"]');
		await spanContentElement.setValue(code);
	}

	async ScrollDown(){
		let footerElement = await this.driver.$('.site-footer');
		await footerElement.click();
	}

	async CheckCustomHeader(headerText){
		let customHeaderElement = await this.driver.$('.custom-header');
		const customHeaderText = await customHeaderElement.getText();
		if (headerText === customHeaderText){
			return;
		}
		throw new Error(`Custom header ${headerText} is not in the ghost blog`);
	}

	async CheckCustomFooter(footerText){
		let customFooterElement = await this.driver.$('.custom-footer');
		const customFooterText = await customFooterElement.getText();
		if (footerText === customFooterText){
			return;
		}
		throw new Error(`Custom footer ${footerText} is not in the ghost blog`);
	}

};
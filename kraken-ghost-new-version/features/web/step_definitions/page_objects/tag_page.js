'use strict';

const properties = require('../../../../properties.json');
const {expect} = require('chai');

module.exports = class TagPage {
	constructor(driver) {
		this.driver = driver;
	}

	async NavigateToTags() {
		await this.driver.url(`${properties.GHOST_BASE_URL}/ghost/#/tags`);
	}

	async ClickCreateTagsButton() {
		let createPostElement = await this.driver.$('a[href="#/tags/new/"]');
		await createPostElement.click();
	}

	async ClickSaveTagButton() {
		let saveTagElement = await this.driver.$('.view-actions > button');
		await saveTagElement.click();
	}

	async FillInTitle(title) {
		let titleElement = await this.driver.$('#tag-name');
		await titleElement.setValue(title);
	}

	async FillInDescription(content) {
		let titleElement = await this.driver.$('#tag-description');
		await titleElement.setValue(content);
	}

	async VerifyTagTitle(title) {
		let tagTitleElements = await this.driver.$$('.gh-tag-list-name');
		const arrayAux = [];
		for (const element of tagTitleElements) {
			let pageTitle = await element.getText();
			if (pageTitle === title) {
				arrayAux.push(element);
			}
		}
		expect(arrayAux.length).to.equal(1);
	}

	async VerifyNumbersTagWithTitle(title, number) {
		let element = await this.driver.$(
			'.gh-list-data.gh-tag-list-posts-count > span.nowrap'
		);
		const stringNumber = await element.getText();
		const textPost = number > 1 ? 'posts' : 'post';
		expect(stringNumber).to.equal(`${number} ${textPost}`);
	}
};

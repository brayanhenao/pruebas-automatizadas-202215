'use strict';

const properties = require('../../../../properties.json');
const {expect} = require('chai');

module.exports = class PagePage {
	constructor(driver) {
		this.driver = driver;
	}

	async NavigateToPages() {
		await this.driver.url(`${properties.GHOST_BASE_URL}/ghost/#/pages`);
	}

	async ClickCreatePageButton() {
		let createPostElement = await this.driver.$('a[href="#/editor/page/"]');
		await createPostElement.click();
	}

	async FillInTitle(title) {
		let titleElement = await this.driver.$('.gh-editor-title.ember-text-area');
		await titleElement.setValue(title);
	}

	async FillInDescription(content) {
		let titleElement = await this.driver.$('.koenig-editor__editor.__mobiledoc-editor');
		await titleElement.setValue(content);
	}

	async ClickPublishButton() {
		let publishElement = await this.driver.$('.gh-publish-trigger');

		if (!await publishElement.isExisting()) {
			publishElement = await this.driver.$('.gh-publishmenu.ember-view');
		}

		await publishElement.click();
	}

	async ClickRightNowButton() {
		let publishContinueElement = await this.driver.$('.gh-publish-cta > button');
		await publishContinueElement.click();
		let rightNowElement = await this.driver.$('.gh-publish-setting.last > .gh-publish-setting-title');
		await rightNowElement.click();
	}

	async ClickScheduleForLaterButton() {
		let ScheduleForLaterElement = await this.driver.$('.gh-publish-schedule > .gh-radio:not([class*="active"])');
		await ScheduleForLaterElement.click();
	}

	async ClickFilterPageButton() {
		let FilterPageElement = await this.driver.$('.gh-contentfilter-menu.gh-contentfilter-type > .gh-contentfilter-menu-trigger');
		await FilterPageElement.click();
	}

	async ClickFilterDrafPageButton() {
		let FilterDrafPageElement = await this.driver.$('.ember-power-select-options > .ember-power-select-option:nth-child(2)');
		await FilterDrafPageElement.click();
	}

	async ClickFilterPublishedPageButton() {
		let filterPublishedPageElement = await this.driver.$('.ember-power-select-options > .ember-power-select-option:nth-child(3)');
		await filterPublishedPageElement.click();
	}

	async FillInDateForLater(date) {
		let dateForLaterElement = await this.driver.$('.gh-date-time-picker-date > input');
		await dateForLaterElement.setValue(date);
	}

	async FillInTimeForLater(time) {
		let timeForLaterElement = await this.driver.$('.gh-date-time-picker-time > input');
		await timeForLaterElement.setValue(time);
	}

	async ClickPublishNowButton() {
		let publishNowElement = await this.driver.$('.gh-publish-cta');

		if (!await publishNowElement.isExisting()) {
			publishNowElement = await this.driver.$('.gh-btn-blue.gh-publishmenu-button.gh-btn-icon');
			await publishNowElement.click();
		} else {
			await publishNowElement.click();
			let confirmPublishNowElement = await this.driver.$('.gh-btn.gh-btn-large.gh-btn-pulse.ember-view');
			await confirmPublishNowElement.click();
		}
	}

	async VerifyPageTitle(title) {
		let pagetTitleElements = await this.driver
			.$$(`.gh-content-entry-title`)
			.filter(async (element) => {
				let text = await element.getText();
				return text === title;
			});
		expect(pagetTitleElements.length).to.equal(1);
	}

	async VerifyPageTitleStatus(title, status) {
		let pageElements = await this.driver.$$(`.ember-view.permalink.gh-list-data.gh-post-list-title`);
		const arrayAux = [];
		for (const element of pageElements) {
			let pageTitle = await element.$('.gh-content-entry-title').getText();
			let pageStatus = await element.$('.gh-content-entry-status').getText();
			if (pageTitle === title && pageStatus === status) {
				arrayAux.push(element);
			}
		}
		expect(arrayAux.length).to.equal(1);
	}

	async VerifyNumberPageWithStatus(numberElements, status) {
		let pageElements = await this.driver.$$(`.ember-view.permalink.gh-list-data.gh-post-list-title`);
		const arrayAux = [];
		for (const element of pageElements) {
			let pageStatus = await element.$('.gh-content-entry-status').getText();
			if (pageStatus === status) {
				arrayAux.push(element);
			}
		}
		expect(arrayAux.length).to.equal(numberElements);
	}
};

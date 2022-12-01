'use strict';

const properties = require('../../../../properties.json');
const {expect} = require('chai');

module.exports = class PostPage {
	constructor(driver) {
		this.driver = driver;
	}

	async NavigateToPosts() {
		await this.driver.url(`${properties.GHOST_BASE_URL}/ghost/#/posts`);
	}

	async ClickCreatePostButton() {
		let createPostElement = await this.driver.$('a[href="#/editor/post/"]');
		await createPostElement.click();
	}

	async ClickPublishButton() {
		let publishElement = await this.driver.$('.gh-publish-trigger');
		await publishElement.click();
	}

	async ClickPublishContinueButton() {
		let publishContinueElement = await this.driver.$('.gh-publish-cta > button');
		await publishContinueElement.click();
	}

	async ClickPublishNowButton() {
		let publishNowElement = await this.driver.$('.gh-btn.gh-btn-large.gh-btn-pulse.ember-view');
		await publishNowElement.click();
	}

	async ClickSettingsMenu() {
		let settingsMenuElement = await this.driver.$('.settings-menu-toggle');
		await settingsMenuElement.click();
	}

	async ClickPostAccessComboBox() {
		let postAccessComboBoxElement = await this.driver.$('.gh-select');
		await postAccessComboBoxElement.click();
	}

	async FillInSelectTag(content) {
		let selectTagElement = await this.driver.$('#tag-input');
		await selectTagElement.click();
		await selectTagElement.setValue(content);
	}
	
	async ClickInSelectTag() {
		let selectTagElement = await this.driver.$('.ember-power-select-options > .ember-power-select-option:first-of-type');
		await selectTagElement.click();
	}

	async FillInTitle(title) {
		let titleElement = await this.driver.$('.gh-editor-title.ember-text-area');
		await titleElement.setValue(title);
	}

	async FillInContent(content) {
		let titleElement = await this.driver.$('.koenig-editor__editor.__mobiledoc-editor');
		await titleElement.setValue(content);
	}

	async SchedulePostForLater(date, time) {
		let publishDateElement = await this.driver.$('.gh-publish-setting.last');
		await publishDateElement.click();
		await new Promise(r => setTimeout(r, 1000));

		// click radio button with label "Schedule for later"
		let scheduleForLaterElement = await this.driver.$('label=Schedule for later');
		await scheduleForLaterElement.click();
		await new Promise(r => setTimeout(r, 1000));

		let datePickerInput = await this.driver.$('.gh-date-time-picker-date > input');
		await datePickerInput.setValue(date);
		await new Promise(r => setTimeout(r, 1000));

		let timePickerInput = await this.driver.$('.gh-date-time-picker-time > input');
		await timePickerInput.setValue(time);
		await new Promise(r => setTimeout(r, 1000));
	}

	async SelectPostAccessOption(option) {
		let postAccessOptionElement = await this.driver.$(`option[value="${option}"]`);
		await postAccessOptionElement.click();
	}

	async ChangePublishDateAndTime(date, time) {
		let datePickerInput = await this.driver.$('.gh-date-time-picker-date > input');
		await datePickerInput.setValue(date);
		await new Promise(r => setTimeout(r, 1000));

		let timePickerInput = await this.driver.$('.gh-date-time-picker-time > input');
		await timePickerInput.click();
		await timePickerInput.clearValue();
		await timePickerInput.setValue(time);
		await new Promise(r => setTimeout(r, 1000));
	}

	async FilterPostsByPublishedDate(criteria) {
		let publishedDateFilterElement = await this.driver.$('.gh-contentfilter-menu.gh-contentfilter-sort');
		await publishedDateFilterElement.click();

		let publishedDateFilterOptionElements = await this.driver.$$(`.ember-power-select-option`).filter(async (element) => {
			let text = await element.getText();
			return text === criteria;
		});

		await publishedDateFilterOptionElements[0].click();
	}

	async FilterPostsByAccess(option) {
		let postAccessFilterElement = await this.driver.$('.gh-contentfilter-menu.gh-contentfilter-visibility');
		await postAccessFilterElement.click();

		let postAccessFilterOptionElement = await this.driver.$$(`.ember-power-select-option`).filter(async (element) => {
			let text = await element.getText();
			return text === option;
		});

		await postAccessFilterOptionElement[0].click();
	}

	async FilterPostsByStatus(status) {
		let postStatusFilterElement = await this.driver.$('.gh-contentfilter-menu.gh-contentfilter-type');
		await postStatusFilterElement.click();

		let postStatusFilterOptionElement = await this.driver.$$(`.ember-power-select-option`).filter(async (element) => {
			let text = await element.getText();
			return text === `${status} posts`;
		});

		await postStatusFilterOptionElement[0].click();
	}

	async VerifyPostTitleAccess(title, accessOption) {
		let postElement = await this.driver.$$(`.ember-view.permalink.gh-list-data.gh-post-list-title`);
		for (const element of postElement) {
			let postTitle = await element.$('.gh-content-entry-title').getText();
			let postAccess = await element.$('.gh-content-entry-access').getText();
			if (postTitle === title && postAccess === accessOption) {
				return;
			}
		}

		throw new Error(`Post with title ${title} and access ${accessOption} not found`);
	}

	async VerifyPostTitleScheduledDate(title, date, time) {
		let postElement = await this.driver.$$(`.ember-view.permalink.gh-list-data.gh-post-list-title`);
		for (const element of postElement) {
			let postTitle = await element.$('.gh-content-entry-title').getText();

			let postStatusElement = await element.$('.gh-content-entry-status');

			await postStatusElement.moveTo();
			await new Promise(r => setTimeout(r, 1000));
			let postScheduledDate = await element.$('.schedule-details').getText();

			let postScheduledDateFormatted = postScheduledDate.split('on ')[1].split(' to')[0].split(' ').join('-') + ' ' + postScheduledDate.split('at ')[1].split(' (')[0];
			let auxDate = new Date(postScheduledDateFormatted + ' UTC');
			postScheduledDateFormatted = auxDate.toISOString().slice(0, 16).replace('T', ' ');

			if (postTitle === title && postScheduledDateFormatted === `${date} ${time}`) {
				return;
			}
		}

		throw new Error(`Post with title ${title} and date ${date} ${time} not found`);
	}

	async VerifyPostTitle(title) {
		let postTitleElements = await this.driver.$$(`.gh-content-entry-title`);
		let array = [];

		for (const element of postTitleElements) {
			let postTitle = await element.getText();
			if (postTitle === title) {
				array.push(element);
			}
		}
		expect(array.length).to.equal(1);
	}

	async VerifyPostTitleNotPresent(title) {
		let postTitleElements = await this.driver.$$(`.gh-content-entry-title`);
		let array = [];

		for (const element of postTitleElements) {
			let postTitle = await element.getText();
			if (postTitle === title) {
				array.push(element);
			}
		}
		expect(array.length).to.equal(0);
	}

	async VerifyPostTitleStatus(title, status) {
		let postElements = await this.driver.$$(`.ember-view.permalink.gh-list-data.gh-post-list-title`);
		let array = [];

		for (const element of postElements) {
			let postTitle = await element.$('.gh-content-entry-title').getText();
			let postStatus = await element.$('.gh-content-entry-status').getText();
			if (postTitle === title && postStatus === status) {
				array.push(element);
			}
		}

		expect(array.length).to.equal(1);
	}

	async VerifyPostPosition(title, position) {
		let postElements = await this.driver.$$(`.ember-view.permalink.gh-list-data.gh-post-list-title`);

		expect(postElements.length).to.be.greaterThanOrEqual(position);
		expect(postElements[position - 1]).to.not.be.undefined;

		let postElement = postElements[position - 1];
		let postTitle = await postElement.$('.gh-content-entry-title').getText();
		expect(postTitle).to.equal(title);
	}

	async VerifyPostInBlog(title) {

		// Go to blog
		await this.driver.url(properties.GHOST_BASE_URL);
		await new Promise(r => setTimeout(r, 1000));

		// Verify post is in blog
		const auxArray = [];

		let postElements = await this.driver.$$(`.post-card-title`);
		for (const element of postElements) {
			let postTitle = await element.getText();
			postTitle = postTitle.trimEnd().trimStart();
			if (postTitle === title) {
				auxArray.push(element);
			}
		}

		expect(auxArray.length).to.equal(1);

		// Open post
		await auxArray[0].click();
		await new Promise(r => setTimeout(r, 1000));

		expect(await this.driver.getTitle()).to.equal(title);
	}

	async VerifyPostNotInBlog(title) {

		// Go to blog
		await this.driver.url(properties.GHOST_BASE_URL);
		await new Promise(r => setTimeout(r, 1000));

		// Verify post is not in blog
		let postTitleElements = await this.driver.$$('.post-card').filter(async (element) => {
			let text = await element.getText();
			return text === title;
		});

		expect(postTitleElements.length).to.equal(0);
	}

	async VerifyPostAccessOnlyFor(accessOption) {
		let postAcessBanner = await this.driver.$('.gh-post-upgrade-cta-content > h2');
		let postAcessBannerText = await postAcessBanner.getText();

		expect(postAcessBannerText).to.equal(`This post is for ${accessOption} only`);
	}
};
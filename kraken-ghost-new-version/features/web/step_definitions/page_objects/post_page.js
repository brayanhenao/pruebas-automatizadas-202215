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

		if (!await publishElement.isExisting()) {
			publishElement = await this.driver.$('.gh-publishmenu.ember-view');
		}

		await publishElement.click();
	}

	async ClickPublishNowButton() {
		let publishNowElement = await this.driver.$('.gh-publish-cta');

		if (!await publishNowElement.isExisting()) {
			publishNowElement = await this.driver.$('.gh-btn-blue.gh-publishmenu-button.gh-btn-icon');
			await publishNowElement.click();
		} else {
			await publishNowElement.click();
			let confirmPublishNowElement = await this.driver.$('.gh-btn.gh-btn-large,gh-btn-pulse.ember-view');
			await confirmPublishNowElement.click();
		}
	}

	async ClickPostSettingsMenu() {
		let settingsMenuElement = await this.driver.$('.settings-menu-toggle');
		if (!await settingsMenuElement.isExisting()) {
			settingsMenuElement = await this.driver.$('.post-settings');
		}
		await settingsMenuElement.click();
	}

	async ClickPostAccessComboBox() {
		let postAccessComboBoxElement = await this.driver.$('.gh-select');
		await postAccessComboBoxElement.click();
	}

	async ClickInSelectTag() {
		let selectedTagElement = await this.driver.$('#tag-input');
		await selectedTagElement.click();

		let tagElement = await this.driver.$('.ember-power-select-options > .ember-power-select-option:first-of-type');
		await tagElement.click();

		await new Promise(r => setTimeout(r, 2000));

		let closeSettingsMenuElement = await this.driver.$('.close.settings-menu-header-action');
		if (await closeSettingsMenuElement.isExisting()) {
			await closeSettingsMenuElement.click();
		}
	}

	async FillInTitle(title) {
		let titleElement = await this.driver.$('.gh-editor-title.ember-text-area');
		await titleElement.click();
		await titleElement.setValue(title);
	}

	async FillInContent(content) {
		let titleElement = await this.driver.$('.koenig-editor__editor.__mobiledoc-editor');
		await titleElement.click();
		await titleElement.setValue(content);
	}

	async SchedulePostForLater(date, time) {
		let publishDateElement = await this.driver.$('.gh-publish-setting.last');
		if (!await publishDateElement.isExisting()) {
			let finalElement;
			let radioElements = await this.driver.$$('.gh-publishmenu-radio-label');
			for (const element of radioElements) {
				let text = await element.getText();
				console.log(text);
				if (text.trimEnd().trimStart() === 'Schedule it for later') {
					finalElement = element;
					break;
				}
			}
			await finalElement.click();
			await new Promise(r => setTimeout(r, 1000));
		} else {
			await publishDateElement.click();
			await new Promise(r => setTimeout(r, 1000));

			// click radio button with label "Schedule for later"
			let scheduleForLaterElement = await this.driver.$('label=Schedule for later');
			await scheduleForLaterElement.click();
			await new Promise(r => setTimeout(r, 1000));
		}

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
		await datePickerInput.click();
		await datePickerInput.clearValue();
		await datePickerInput.setValue(date);
		await new Promise(r => setTimeout(r, 1000));

		let timePickerInput = await this.driver.$('.gh-date-time-picker-time > input');
		await timePickerInput.click();
		await timePickerInput.clearValue();
		await timePickerInput.setValue(time);

		let closeSettingsMenuElement = await this.driver.$('.close.settings-menu-header-action');
		if (await closeSettingsMenuElement.isExisting()) {
			await closeSettingsMenuElement.click();
		}

		await new Promise(r => setTimeout(r, 2000));
	}

	async FilterPostsByPublishedDate(criteria) {
		let publishedDateFilterElement = await this.driver.$('.gh-contentfilter-menu.gh-contentfilter-sort');
		await publishedDateFilterElement.click();

		let publishedDateFilterOptionElements = await this.driver.$$(`.ember-power-select-option`).filter(async (element) => {
			let text = await element.getText();
			return criteria.toLowerCase().includes(text.toLowerCase());
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
		let results = [];

		let postElements = await this.driver.$$('.gh-list-row.gh-posts-list-item');
		for (const element of postElements) {
			let postTitle = await element.$('.gh-content-entry-title').getText();

			let postStatusElement = await element.$('.gh-content-entry-status');
			if (!await postStatusElement.isExisting()) {
				postStatusElement = await element.$('.gh-post-list-status');
			}

			await postStatusElement.moveTo();
			await new Promise(r => setTimeout(r, 1000));

			let postScheduledDate;

			let postScheduledDateElement = await element.$('.schedule-details');
			if (!await postScheduledDateElement.isExisting()) {
				postScheduledDateElement = await element.$('.gh-post-list-status > div > span');
				postScheduledDate = await postScheduledDateElement.getAttribute('data-tooltip');
			} else {
				postScheduledDate = await postScheduledDateElement.getText();
			}

			// Get the time
			let timeRegex = /(\d{2}:\d{2}) \(UTC\)/g;
			let timeMatch = timeRegex.exec(postScheduledDate);
			let postScheduledDateTime = timeMatch[1];

			// Get the date
			let dateRegex = /on (\d{2} \w+ \d{4})/g;
			let dateMatch = dateRegex.exec(postScheduledDate);
			let postScheduledDateDate = dateMatch[1];
			let auxDate = new Date(postScheduledDateDate + ' UTC');
			postScheduledDateDate = auxDate.toISOString().slice(0, 10);

			console.log(postTitle, title);
			console.log(postScheduledDateDate, date);
			console.log(postScheduledDateTime, time);
			if (postTitle === title && postScheduledDateDate === date && postScheduledDateTime === time) {
				results.push(element);
			}
		}

		expect(results.length).to.be.equal(1);
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
		let postElements = await this.driver.$$(`.gh-list-row.gh-posts-list-item`);
		let array = [];

		for (const element of postElements) {
			let postTitle = await element.$('.gh-content-entry-title').getText();
			let postStatusElement = await element.$('.gh-content-entry-status');
			if (!await postStatusElement.isExisting()) {
				postStatusElement = await element.$('.gh-post-list-status');
			}

			let postStatus = await postStatusElement.getText();
			if (postTitle === title && postStatus.toLowerCase() === status.toLowerCase()) {
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
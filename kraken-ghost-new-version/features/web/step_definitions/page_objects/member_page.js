'use strict';

const properties = require('../../../../properties.json');
const {expect} = require('chai');

module.exports = class MemberPage {
	constructor(driver) {
		this.driver = driver;
	}

	async NavigateToMembers() {
		await this.driver.url(`${properties.GHOST_BASE_URL}/ghost/#/members`);
	}

	async ClickCreateNewMemberButton() {
		let createMemberElement = await this.driver.$('a[href="#/members/new/"]');
		await createMemberElement.click();
	}

	async FillInName(name) {
		let nameElement = await this.driver.$('input[name="name"]');
		console.log(nameElement);
		await nameElement.setValue(name);
	}

	async FillInEmail(email) {
		let emailElement = await this.driver.$('input[name="email"]');
		await emailElement.setValue(email);
	}

	async FillInNote(note) {
		let noteElement = await this.driver.$('textarea[name="note"]');
		await noteElement.setValue(note);
	}

	async SetMemberAsUnsubscribed(){
		let unsubscribedElement = await this.driver.$('.gh-main-section-content .gh-members-subscribed-checkbox .input-toggle-component');
		await unsubscribedElement.click();
	}

	async ClickSaveButton() {
		let saveElement = await this.driver.$('.gh-btn.gh-btn-primary.gh-btn-icon.ember-view');
		await saveElement.click();
	}

	async ClickFilter(){
		let filterElement = await this.driver.$('main section[class="view-actions"] .ember-basic-dropdown-trigger');
		await filterElement.click();
		let selectElement = await this.driver.$('.gh-member-actions-menu .gh-select select[class="ember-view"]');
		await selectElement.click();
	}

	async ClickAddFilter(){
		let addFilterButtonElement = await this.driver.$('.gh-add-filter');
		await addFilterButtonElement.click();
	}

	async FilterMemberBySubscriptionCriteria(filter) {
		let subscribedOptionElement = await this.driver.$('.gh-member-actions-menu .gh-select select[class="ember-view"] option[value="subscribed"]');
		await subscribedOptionElement.click();
		if (filter === 'unsubscribed') {
			let unsubscribedOptionElement = await this.driver.$('.gh-member-actions-menu .gh-select select[class="ember-view"] option[value="false"]');
			await unsubscribedOptionElement.click();
		}
		let applyFilterElement = await this.driver.$('.gh-btn.gh-btn-primary');
		await applyFilterElement.click();
	}

	async FilterMemberByName(query) {
		let containOptionElement = await this.driver.$('.gh-filter-block .form-group .gh-filter-inputgroup .gh-select select[class="ember-view"] option[value="contains"]');
		await containOptionElement.click();
		let inputElement = await this.driver.$('input[aria-label="Name filter"]');
		await inputElement.setValue(query);
		let applyFilterElement = await this.driver.$('.gh-btn.gh-btn-primary');
		await applyFilterElement.click();
	}

	async FilterMemberByEmail(query, position) {
		let emailOptionElement = await this.driver.$$('.gh-member-actions-menu .gh-select select[class="ember-view"] option[value="email"]');
		await emailOptionElement[position - 1].click();
		let containOptionElement = await this.driver.$$('.gh-filter-block .form-group .gh-filter-inputgroup .gh-select select[class="ember-view"] option[value="contains"]');
		await containOptionElement[position - 1].click();
		let inputElement = await this.driver.$('input[aria-label="Email filter"]');
		await inputElement.setValue(query);
		let applyFilterElement = await this.driver.$('.gh-btn.gh-btn-primary');
		await applyFilterElement.click();
	}

	async VerifyEmail(email) {
		let memberElement = await this.driver.$$(`.ember-view.gh-list-data`);
		for (const element of memberElement) {
			let memberEmail = await element.$('.ma0.pa0.middarkgrey.f8.gh-members-list-email').getText();
			if (memberEmail === email) {
				return;
			}
		}

		throw new Error(`Member with email ${email} not found`);
	}

	async VerifyName(name) {
		let memberElement = await this.driver.$$(`.ember-view.gh-list-data`);
		for (const element of memberElement) {
			let memberName = await element.$('.ma0.pa0.gh-members-list-name').getText();
			if (memberName === name) {
				return;
			}
		}
		throw new Error(`Member with name ${name} not found`);
	}

};
import {adminPage, tagsPage, tagsEditPage} from '../../pages';

import {faker} from '@faker-js/faker';
import {generateManyInvalidTags, generateManyValidTags} from '../../helpers/mock';

faker.seed(666); //set seed to keep data consistent

describe('list_tags', () => {
	let tagName,
		tagName2,
		tagName3 = '';

	before(() => {
		cy.clearData();

		adminPage.load().screenshot();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000).screenshot();
		});

		adminPage.logout();
	});

	beforeEach(() => {
		adminPage.load().screenshot();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000).screenshot();
		});
	});

	// ESC3 - F3
	it('should list all created tags with valid data (a-priori)', () => {
		cy.fixture('data-pool').then(({tags}) => {
			let tagsNames = [];
			for (let i = 0; i < 3; i++) {
				tagsPage.load().screenshot();
				cy.wait(1000);
				tagName = tags.valid[i].name;
				tagsPage.newTagButton().click();
				cy.screenshot();
				tagsEditPage.nameInput().type(tagName).screenshot();
				tagsEditPage
					.colorInput()
					.type(tags.valid[i].color)
					.screenshot();
				tagsEditPage.descriptionInput().type(tags.valid[i].description).screenshot();
				tagsEditPage.saveButton().click();
				tagsNames.push(tagName);
				cy.wait(1000).screenshot();
			}

			tagsPage.load().screenshot();
			for (let tag of tagsNames) {
				tagsPage.tagListContainer().contains(tag).should('be.visible');
				cy.screenshot();
			}
		});
	});

	it('should list all created tags with invalid data - invalid types (a-priori)', () => {
		cy.fixture('data-pool').then(({tags}) => {
			let tagsNames = [];
			for (let i = 0; i < 3; i++) {
				tagsPage.load().screenshot();
				cy.wait(1000);
				tagName = tags.invalid.tagsWithInvalidTypesPerField[i].name;
				tagsPage.newTagButton().click();
				cy.screenshot();
				tagsEditPage.nameInput().type(tagName, {parseSpecialCharSequences: false}).screenshot();
				tagsEditPage
					.colorInput()
					.type(tags.invalid.tagsWithInvalidTypesPerField[i].color, {parseSpecialCharSequences: false})
					.screenshot();
				tagsEditPage.descriptionInput().type(tags.invalid.tagsWithInvalidTypesPerField[i].description, {parseSpecialCharSequences: false}).screenshot();
				tagsEditPage.saveButton().click();
				tagsNames.push(tagName);
				cy.wait(1000).screenshot();
			}

			tagsPage.load().screenshot();
			for (let tag of tagsNames) {
				tagsPage.tagListContainer().contains(tag).should('be.visible');
				cy.screenshot();
			}
		});
	});

	it('should list all created tags with valid data (pseudo-aleatorio)', () => {
		let tagsNames = [];
		let tags = generateManyValidTags();
		for (let i = 0; i < 3; i++) {
			tagsPage.load().screenshot();
			cy.wait(1000);
			tagName = tags[i].name;
			tagsPage.newTagButton().click();
			cy.screenshot();
			tagsEditPage.nameInput().type(tagName, {parseSpecialCharSequences: false}).screenshot();
			tagsEditPage
				.colorInput()
				.type(tags[i].color, {parseSpecialCharSequences: false})
				.screenshot();
			tagsEditPage.descriptionInput().type(tags[i].description, {parseSpecialCharSequences: false}).screenshot();
			tagsEditPage.saveButton().click();
			tagsNames.push(tagName);
			cy.wait(1000).screenshot();
		}
		tagsPage.load().screenshot();
		for (let tag of tagsNames) {
			tagsPage.tagListContainer().contains(tag).should('be.visible');
			cy.screenshot();
		}
	});

	it('should list all created tags with invalid data - missing keys (pseudo-aleatorio)', () => {
		let tagsNames = [];
		let tags = generateManyInvalidTags().tagsWithMissingKeys;
		for (let i = 0; i < 3; i++) {
			tagsPage.load().screenshot();
			cy.wait(1000);
			tagName = tags[i].name !== undefined ? tags[i].name?.toString() : ' ';
			tagsPage.newTagButton().click();
			cy.screenshot();
			tagsEditPage.nameInput().type(tagName, {parseSpecialCharSequences: false}).screenshot();
			tagsEditPage
				.colorInput()
				.type(tags[i].color?.toString(), {parseSpecialCharSequences: false})
				.screenshot();
			tagsEditPage.descriptionInput().type(tags[i].description?.toString(), {parseSpecialCharSequences: false}).screenshot();
			tagsEditPage.saveButton().click();
			tagsNames.push(tagName);
			cy.wait(1000).screenshot();
		}
		tagsPage.load().screenshot();
		for (let tag of tagsNames) {
			tagsPage.tagListContainer().contains(tag).should('be.visible');
			cy.screenshot();
		}
	});

	it('should list all created tags with invalid data - border case (pseudo-aleatorio)', () => {
		let tagsNames = [];
		let tags = generateManyInvalidTags().tagsWithBorderCases;
		for (let i = 0; i < 3; i++) {
			tagsPage.load().screenshot();
			cy.wait(1000);
			tagName = tags[i].name !== undefined ? tags[i].name?.toString() : ' ';
			tagsPage.newTagButton().click();
			cy.screenshot();
			tagsEditPage.nameInput().type(tagName, {parseSpecialCharSequences: false}).screenshot();
			tagsEditPage
				.colorInput()
				.type(tags[i].color?.toString(), {parseSpecialCharSequences: false})
				.screenshot();
			tagsEditPage.descriptionInput().type(tags[i].description?.toString(), {parseSpecialCharSequences: false}).screenshot();
			tagsEditPage.saveButton().click();
			tagsNames.push(tagName);
			cy.wait(1000).screenshot();
		}
		tagsPage.load().screenshot();
		for (let tag of tagsNames) {
			tagsPage.tagListContainer().contains(tag).should('be.visible');
			cy.screenshot();
		}
	});

	it('should list all created tags with valid data (aleatorio)', () => {
		tagsPage.load().screenshot();
		cy.wait(1000);
		tagName = faker.lorem.word();
		tagsPage.newTagButton().click();
		cy.screenshot();
		tagsEditPage.nameInput().type(tagName).screenshot();
		tagsEditPage
			.colorInput()
			.type(faker.color.rgb({prefix: ''}))
			.screenshot();
		tagsEditPage.descriptionInput().type(faker.lorem.sentence()).screenshot();
		tagsEditPage.saveButton().click();
		cy.wait(1000).screenshot();

		tagsPage.load().screenshot();
		cy.wait(1000);
		tagName2 = faker.lorem.word();
		tagsPage.newTagButton().click();
		cy.screenshot();
		tagsEditPage.nameInput().type(tagName2).screenshot();
		tagsEditPage
			.colorInput()
			.type(faker.color.rgb({prefix: ''}))
			.screenshot();
		tagsEditPage.descriptionInput().type(faker.lorem.sentence()).screenshot();
		tagsEditPage.saveButton().click();
		cy.wait(1000).screenshot();

		tagsPage.load().screenshot();
		cy.wait(1000);
		tagName3 = faker.lorem.word();
		tagsPage.newTagButton().click();
		cy.screenshot();
		tagsEditPage.nameInput().type(tagName3).screenshot();
		tagsEditPage
			.colorInput()
			.type(faker.color.rgb({prefix: ''}))
			.screenshot();
		tagsEditPage.descriptionInput().type(faker.lorem.sentence()).screenshot();
		tagsEditPage.saveButton().click();
		cy.wait(1000).screenshot();


		tagsPage.load().screenshot();
		tagsPage.tagListContainer().contains(tagName).should('be.visible');
		tagsPage.tagListContainer().contains(tagName2).should('be.visible');
		tagsPage.tagListContainer().contains(tagName3).should('be.visible');
		cy.screenshot();
	});
});

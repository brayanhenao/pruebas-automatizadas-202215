import {
	adminPage,
	tagsPage,
	tagsEditPage,
	postsEditPage,
	postsPage,
} from '../../pages';

import {faker} from '@faker-js/faker';
import {generateManyInvalidTags, generateManyValidTags} from '../../helpers/mock';

describe('create_tag', () => {
	before(cy.clearData);

	beforeEach(() => {
		adminPage.load().screenshot();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000).screenshot();
		});
	});

	// ESC1 - F3
	it('should create a public tag with valid data (a-priori)', () => {
		cy.fixture('data-pool').then(({tags}) => {
			const randomTag = Math.floor(Math.random() * (tags.valid.length));
			const tagName = tags.valid[randomTag].name;
			const tagColor = tags.valid[randomTag].color;
			const tagDescription = tags.valid[randomTag].description;
			tagsPage.load().screenshot();
			tagsPage.newTagButton().click();
			cy.wait(1000).screenshot();
			tagsEditPage.nameInput().type(tagName).screenshot();
			tagsEditPage
				.colorInput()
				.type(tagColor)
				.screenshot();
			tagsEditPage.descriptionInput().type(tagDescription).screenshot();
			tagsEditPage.saveButton().click();
			cy.wait(1000).screenshot();

			tagsPage.load().screenshot();
			tagsPage.tagListContainer().contains(tagName).should('be.visible');
			cy.screenshot();
		});
	});

	it('should create a public tag with invalid data - invalid types (a-priori)', () => {
		cy.fixture('data-pool').then(({tags}) => {
			const randomTag = Math.floor(Math.random() * (tags.invalid.tagsWithInvalidTypesPerField.length));
			const tagName = tags.invalid.tagsWithInvalidTypesPerField[randomTag].name?.toString();
			const tagColor = tags.invalid.tagsWithInvalidTypesPerField[randomTag].color?.toString();
			const tagDescription = tags.invalid.tagsWithInvalidTypesPerField[randomTag].description?.toString();
			tagsPage.load().screenshot();
			tagsPage.newTagButton().click();
			cy.wait(1000).screenshot();
			tagsEditPage.nameInput().type(tagName, {parseSpecialCharSequences: false}).screenshot();
			tagsEditPage
				.colorInput()
				.type(tagColor, {parseSpecialCharSequences: false})
				.screenshot();
			tagsEditPage.descriptionInput().type(tagDescription, {parseSpecialCharSequences: false}).screenshot();
			tagsEditPage.saveButton().click();
			cy.wait(1000).screenshot();

			tagsPage.load().screenshot();
			tagsPage.tagListContainer().contains(tagName).should('be.visible');
			cy.screenshot();
		});
	});

	it('should create a public tag with valid data (pseudo-aleatorio)', () => {
		cy.wait(1000).screenshot();
		const randomTags = generateManyValidTags();
		const randomTag = Math.floor(Math.random() * (randomTags.length));
		const tagName = randomTags[randomTag].name;
		const tagDescription = randomTags[randomTag].description;
		const tagColor = randomTags[randomTag].color;
		tagsPage.load().screenshot();
		tagsPage.newTagButton().click();
		cy.wait(1000).screenshot();
		tagsEditPage.nameInput().type(tagName).screenshot();
		tagsEditPage
			.colorInput()
			.type(tagColor)
			.screenshot();
		tagsEditPage.descriptionInput().type(tagDescription).screenshot();
		tagsEditPage.saveButton().click();
		cy.wait(1000).screenshot();

		tagsPage.load().screenshot();
		tagsPage.tagListContainer().contains(tagName).should('be.visible');
		cy.screenshot();
	});

	it('should create a public tag with invalid data - border cases (pseudo-aleatorio)', () => {
		cy.wait(1000).screenshot();
		const randomTags = generateManyInvalidTags().tagsWithBorderCases;
		const randomTag = Math.floor(Math.random() * (randomTags.length));
		const tagName = randomTags[randomTag].name?.toString();
		const tagDescription = randomTags[randomTag].description?.toString();
		const tagColor = randomTags[randomTag].color?.toString();
		tagsPage.load().screenshot();
		tagsPage.newTagButton().click();
		cy.wait(1000).screenshot();
		tagsEditPage.nameInput().type(tagName, {parseSpecialCharSequences: false}).screenshot();
		tagsEditPage
			.colorInput()
			.type(tagColor, {parseSpecialCharSequences: false})
			.screenshot();
		tagsEditPage.descriptionInput().type(tagDescription, {parseSpecialCharSequences: false}).screenshot();
		tagsEditPage.saveButton().click();
		cy.wait(1000).screenshot();

		tagsPage.load().screenshot();
		tagsPage.tagListContainer().contains(tagName).should('be.visible');
		cy.screenshot();
	});

	it('should create a public tag with invalid data - missing keys (pseudo-aleatorio)', () => {
		cy.wait(1000).screenshot();
		const randomTags = generateManyInvalidTags().tagsWithMissingKeys;
		const randomTag = Math.floor(Math.random() * (randomTags.length));
		const tagName = randomTags[randomTag].name?.toString();
		const tagDescription = randomTags[randomTag].description?.toString();
		const tagColor = randomTags[randomTag].color?.toString();
		tagsPage.load().screenshot();
		tagsPage.newTagButton().click();
		cy.wait(1000).screenshot();
		tagsEditPage.nameInput().type(tagName, {parseSpecialCharSequences: false}).screenshot();
		tagsEditPage
			.colorInput()
			.type(tagColor, {parseSpecialCharSequences: false})
			.screenshot();
		tagsEditPage.descriptionInput().type(tagDescription, {parseSpecialCharSequences: false}).screenshot();
		tagsEditPage.saveButton().click();
		cy.wait(1000).screenshot();

		tagsPage.load().screenshot();
		tagsPage.tagListContainer().contains(tagName).should('be.visible');
		cy.screenshot();
	});

	it('should create a public tag with valid data (aleatorio)', () => {
		const tagName = faker.lorem.word();
		tagsPage.load().screenshot();
		tagsPage.newTagButton().click();
		cy.wait(1000).screenshot();
		tagsEditPage.nameInput().type(tagName).screenshot();
		tagsEditPage
			.colorInput()
			.type(faker.color.rgb({prefix: ''}))
			.screenshot();
		tagsEditPage.descriptionInput().type(faker.lorem.sentence()).screenshot();
		tagsEditPage.saveButton().click();
		cy.wait(1000).screenshot();

		tagsPage.load().screenshot();
		tagsPage.tagListContainer().contains(tagName).should('be.visible');
		cy.screenshot();
	});

	// ESC2 - F3
	it('should count total posts with valid tags data (a-priori)', () => {
		cy.fixture('data-pool').then(({tags}) => {
			const randomTag = Math.floor(Math.random() * (tags.valid.length));
			const tagName = tags.valid[randomTag].name;
			const tagColor = tags.valid[randomTag].color;
			const tagDescription = tags.valid[randomTag].description;
			const totalPosts = faker.datatype.number(5);

			tagsPage.load().screenshot();
			cy.wait(500);
			tagsPage.newTagButton().click();
			cy.wait(1000).screenshot();
			tagsEditPage.nameInput().type(tagName).screenshot();
			tagsEditPage
				.colorInput()
				.type(tagColor)
				.screenshot();
			tagsEditPage.descriptionInput().type(tagDescription).screenshot();
			tagsEditPage.saveButton().click();
			cy.wait(1000).screenshot();

			for (let i = 0; i < totalPosts; i++) {
				postsPage.load().screenshot();
				cy.wait(500);
				postsPage.newPostsButton().click();

				cy.wait(1000).screenshot();

				postsEditPage.settingsButton().click();
				postsEditPage.tagInput().type(`${tagName}{enter}`).screenshot();
				cy.wait(500);
				postsEditPage.settingsButton().click();

				postsEditPage.createPost(
					faker.lorem.word(),
					faker.lorem.paragraph(),
					true,
				);
				cy.wait(1000);
			}

			tagsPage.load().screenshot();
			cy.wait(1000);
			tagsPage
				.tagListContainer()
				.children()
				.contains(`${totalPosts > 1 ? totalPosts + ' post' : totalPosts + ' posts'}`)
				.should('be.visible');
			cy.screenshot();
		});
	});

	it('should count total posts with invalid tags data - invalid types (a-priori)', () => {
		cy.fixture('data-pool').then(({tags}) => {
			const randomTag = Math.floor(Math.random() * (tags.invalid.tagsWithInvalidTypesPerField.length));
			const tagName = tags.invalid.tagsWithInvalidTypesPerField[randomTag].name?.toString();
			const tagColor = tags.invalid.tagsWithInvalidTypesPerField[randomTag].color?.toString();
			const tagDescription = tags.invalid.tagsWithInvalidTypesPerField[randomTag].description?.toString();

			const totalPosts = faker.datatype.number(5);

			tagsPage.load().screenshot();
			cy.wait(500);
			tagsPage.newTagButton().click();
			cy.wait(1000).screenshot();
			tagsEditPage.nameInput().type(tagName).screenshot();
			tagsEditPage
				.colorInput()
				.type(tagColor)
				.screenshot();
			tagsEditPage.descriptionInput().type(tagDescription).screenshot();
			tagsEditPage.saveButton().click();
			cy.wait(1000).screenshot();

			for (let i = 0; i < totalPosts; i++) {
				postsPage.load().screenshot();
				cy.wait(500);
				postsPage.newPostsButton().click();

				cy.wait(1000).screenshot();

				postsEditPage.settingsButton().click();
				postsEditPage.tagInput().type(`${tagName}{enter}`).screenshot();
				cy.wait(500);
				postsEditPage.settingsButton().click();

				postsEditPage.createPost(
					faker.lorem.word(),
					faker.lorem.paragraph(),
					true,
				);
				cy.wait(1000);
			}

			tagsPage.load().screenshot();
			cy.wait(1000);
			tagsPage
				.tagListContainer()
				.children()
				.contains(`${totalPosts > 1 ? totalPosts + ' post' : totalPosts + ' posts'}`)
				.should('be.visible');
			cy.screenshot();
		});
	});

	it('should count total posts with valid tags data (pseudo-aleatorio)', () => {
		const validTags = generateManyValidTags();
		const randomTag = Math.floor(Math.random() * (validTags.length));
		const tagName = validTags[randomTag].name?.toString();
		const tagColor = validTags[randomTag].color?.toString();
		const tagDescription = validTags[randomTag].description?.toString();

		const totalPosts = faker.datatype.number(5);

		tagsPage.load().screenshot();
		cy.wait(500);
		tagsPage.newTagButton().click();
		cy.wait(1000).screenshot();
		tagsEditPage.nameInput().type(tagName, {parseSpecialCharSequences: false}).screenshot();
		tagsEditPage
			.colorInput()
			.type(tagColor, {parseSpecialCharSequences: false})
			.screenshot();
		tagsEditPage.descriptionInput().type(tagDescription, {parseSpecialCharSequences: false}).screenshot();
		tagsEditPage.saveButton().click();
		cy.wait(1000).screenshot();

		for (let i = 0; i < totalPosts; i++) {
			postsPage.load().screenshot();
			cy.wait(500);
			postsPage.newPostsButton().click();

			cy.wait(1000).screenshot();

			postsEditPage.settingsButton().click();
			postsEditPage.tagInput().type(`${tagName}{enter}`).screenshot();
			cy.wait(500);
			postsEditPage.settingsButton().click();

			postsEditPage.createPost(
				faker.lorem.word(),
				faker.lorem.paragraph(),
				true,
			);
			cy.wait(1000);
		}

		tagsPage.load().screenshot();
		cy.wait(1000);
		tagsPage
			.tagListContainer()
			.children()
			.contains(`${totalPosts > 1 ? totalPosts + ' post' : totalPosts + ' posts'}`)
			.should('be.visible');
		cy.screenshot();
	});

	it('should count total posts with invalid tags data - border cases (pseudo-aleatorio)', () => {
		const tags = generateManyInvalidTags().tagsWithBorderCases;
		const randomTag = Math.floor(Math.random() * (tags.length));
		const tagName = tags[randomTag].name?.toString();
		const tagColor = tags[randomTag].color?.toString();
		const tagDescription = tags[randomTag].description?.toString();

		const totalPosts = faker.datatype.number(5);

		tagsPage.load().screenshot();
		cy.wait(500);
		tagsPage.newTagButton().click();
		cy.wait(1000).screenshot();
		tagsEditPage.nameInput().type(tagName, {parseSpecialCharSequences: false}).screenshot();
		tagsEditPage
			.colorInput()
			.type(tagColor, {parseSpecialCharSequences: false})
			.screenshot();
		tagsEditPage.descriptionInput().type(tagDescription, {parseSpecialCharSequences: false}).screenshot();
		tagsEditPage.saveButton().click();
		cy.wait(1000).screenshot();

		for (let i = 0; i < totalPosts; i++) {
			postsPage.load().screenshot();
			cy.wait(500);
			postsPage.newPostsButton().click();

			cy.wait(1000).screenshot();

			postsEditPage.settingsButton().click();
			postsEditPage.tagInput().type(`${tagName}{enter}`).screenshot();
			cy.wait(500);
			postsEditPage.settingsButton().click();

			postsEditPage.createPost(
				faker.lorem.word(),
				faker.lorem.paragraph(),
				true,
			);
			cy.wait(1000);
		}

		tagsPage.load().screenshot();
		cy.wait(1000);
		tagsPage
			.tagListContainer()
			.children()
			.contains(`${totalPosts > 1 ? totalPosts + ' post' : totalPosts + ' posts'}`)
			.should('be.visible');
		cy.screenshot();
	});

	it('should count total posts with invalid tags data - missing keys (pseudo-aleatorio)', () => {
		const tags = generateManyInvalidTags().tagsWithMissingKeys;
		const randomTag = Math.floor(Math.random() * (tags.length));
		const tagName = tags[randomTag].name?.toString();
		const tagColor = tags[randomTag].color?.toString();
		const tagDescription = tags[randomTag].description?.toString();

		const totalPosts = faker.datatype.number(5);

		tagsPage.load().screenshot();
		cy.wait(500);
		tagsPage.newTagButton().click();
		cy.wait(1000).screenshot();
		tagsEditPage.nameInput().type(tagName, {parseSpecialCharSequences: false}).screenshot();
		tagsEditPage
			.colorInput()
			.type(tagColor, {parseSpecialCharSequences: false})
			.screenshot();
		tagsEditPage.descriptionInput().type(tagDescription, {parseSpecialCharSequences: false}).screenshot();
		tagsEditPage.saveButton().click();
		cy.wait(1000).screenshot();

		for (let i = 0; i < totalPosts; i++) {
			postsPage.load().screenshot();
			cy.wait(500);
			postsPage.newPostsButton().click();

			cy.wait(1000).screenshot();

			postsEditPage.settingsButton().click();
			postsEditPage.tagInput().type(`${tagName}{enter}`).screenshot();
			cy.wait(500);
			postsEditPage.settingsButton().click();

			postsEditPage.createPost(
				faker.lorem.word(),
				faker.lorem.paragraph(),
				true,
			);
			cy.wait(1000);
		}

		tagsPage.load().screenshot();
		cy.wait(1000);
		tagsPage
			.tagListContainer()
			.children()
			.contains(`${totalPosts > 1 ? totalPosts + ' post' : totalPosts + ' posts'}`)
			.should('be.visible');
		cy.screenshot();
	});

	it('should count total posts with valid tags data (aleatorio)', () => {
		const tagName = faker.lorem.word();
		const totalPosts = faker.datatype.number(5);

		tagsPage.load().screenshot();
		cy.wait(500);
		tagsPage.newTagButton().click();
		cy.wait(1000).screenshot();
		tagsEditPage.nameInput().type(tagName).screenshot();
		tagsEditPage
			.colorInput()
			.type(faker.color.rgb({prefix: ''}))
			.screenshot();
		tagsEditPage.descriptionInput().type(faker.lorem.sentence()).screenshot();
		tagsEditPage.saveButton().click();
		cy.wait(1000).screenshot();

		for (let i = 0; i < totalPosts; i++) {
			postsPage.load().screenshot();
			cy.wait(500);
			postsPage.newPostsButton().click();

			cy.wait(1000).screenshot();

			postsEditPage.settingsButton().click();
			postsEditPage.tagInput().type(`${tagName}{enter}`).screenshot();
			cy.wait(500);
			postsEditPage.settingsButton().click();

			postsEditPage.createPost(
				faker.lorem.word(),
				faker.lorem.paragraph(),
				true,
			);
			cy.wait(1000);
		}

		tagsPage.load().screenshot();
		cy.wait(1000);
		tagsPage
			.tagListContainer()
			.children()
			.contains(`${totalPosts > 1 ? totalPosts + ' post' : totalPosts + ' posts'}`)
			.should('be.visible');
		cy.screenshot();
	});
});

import {adminPage, pagesEditPage, pagesPage, pageDetailPage} from '../../pages';
import {generateInvalidPage, generateManyInvalidPages, generateValidPage} from '../../helpers/mock';

import {faker} from '@faker-js/faker';

describe('create_page', () => {
	before(cy.clearData);

	beforeEach(() => {
		adminPage.load().screenshot();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000).screenshot();
		});
	});

	// SC1
	it('should create a page and publish it with valid data (aleatorio)', () => {
		const title = faker.lorem.words();
		const content = faker.lorem.paragraph();
		pagesPage.load().screenshot();
		pagesPage.newPageButton().click();
		pagesEditPage.createPage(title, content, true);

		cy.wait(1000).screenshot();
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.pageListContainer().contains(title).should('be.visible');

		pageDetailPage.setSlug(faker.helpers.slugify(title));
		pageDetailPage.load().screenshot();
		cy.wait(1000);
		pageDetailPage.contentContainer().contains(title).should('be.visible');
		pageDetailPage.contentContainer().contains(content).should('be.visible');
		cy.screenshot();
	});

	it('should create a page and publish it with valid data (a-priori)', () => {
		cy.fixture('data-pool').then(({pages}) => {
			const randomPage = pages.valid[Math.floor(Math.random() * pages.valid.length)];

			const title = randomPage.title;
			const content = randomPage.content.content;
			pagesPage.load().screenshot();
			pagesPage.newPageButton().click();
			pagesEditPage.createPage(title, content, true);

			cy.wait(1000).screenshot();
			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.pageListContainer().contains(title).should('be.visible');

			pageDetailPage.setSlug(faker.helpers.slugify(title));
			pageDetailPage.load().screenshot();
			cy.wait(1000);
			pageDetailPage.contentContainer().then(
				$container => {
					cy.log($container.text());
				},
			);

			pageDetailPage.contentContainer().contains(title).should('be.visible');
			pageDetailPage.contentContainer().contains(content).should('be.visible');
			cy.screenshot();
		});
	});

	it('should create a page and publish it with invalid data (a-priori)', () => {
		cy.fixture('data-pool').then(({pages}) => {
			const randomPage = pages.invalid.pagesWithBorderCases[Math.floor(Math.random() * pages.invalid.pagesWithBorderCases.length)];

			const title = randomPage.title;
			const content = randomPage.content.content;
			pagesPage.load().screenshot();
			pagesPage.newPageButton().click();
			pagesEditPage.createPage(title, content, true);

			cy.wait(1000).screenshot();
			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.pageListContainer().contains(title).should('be.visible');

			pageDetailPage.setSlug(faker.helpers.slugify(title));
			pageDetailPage.load().screenshot();
			cy.wait(1000);
			pageDetailPage.contentContainer().contains(title).should('be.visible');
			pageDetailPage.contentContainer().contains(content).should('be.visible');
			cy.screenshot();
		});
	});

	it('should create a page and publish it with valid data (pseudo-aleatorio)', () => {
		const page = generateValidPage();
		const title = page.title;
		// @ts-ignore
		const content = page.content.content;
		pagesPage.load().screenshot();
		pagesPage.newPageButton().click();
		pagesEditPage.createPage(title, content, true);

		cy.wait(1000).screenshot();
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.pageListContainer().contains(title).should('be.visible');

		pageDetailPage.setSlug(faker.helpers.slugify(title));
		pageDetailPage.load().screenshot();
		cy.wait(1000);
		pageDetailPage.contentContainer().contains(title).should('be.visible');
		pageDetailPage.contentContainer().contains(content).should('be.visible');
		cy.screenshot();
	});

	it('should create a page and publish it with invalid data border cases (pseudo-aleatorio)', () => {
		const pagesWithBorderCases = generateManyInvalidPages(10).pagesWithBorderCases;
		const randomPage = pagesWithBorderCases[Math.floor(Math.random() * pagesWithBorderCases.length)];
		const title = randomPage.title;
		// @ts-ignore
		const content = randomPage.content.content;
		pagesPage.load().screenshot();
		pagesPage.newPageButton().click();
		pagesEditPage.createPage(<string>title, content, true);

		cy.wait(1000).screenshot();
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.pageListContainer().contains(<string>title).should('be.visible');

		pageDetailPage.setSlug(faker.helpers.slugify(<string>title));
		pageDetailPage.load().screenshot();
		cy.wait(1000);
		pageDetailPage.contentContainer().contains(<string>title).should('be.visible');
		pageDetailPage.contentContainer().contains(content).should('be.visible');
		cy.screenshot();
	});

	it('should create a page and publish it with invalid types (pseudo-aleatorio)', () => {
		const pageWithInvalidTypesPerField = generateManyInvalidPages(10).pageWithInvalidTypesPerField;
		const randomPage = pageWithInvalidTypesPerField[Math.floor(Math.random() * pageWithInvalidTypesPerField.length)];
		const title = randomPage.title;
		// @ts-ignore
		const content = randomPage.content.content;
		cy.log(content);
		pagesPage.load().screenshot();
		pagesPage.newPageButton().click();
		pagesEditPage.createPage(<string>title, content, true);

		cy.wait(1000).screenshot();
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.pageListContainer().contains(<string>title).should('be.visible');

		pageDetailPage.setSlug(faker.helpers.slugify(<string>title));
		pageDetailPage.load().screenshot();
		cy.wait(1000);
		pageDetailPage.contentContainer().contains(<string>title).should('be.visible');
		pageDetailPage.contentContainer().contains(content).should('be.visible');
		cy.screenshot();
	});

	// SC2
	it('should create a page and let it draft with valid data (aleatorio)', () => {
		const title = faker.lorem.words();
		const content = faker.lorem.paragraph();
		pagesPage.load().screenshot();
		pagesPage.newPageButton().click();
		pagesEditPage.createPage(title, content);

		cy.wait(1000).screenshot();
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.pageListContainer().contains(title).should('be.visible');

		pageDetailPage.setSlug(faker.helpers.slugify(title));
		cy.request({url: pageDetailPage.getUrl(), failOnStatusCode: false})
			.its('status')
			.should('equal', 404);
		cy.screenshot();
	});

	it('should create a page and let it draft with valid data (a-priori)', () => {
		cy.fixture('data-pool').then(({pages}) => {
			const randomPage = pages.valid[Math.floor(Math.random() * pages.valid.length)];

			const title = randomPage.title;
			const content = randomPage.content.content;
			pagesPage.load().screenshot();
			pagesPage.newPageButton().click();
			pagesEditPage.createPage(title, content);

			cy.wait(1000).screenshot();
			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.pageListContainer().contains(title).should('be.visible');

			pageDetailPage.setSlug(faker.helpers.slugify(title));
			cy.request({url: pageDetailPage.getUrl(), failOnStatusCode: false})
				.its('status')
				.should('equal', 404);
			cy.screenshot();
		});
	});

	it('should create a page and let it draft with invalid data (a-priori)', () => {
		cy.fixture('data-pool').then(({pages}) => {
			const randomPage = pages.invalid.pagesWithBorderCases[Math.floor(Math.random() * pages.invalid.pagesWithBorderCases.length)];

			const title = randomPage.title;
			const content = randomPage.content.content;
			pagesPage.load().screenshot();
			pagesPage.newPageButton().click();
			pagesEditPage.createPage(title, content);

			cy.wait(1000).screenshot();
			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.pageListContainer().contains(title).should('be.visible');

			pageDetailPage.setSlug(faker.helpers.slugify(title));
			cy.request({url: pageDetailPage.getUrl(), failOnStatusCode: false})
				.its('status')
				.should('equal', 404);
			cy.screenshot();
		});
	});

	it('should create a page and let it draft with valid data (pseudo-aleatorio)', () => {
		const randomPage = generateValidPage();

		const title = randomPage.title;
		// @ts-ignore
		const content = randomPage.content.content;
		pagesPage.load().screenshot();
		pagesPage.newPageButton().click();
		pagesEditPage.createPage(title, content);

		cy.wait(1000).screenshot();
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.pageListContainer().contains(title).should('be.visible');

		pageDetailPage.setSlug(faker.helpers.slugify(title));
		cy.request({url: pageDetailPage.getUrl(), failOnStatusCode: false})
			.its('status')
			.should('equal', 404);
		cy.screenshot();
	});

	it('should create a page and let it draft with invalid data border cases (pseudo-aleatorio)', () => {
		const randomPages = generateManyInvalidPages(10).pagesWithBorderCases;
		const randomPage = randomPages[Math.floor(Math.random() * randomPages.length)];

		const title = randomPage.title;
		// @ts-ignore
		const content = randomPage.content.content;
		pagesPage.load().screenshot();
		pagesPage.newPageButton().click();
		pagesEditPage.createPage(<string>title, content);

		cy.wait(1000).screenshot();
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.pageListContainer().contains(<string>title).should('be.visible');

		pageDetailPage.setSlug(faker.helpers.slugify(<string>title));
		cy.request({url: pageDetailPage.getUrl(), failOnStatusCode: false})
			.its('status')
			.should('equal', 404);
		cy.screenshot();
	});

	it('should create a page and let it draft with invalid types (pseudo-aleatorio)', () => {
		const randomPages = generateManyInvalidPages(10).pageWithInvalidTypesPerField;
		const randomPage = randomPages[Math.floor(Math.random() * randomPages.length)];

		const title = randomPage.title;
		// @ts-ignore
		const content = randomPage.content.content;
		pagesPage.load().screenshot();
		pagesPage.newPageButton().click();
		pagesEditPage.createPage(<string>title, content);

		cy.wait(1000).screenshot();
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.pageListContainer().contains(<string>title).should('be.visible');

		pageDetailPage.setSlug(faker.helpers.slugify(<string>title));
		cy.request({url: pageDetailPage.getUrl(), failOnStatusCode: false})
			.its('status')
			.should('equal', 404);
		cy.screenshot();
	});

	// SC3
	it('should create a page and schedule its publication with valid data (aleatorio)', () => {
		const title = faker.lorem.words();
		const content = faker.lorem.paragraph();
		pagesPage.load().screenshot();
		pagesPage.newPageButton().click();
		const fakeFullDate = faker.date.future();
		const fakeDate = fakeFullDate.toISOString().split('T')[0];
		const fakeTime = fakeFullDate.toISOString().split('T')[1].split('.')[0].split(':').slice(0, 2).join(':');
		pagesEditPage.createPage(title, content, true, {date: fakeDate, time: fakeTime});

		cy.wait(1000).screenshot();
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.pageListContainer().contains(title).should('be.visible');

		pageDetailPage.setSlug(faker.helpers.slugify(title));
		cy.request({url: pageDetailPage.getUrl(), failOnStatusCode: false})
			.its('status')
			.should('equal', 404);
		cy.screenshot();
	});

	it('should create a page and schedule its publication with valid data (a-priori)', () => {
		cy.fixture('data-pool').then(({pages}) => {
			const randomPage = pages.valid[Math.floor(Math.random() * pages.valid.length)];
			const title = randomPage.title;
			const content = randomPage.content.content;

			pagesPage.load().screenshot();
			pagesPage.newPageButton().click();
			pagesEditPage.createPage(title, content, true, {
				date: randomPage.publishSettings.publishDate,
				time: randomPage.publishSettings.publishTime,
			});

			cy.wait(1000).screenshot();
			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.pageListContainer().contains(title).should('be.visible');

			pageDetailPage.setSlug(faker.helpers.slugify(title));
			cy.request({url: pageDetailPage.getUrl(), failOnStatusCode: false})
				.its('status')
				.should('equal', 404);
			cy.screenshot();
		});
	});

	it('should create a page and schedule its publication with invalid data (a-priori)', () => {
		cy.fixture('data-pool').then(({pages}) => {
			const randomPage = pages.invalid.pagesWithBorderCases[Math.floor(Math.random() * pages.invalid.pagesWithBorderCases.length)];
			const title = randomPage.title;
			const content = randomPage.content.content;

			pagesPage.load().screenshot();
			pagesPage.newPageButton().click();
			pagesEditPage.createPage(title, content, true, {
				date: randomPage.publishSettings.publishDate,
				time: randomPage.publishSettings.publishTime,
			});

			cy.wait(1000).screenshot();
			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.pageListContainer().contains(title).should('be.visible');

			pageDetailPage.setSlug(faker.helpers.slugify(title));
			cy.request({url: pageDetailPage.getUrl(), failOnStatusCode: false})
				.its('status')
				.should('equal', 404);
			cy.screenshot();
		});
	});

	it('should create a page and schedule its publication with valid data (pseudo-aleatorio)', () => {
		const randomPage = generateValidPage();

		const title = randomPage.title;
		// @ts-ignore
		const content = randomPage.content.content;
		pagesPage.load().screenshot();
		pagesPage.newPageButton().click();
		pagesEditPage.createPage(title, content, true, {
			date: randomPage.publishSettings.publishDate,
			time: randomPage.publishSettings.publishTime,
		});

		cy.wait(1000).screenshot();
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.pageListContainer().contains(title).should('be.visible');

		pageDetailPage.setSlug(faker.helpers.slugify(title));
		cy.request({url: pageDetailPage.getUrl(), failOnStatusCode: false})
			.its('status')
			.should('equal', 404);
		cy.screenshot();
	});

	it('should create a page and schedule its publication with invalid data border cases (pseudo-aleatorio)', () => {
		const randomPages = generateManyInvalidPages(10).pagesWithBorderCases;
		const randomPage = randomPages[Math.floor(Math.random() * randomPages.length)];

		const title = randomPage.title;
		// @ts-ignore
		const content = randomPage.content.content;
		pagesPage.load().screenshot();
		pagesPage.newPageButton().click();

		pagesEditPage.createPage(<string>title, content, true, {
			// @ts-ignore
			date: randomPage.publishSettings.publishDate,
			// @ts-ignore
			time: randomPage.publishSettings.publishTime,
		});

		cy.wait(1000).screenshot();
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.pageListContainer().contains(<string>title).should('be.visible');

		pageDetailPage.setSlug(faker.helpers.slugify(<string>title));
		cy.request({url: pageDetailPage.getUrl(), failOnStatusCode: false})
			.its('status')
			.should('equal', 404);
		cy.screenshot();
	});

	it('should create a page and schedule its publication with invalid types (pseudo-aleatorio)', () => {
		const randomPages = generateManyInvalidPages(10).pageWithInvalidTypesPerField;
		const randomPage = randomPages[Math.floor(Math.random() * randomPages.length)];

		const title = <string>randomPage.title;
		// @ts-ignore
		const content = <string>randomPage.content.content;
		pagesPage.load().screenshot();
		pagesPage.newPageButton().click();
		pagesEditPage.createPage(title, content, true, {
			// @ts-ignore
			date: randomPage.publishSettings.publishDate,
			// @ts-ignore
			time: randomPage.publishSettings.publishTime,
		});

		cy.wait(1000).screenshot();
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.pageListContainer().contains(<string>title).should('be.visible');

		pageDetailPage.setSlug(title);
		cy.request({url: pageDetailPage.getUrl(), failOnStatusCode: false})
			.its('status')
			.should('equal', 404);
		cy.screenshot();
	});
});

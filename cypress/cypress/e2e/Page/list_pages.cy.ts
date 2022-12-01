import {adminPage, pagesEditPage, pagesPage} from '../../pages';

import {faker} from '@faker-js/faker';
import {generateManyInvalidPages, generateManyValidPages} from '../../helpers/mock';

describe('list_pages', () => {
	let pageTitle,
		pageTitle2,
		pageTitle3 = '';

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
	it('should filter by draft with valid data (aleatorio)', () => {
		//draft
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle = faker.lorem.words();
		let content = faker.lorem.paragraph();
		pagesEditPage.createPage(pageTitle, content);
		cy.wait(1000);

		//published
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle2 = faker.lorem.words();
		content = faker.lorem.paragraph();
		pagesEditPage.createPage(pageTitle2, content, true);
		cy.wait(1000);

		//scheduled
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle3 = faker.lorem.words();
		content = faker.lorem.paragraph();
		const fakeDate = faker.date.recent().toISOString().substring(0, 10);
		const fakeTime = faker.date.recent().toISOString().substring(11, 16);
		pagesEditPage.createPage(pageTitle3, content, true, {date: fakeDate, time: fakeTime});
		cy.wait(1000);


		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.selectPageStatus().click();
		cy.screenshot();
		cy.wait(500);
		pagesPage.draftPageOption().click();
		cy.screenshot();

		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle)
			.should('be.visible');
		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle2)
			.should('not.exist');
		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle3)
			.should('not.exist');
	});

	it('should filter by draft with valid data (a-priori)', () => {
		cy.fixture('data-pool').then(({pages}) => {
			// Get 3 unique random indexes from the pages array
			// @ts-ignore
			const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * pages.valid.length)))];

			// Get the pages with the indexes
			const pagesToCreate = indexes.map((index) => pages.valid[index]);

			//draft
			const draftPage = pagesToCreate[0];
			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.newPageButton().click();
			cy.wait(1000);
			pageTitle = draftPage.title;
			let content = draftPage.content.content;
			pagesEditPage.createPage(pageTitle, content);
			cy.wait(1000);

			//published
			const publishedPage = pagesToCreate[1];
			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.newPageButton().click();
			cy.wait(1000);
			pageTitle2 = publishedPage.title;
			content = publishedPage.content.content;
			pagesEditPage.createPage(pageTitle2, content, true);
			cy.wait(1000);

			//scheduled
			const scheduledPage = pagesToCreate[2];
			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.newPageButton().click();
			cy.wait(1000);
			pageTitle3 = scheduledPage.title;
			content = scheduledPage.content.content;
			pagesEditPage.createPage(pageTitle3, content, true, {
				date: scheduledPage.publishSettings.publishDate,
				time: scheduledPage.publishSettings.publishTime,
			});
			cy.wait(1000);

			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.selectPageStatus().click();
			cy.screenshot();
			cy.wait(500);
			pagesPage.draftPageOption().click();
			cy.screenshot();

			pagesPage
				.pageListContainer()
				.scrollIntoView()
				.contains(pageTitle)
				.should('be.visible');
			pagesPage
				.pageListContainer()
				.scrollIntoView()
				.contains(pageTitle2)
				.should('not.exist');
			pagesPage
				.pageListContainer()
				.scrollIntoView()
				.contains(pageTitle3)
				.should('not.exist');
		});
	});

	it('should filter by draft with invalid data (a-priori)', () => {
		cy.fixture('data-pool').then(({pages}) => {
			// Get 3 unique random indexes from the pages array
			// @ts-ignore
			const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * pages.invalid.pagesWithBorderCases.length)))];

			// Get the pages with the indexes
			const pagesToCreate = indexes.map((index) => pages.invalid.pagesWithBorderCases[index]);

			//draft
			const draftPage = pagesToCreate[0];
			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.newPageButton().click();
			cy.wait(1000);
			pageTitle = draftPage.title;
			let content = draftPage.content.content;
			pagesEditPage.createPage(pageTitle, content);
			cy.wait(1000);

			//published
			const publishedPage = pagesToCreate[1];
			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.newPageButton().click();
			cy.wait(1000);
			pageTitle2 = publishedPage.title;
			content = publishedPage.content.content;
			pagesEditPage.createPage(pageTitle2, content, true);
			cy.wait(1000);

			//scheduled
			const scheduledPage = pagesToCreate[2];
			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.newPageButton().click();
			cy.wait(1000);
			pageTitle3 = scheduledPage.title;
			content = scheduledPage.content.content;
			pagesEditPage.createPage(pageTitle3, content, true, {
				date: scheduledPage.publishSettings.publishDate,
				time: scheduledPage.publishSettings.publishTime,
			});
			cy.wait(1000);

			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.selectPageStatus().click();
			cy.screenshot();
			cy.wait(500);
			pagesPage.draftPageOption().click();
			cy.screenshot();

			pagesPage
				.pageListContainer()
				.scrollIntoView()
				.contains(pageTitle)
				.should('be.visible');
			pagesPage
				.pageListContainer()
				.scrollIntoView()
				.contains(pageTitle2)
				.should('not.exist');
			pagesPage
				.pageListContainer()
				.scrollIntoView()
				.contains(pageTitle3)
				.should('not.exist');
		});
	});

	it('should filter by draft with valid data (pseudo-aleatorio)', () => {
		const pagesToCreate = generateManyValidPages(3);

		//draft
		const draftPage = pagesToCreate[0];
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle = draftPage.title;
		// @ts-ignore
		let content = draftPage.content.content;
		pagesEditPage.createPage(pageTitle, content);
		cy.wait(1000);

		//published
		const publishedPage = pagesToCreate[1];
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle2 = publishedPage.title;
		// @ts-ignore
		content = publishedPage.content.content;
		pagesEditPage.createPage(pageTitle2, content, true);
		cy.wait(1000);

		//scheduled
		const scheduledPage = pagesToCreate[2];
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle3 = scheduledPage.title;
		// @ts-ignore
		content = scheduledPage.content.content;
		pagesEditPage.createPage(pageTitle3, content, true, {
			date: scheduledPage.publishSettings.publishDate,
			time: scheduledPage.publishSettings.publishTime,
		});
		cy.wait(1000);


		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.selectPageStatus().click();
		cy.screenshot();
		cy.wait(500);
		pagesPage.draftPageOption().click();
		cy.screenshot();

		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle)
			.should('be.visible');
		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle2)
			.should('not.exist');
		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle3)
			.should('not.exist');
	});

	it('should filter by draft with invalid data border cases (pseudo-aleatorio)', () => {
		const pagesToCreate = generateManyInvalidPages(3).pagesWithBorderCases;

		//draft
		const draftPage = pagesToCreate[0];
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle = draftPage.title.toString();
		// @ts-ignore
		let content = draftPage.content.content.toString();
		pagesEditPage.createPage(pageTitle, content);
		cy.wait(1000);

		//published
		const publishedPage = pagesToCreate[1];
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle2 = publishedPage.title.toString();
		// @ts-ignore
		content = publishedPage.content.content.toString();
		pagesEditPage.createPage(pageTitle2, content, true);
		cy.wait(1000);

		//scheduled
		const scheduledPage = pagesToCreate[2];
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle3 = scheduledPage.title.toString();
		// @ts-ignore
		content = scheduledPage.content.content.toString();
		pagesEditPage.createPage(pageTitle3, content, true, {
			// @ts-ignore
			date: <string>scheduledPage.publishSettings.publishDate,
			// @ts-ignore
			time: <string>scheduledPage.publishSettings.publishTime,
		});
		cy.wait(1000);


		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.selectPageStatus().click();
		cy.screenshot();
		cy.wait(500);
		pagesPage.draftPageOption().click();
		cy.screenshot();

		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle)
			.should('be.visible');
		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle2)
			.should('not.exist');
		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle3)
			.should('not.exist');
	});

	it('should filter by draft with invalid types (pseudo-aleatorio)', () => {
		const pagesToCreate = generateManyInvalidPages(3).pageWithInvalidTypesPerField;

		//draft
		const draftPage = pagesToCreate[0];
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle = draftPage.title.toString();
		// @ts-ignore
		let content = draftPage.content.content.toString();
		pagesEditPage.createPage(pageTitle, content);
		cy.wait(1000);

		//published
		const publishedPage = pagesToCreate[1];
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle2 = publishedPage.title.toString();
		// @ts-ignore
		content = publishedPage.content.content.toString();
		pagesEditPage.createPage(pageTitle2, content, true);
		cy.wait(1000);

		//scheduled
		const scheduledPage = pagesToCreate[2];
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle3 = scheduledPage.title.toString();
		// @ts-ignore
		content = scheduledPage.content.content.toString();
		pagesEditPage.createPage(pageTitle3, content, true, {
			// @ts-ignore
			date: <string>scheduledPage.publishSettings.publishDate,
			// @ts-ignore
			time: <string>scheduledPage.publishSettings.publishTime,
		});
		cy.wait(1000);


		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.selectPageStatus().click();
		cy.screenshot();
		cy.wait(500);
		pagesPage.draftPageOption().click();
		cy.screenshot();

		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle)
			.should('be.visible');
		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle2)
			.should('not.exist');
		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle3)
			.should('not.exist');
	});

	// SC2
	it('should filter by published with valid data (aleatorio)', () => {
		//draft
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle = faker.lorem.words();
		let content = faker.lorem.paragraph();
		pagesEditPage.createPage(pageTitle, content);
		cy.wait(1000);

		//published
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle2 = faker.lorem.words();
		content = faker.lorem.paragraph();
		pagesEditPage.createPage(pageTitle2, content, true);
		cy.wait(1000);

		//scheduled
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle3 = faker.lorem.words();
		content = faker.lorem.paragraph();
		const fakeDate = faker.date.recent().toISOString().substring(0, 10);
		const fakeTime = faker.date.recent().toISOString().substring(11, 16);
		pagesEditPage.createPage(pageTitle3, content, true, {date: fakeDate, time: fakeTime});
		cy.wait(1000);


		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.selectPageStatus().click();
		cy.screenshot();
		cy.wait(500);
		pagesPage.publishedPageOption().click();
		cy.screenshot();

		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle)
			.should('not.exist');
		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle2)
			.should('be.visible');
		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle3)
			.should('not.exist');
	});

	it('should filter by published with valid data (a-priori)', () => {
		cy.fixture('data-pool').then(({pages}) => {
			// Get 3 unique random indexes from the pages array
			// @ts-ignore
			const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * pages.valid.length)))];

			// Get the pages with the indexes
			const pagesToCreate = indexes.map((index) => pages.valid[index]);

			//draft
			const draftPage = pagesToCreate[0];
			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.newPageButton().click();
			cy.wait(1000);
			pageTitle = draftPage.title;
			let content = draftPage.content.content;
			pagesEditPage.createPage(pageTitle, content);
			cy.wait(1000);

			//published
			const publishedPage = pagesToCreate[1];
			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.newPageButton().click();
			cy.wait(1000);
			pageTitle2 = publishedPage.title;
			content = publishedPage.content.content;
			pagesEditPage.createPage(pageTitle2, content, true);
			cy.wait(1000);

			//scheduled
			const scheduledPage = pagesToCreate[2];
			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.newPageButton().click();
			cy.wait(1000);
			pageTitle3 = scheduledPage.title;
			content = scheduledPage.content.content;
			pagesEditPage.createPage(pageTitle3, content, true, {
				date: scheduledPage.publishSettings.publishDate,
				time: scheduledPage.publishSettings.publishTime,
			});
			cy.wait(1000);

			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.selectPageStatus().click();
			cy.screenshot();
			cy.wait(500);
			pagesPage.publishedPageOption().click();
			cy.screenshot();

			pagesPage
				.pageListContainer()
				.scrollIntoView()
				.contains(pageTitle)
				.should('not.exist');
			pagesPage
				.pageListContainer()
				.scrollIntoView()
				.contains(pageTitle2)
				.should('be.visible');
			pagesPage
				.pageListContainer()
				.scrollIntoView()
				.contains(pageTitle3)
				.should('not.exist');
		});
	});

	it('should filter by published with invalid data (a-priori)', () => {
		cy.fixture('data-pool').then(({pages}) => {
			// Get 3 unique random indexes from the pages array
			// @ts-ignore
			const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * pages.invalid.pagesWithBorderCases.length)))];

			// Get the pages with the indexes
			const pagesToCreate = indexes.map((index) => pages.invalid.pagesWithBorderCases[index]);

			//draft
			const draftPage = pagesToCreate[0];
			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.newPageButton().click();
			cy.wait(1000);
			pageTitle = draftPage.title;
			let content = draftPage.content.content;
			pagesEditPage.createPage(pageTitle, content);
			cy.wait(1000);

			//published
			const publishedPage = pagesToCreate[1];
			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.newPageButton().click();
			cy.wait(1000);
			pageTitle2 = publishedPage.title;
			content = publishedPage.content.content;
			pagesEditPage.createPage(pageTitle2, content, true);
			cy.wait(1000);

			//scheduled
			const scheduledPage = pagesToCreate[2];
			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.newPageButton().click();
			cy.wait(1000);
			pageTitle3 = scheduledPage.title;
			content = scheduledPage.content.content;
			pagesEditPage.createPage(pageTitle3, content, true, {
				date: scheduledPage.publishSettings.publishDate,
				time: scheduledPage.publishSettings.publishTime,
			});
			cy.wait(1000);

			pagesPage.load().screenshot();
			cy.wait(1000);
			pagesPage.selectPageStatus().click();
			cy.screenshot();
			cy.wait(500);
			pagesPage.publishedPageOption().click();
			cy.screenshot();

			pagesPage
				.pageListContainer()
				.scrollIntoView()
				.contains(pageTitle)
				.should('not.exist');
			pagesPage
				.pageListContainer()
				.scrollIntoView()
				.contains(pageTitle2)
				.should('be.visible');
			pagesPage
				.pageListContainer()
				.scrollIntoView()
				.contains(pageTitle3)
				.should('not.exist');
		});
	});

	it('should filter by published with valid data (pseudo-aleatorio)', () => {
		const pagesToCreate = generateManyValidPages(3);

		//draft
		const draftPage = pagesToCreate[0];
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle = draftPage.title;
		// @ts-ignore
		let content = draftPage.content.content;
		pagesEditPage.createPage(pageTitle, content);
		cy.wait(1000);

		//published
		const publishedPage = pagesToCreate[1];
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle2 = publishedPage.title;
		// @ts-ignore
		content = publishedPage.content.content;
		pagesEditPage.createPage(pageTitle2, content, true);
		cy.wait(1000);

		//scheduled
		const scheduledPage = pagesToCreate[2];
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle3 = scheduledPage.title;
		// @ts-ignore
		content = scheduledPage.content.content;
		pagesEditPage.createPage(pageTitle3, content, true, {
			date: scheduledPage.publishSettings.publishDate,
			time: scheduledPage.publishSettings.publishTime,
		});
		cy.wait(1000);


		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.selectPageStatus().click();
		cy.screenshot();
		cy.wait(500);
		pagesPage.publishedPageOption().click();
		cy.screenshot();

		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle)
			.should('not.exist');
		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle2)
			.should('be.visible');
		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle3)
			.should('not.exist');
	});

	it('should filter by published with invalid data border cases (pseudo-aleatorio)', () => {
		const pagesToCreate = generateManyInvalidPages(3).pagesWithBorderCases;

		//draft
		const draftPage = pagesToCreate[0];
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle = draftPage.title.toString();
		// @ts-ignore
		let content = draftPage.content.content.toString();
		pagesEditPage.createPage(pageTitle, content);
		cy.wait(1000);

		//published
		const publishedPage = pagesToCreate[1];
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle2 = publishedPage.title.toString();
		// @ts-ignore
		content = publishedPage.content.content.toString();
		pagesEditPage.createPage(pageTitle2, content, true);
		cy.wait(1000);

		//scheduled
		const scheduledPage = pagesToCreate[2];
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle3 = scheduledPage.title.toString();
		// @ts-ignore
		content = scheduledPage.content.content.toString();
		pagesEditPage.createPage(pageTitle3, content, true, {
			// @ts-ignore
			date: <string>scheduledPage.publishSettings.publishDate,
			// @ts-ignore
			time: <string>scheduledPage.publishSettings.publishTime,
		});
		cy.wait(1000);


		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.selectPageStatus().click();
		cy.screenshot();
		cy.wait(500);
		pagesPage.publishedPageOption().click();
		cy.screenshot();

		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle)
			.should('not.exist');
		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle2)
			.should('be.visible');
		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle3)
			.should('not.exist');
	});

	it('should filter by published with invalid types (pseudo-aleatorio)', () => {
		const pagesToCreate = generateManyInvalidPages(3).pageWithInvalidTypesPerField;

		//draft
		const draftPage = pagesToCreate[0];
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle = draftPage.title.toString();
		// @ts-ignore
		let content = draftPage.content.content.toString();
		pagesEditPage.createPage(pageTitle, content);
		cy.wait(1000);

		//published
		const publishedPage = pagesToCreate[1];
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle2 = publishedPage.title.toString();
		// @ts-ignore
		content = publishedPage.content.content.toString();
		pagesEditPage.createPage(pageTitle2, content, true);
		cy.wait(1000);

		//scheduled
		const scheduledPage = pagesToCreate[2];
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle3 = scheduledPage.title.toString();
		// @ts-ignore
		content = scheduledPage.content.content.toString();
		pagesEditPage.createPage(pageTitle3, content, true, {
			// @ts-ignore
			date: <string>scheduledPage.publishSettings.publishDate,
			// @ts-ignore
			time: <string>scheduledPage.publishSettings.publishTime,
		});
		cy.wait(1000);


		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.selectPageStatus().click();
		cy.screenshot();
		cy.wait(500);
		pagesPage.publishedPageOption().click();
		cy.screenshot();

		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle)
			.should('not.exist');
		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle2)
			.should('be.visible');
		pagesPage
			.pageListContainer()
			.scrollIntoView()
			.contains(pageTitle3)
			.should('not.exist');
	});
});

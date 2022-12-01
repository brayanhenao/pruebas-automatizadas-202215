import {
	adminPage,
	codeInjectionPage,
	homePage,
} from '../../pages';

import {faker} from '@faker-js/faker';
import {
	generateManyInvalidCodeInjections,
	generateValidCodeInjection,
} from '../../helpers/mock';

describe('code_injection', () => {
	before(cy.clearData);

	beforeEach(() => {
		adminPage.load().screenshot();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000).screenshot();
		});
	});

	afterEach(() => {
		// Not working
		// codeInjectionPage.load();
		// cy.wait(1000);
		// codeInjectionPage.siteHeaderTextArea().click();
		// cy.focused().clear({force: true});
		// cy.wait(1000);
		// codeInjectionPage.siteFooterTextArea().click();
		// cy.focused().clear({force: true});
		// cy.wait(1000);
		// codeInjectionPage.saveButton().click();
		// cy.wait(1000).screenshot();
	});

	// SC1
	it('should insert header with valid data (aleatorio)', () => {
		const content = faker.hacker.phrase();
		codeInjectionPage.load();
		cy.wait(1000).screenshot();
		codeInjectionPage
			.siteHeaderTextArea()
			.type(`<div>${content}</div>`, { parseSpecialCharSequences: false })
			.screenshot();
		codeInjectionPage.saveButton().click();
		cy.wait(1000).screenshot();
		homePage.load().screenshot();
		cy.get('body').contains(content).should('be.visible');
		cy.screenshot();
	});

	it('should insert header with valid data (a-priori)', () => {
		cy.fixture('data-pool').then(({codeInjections}) => {
			const randomCodeInjection = codeInjections.valid[Math.floor(Math.random() * codeInjections.valid.length)];

			const content = randomCodeInjection.header;
			codeInjectionPage.load();
			cy.wait(1000).screenshot();
			codeInjectionPage
				.siteHeaderTextArea()
				.type(`<div>${content}</div>`, { parseSpecialCharSequences: false })
				.screenshot();
			codeInjectionPage.saveButton().click();
			cy.wait(1000).screenshot();
			homePage.load().screenshot();
			cy.get('body').contains(content).should('be.visible');
			cy.screenshot();
		});
	});

	it('should insert header with invalid data (a-priori)', () => {
		cy.fixture('data-pool').then(({codeInjections}) => {
			const randomCodeInjection = codeInjections.invalid.codeInjectionsWithBorderCases[Math.floor(Math.random() * codeInjections.invalid.codeInjectionsWithBorderCases.length)];

			const content = randomCodeInjection.header.toString();
			codeInjectionPage.load();
			cy.wait(1000).screenshot();
			codeInjectionPage
				.siteHeaderTextArea()
				.type(`<div>${content}</div>`, { parseSpecialCharSequences: false })
				.screenshot();
			codeInjectionPage.saveButton().click();
			cy.wait(1000).screenshot();
			homePage.load().screenshot();
			cy.get('body').contains(content).should('be.visible');
			cy.screenshot();
		});
	});

	it('should insert header with valid data (pseudo-aleatorio)', () => {
		const randomCodeInjection = generateValidCodeInjection();

		const content = randomCodeInjection.header;
		codeInjectionPage.load();
		cy.wait(1000).screenshot();
		codeInjectionPage
			.siteHeaderTextArea()
			.type(`<div>${content}</div>`, { parseSpecialCharSequences: false })
			.screenshot();
		codeInjectionPage.saveButton().click();
		cy.wait(1000).screenshot();
		homePage.load().screenshot();
		cy.get('body').contains(content).should('be.visible');
		cy.screenshot();
	});

	it('should insert header with invalid data border cases (pseudo-aleatorio)', () => {
		const randomCodeInjections = generateManyInvalidCodeInjections().codeInjectionsWithBorderCases;
		const randomCodeInjection = randomCodeInjections[Math.floor(Math.random() * randomCodeInjections.length)];

		const content = randomCodeInjection.header.toString();
		codeInjectionPage.load();
		cy.wait(1000).screenshot();
		codeInjectionPage
			.siteHeaderTextArea()
			.type(`<div>${content}</div>`, { parseSpecialCharSequences: false })
			.screenshot();
		codeInjectionPage.saveButton().click();
		cy.wait(1000).screenshot();
		homePage.load().screenshot();
		cy.get('body').contains(content).should('be.visible');
		cy.screenshot();
	});

	it('should insert header with invalid types (pseudo-aleatorio)', () => {
		const randomCodeInjections = generateManyInvalidCodeInjections().codeInjectionsWithInvalidTypesPerField;
		const randomCodeInjection = randomCodeInjections[Math.floor(Math.random() * randomCodeInjections.length)];

		const content = randomCodeInjection.header.toString();
		codeInjectionPage.load();
		cy.wait(1000).screenshot();
		codeInjectionPage
			.siteHeaderTextArea()
			.type(`<div>${content}</div>`, { parseSpecialCharSequences: false })
			.screenshot();
		codeInjectionPage.saveButton().click();
		cy.wait(1000).screenshot();
		homePage.load().screenshot();
		cy.get('body').contains(content).should('be.visible');
		cy.screenshot();
	});

	// SC2
	it('should insert header with valid data (aleatorio)', () => {
		const content = faker.hacker.phrase();
		codeInjectionPage.load();
		cy.wait(1000).screenshot();
		codeInjectionPage
			.siteFooterTextArea()
			.type(`<div>${content}</div>`, { parseSpecialCharSequences: false })
			.screenshot();
		codeInjectionPage.saveButton().click();
		cy.wait(1000).screenshot();
		homePage.load().screenshot();
		cy.get('body').contains(content).should('be.visible');
		cy.screenshot();
	});

	it('should insert header with valid data (a-priori)', () => {
		cy.fixture('data-pool').then(({codeInjections}) => {
			const randomCodeInjection = codeInjections.valid[Math.floor(Math.random() * codeInjections.valid.length)];

			const content = randomCodeInjection.header;
			codeInjectionPage.load();
			cy.wait(1000).screenshot();
			codeInjectionPage
				.siteFooterTextArea()
				.type(`<div>${content}</div>`, { parseSpecialCharSequences: false })
				.screenshot();
			codeInjectionPage.saveButton().click();
			cy.wait(1000).screenshot();
			homePage.load().screenshot();
			cy.get('body').contains(content).should('be.visible');
			cy.screenshot();
		});
	});

	it('should insert header with invalid data (a-priori)', () => {
		cy.fixture('data-pool').then(({codeInjections}) => {
			const randomCodeInjection = codeInjections.invalid.codeInjectionsWithBorderCases[Math.floor(Math.random() * codeInjections.invalid.codeInjectionsWithBorderCases.length)];

			const content = randomCodeInjection.header.toString();
			codeInjectionPage.load();
			cy.wait(1000).screenshot();
			codeInjectionPage
				.siteFooterTextArea()
				.type(`<div>${content}</div>`, { parseSpecialCharSequences: false })
				.screenshot();
			codeInjectionPage.saveButton().click();
			cy.wait(1000).screenshot();
			homePage.load().screenshot();
			cy.get('body').contains(content).should('be.visible');
			cy.screenshot();
		});
	});

	it('should insert header with valid data (pseudo-aleatorio)', () => {
		const randomCodeInjection = generateValidCodeInjection();

		const content = randomCodeInjection.header;
		codeInjectionPage.load();
		cy.wait(1000).screenshot();
		codeInjectionPage
			.siteFooterTextArea()
			.type(`<div>${content}</div>`, { parseSpecialCharSequences: false })
			.screenshot();
		codeInjectionPage.saveButton().click();
		cy.wait(1000).screenshot();
		homePage.load().screenshot();
		cy.get('body').contains(content).should('be.visible');
		cy.screenshot();
	});

	it('should insert header with invalid data border cases (pseudo-aleatorio)', () => {
		const randomCodeInjections = generateManyInvalidCodeInjections().codeInjectionsWithBorderCases;
		const randomCodeInjection = randomCodeInjections[Math.floor(Math.random() * randomCodeInjections.length)];

		const content = randomCodeInjection.header.toString();
		codeInjectionPage.load();
		cy.wait(1000).screenshot();
		codeInjectionPage
			.siteFooterTextArea()
			.type(`<div>${content}</div>`, { parseSpecialCharSequences: false })
			.screenshot();
		codeInjectionPage.saveButton().click();
		cy.wait(1000).screenshot();
		homePage.load().screenshot();
		cy.get('body').contains(content).should('be.visible');
		cy.screenshot();
	});

	it('should insert header with invalid types (pseudo-aleatorio)', () => {
		const randomCodeInjections = generateManyInvalidCodeInjections().codeInjectionsWithInvalidTypesPerField;
		const randomCodeInjection = randomCodeInjections[Math.floor(Math.random() * randomCodeInjections.length)];

		const content = randomCodeInjection.header.toString();
		codeInjectionPage.load();
		cy.wait(1000).screenshot();
		codeInjectionPage
			.siteFooterTextArea()
			.type(`<div>${content}</div>`, { parseSpecialCharSequences: false })
			.screenshot();
		codeInjectionPage.saveButton().click();
		cy.wait(1000).screenshot();
		homePage.load().screenshot();
		cy.get('body').contains(content).should('be.visible');
		cy.screenshot();
	});
});

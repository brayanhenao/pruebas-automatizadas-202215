export interface BasePage {
	load(): void;
}

export const baseUrl = Cypress.env('GHOST_OLD_VERSION')
	? 'http://localhost:3001'
	: 'http://localhost:2369'; // or 2368

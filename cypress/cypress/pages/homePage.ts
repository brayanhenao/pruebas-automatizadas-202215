import {BasePage, baseUrl} from './basePage';
class homePage implements BasePage {
	private _route = `${baseUrl}/`;
	public feedContainer = () => cy.get('.post-feed');

	load() {
		return cy.visit(this._route);
	}
}

export default new homePage();

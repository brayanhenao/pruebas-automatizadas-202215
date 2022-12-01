import baseAdminPage from './baseAdminPage';
import {BasePage, baseUrl} from './basePage';
class pagesPage extends baseAdminPage implements BasePage {
	private _route = `${baseUrl}/ghost/#/pages`;

	public actionsContainer = () =>
		cy.get('main section[class="view-actions"]').first();

	public newPageButton = () => this.actionsContainer().find('a').last();

	public selectPageStatus = () => cy.get('.gh-contentfilter-type').first();

	public draftPageOption = () => cy.get('.ember-power-select-option').eq(1);
	public publishedPageOption = () => cy.get('.ember-power-select-option').eq(2);
	public scheduledPageOption = () => cy.get('.ember-power-select-option').eq(3);

	public pageListContainer = () => cy.get('.content-list').first();

	load() {
		return cy.visit(this._route);
	}
}

export default new pagesPage();

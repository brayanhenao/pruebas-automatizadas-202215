import baseAdminPage from './baseAdminPage';
import {BasePage, baseUrl} from './basePage';
class codeInjectionPage extends baseAdminPage implements BasePage {
	private _route = `${baseUrl}/ghost/#/settings/code-injection`;

	public actionsContainer = () =>
		cy.get('main section[class="view-actions"]').first();

	public saveButton = () => this.actionsContainer().find('button').last();

	public siteHeaderTextArea = () => cy.get('main form #ghost-head').first();
	public siteFooterTextArea = () => cy.get('main form #ghost-foot').first();

	load() {
		return cy.visit(this._route);
	}
}

export default new codeInjectionPage();

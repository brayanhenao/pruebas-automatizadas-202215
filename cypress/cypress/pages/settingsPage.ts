import baseAdminPage from './baseAdminPage';
import {BasePage, baseUrl} from './basePage';
class settingsPage extends baseAdminPage implements BasePage {
	private _route = `${baseUrl}/ghost/#/settings`;

	public codeInjectionButton = () =>
		cy.get('main .gh-settings-main-grid').last().find('a').eq(1);

	load() {
		return cy.visit(this._route);
	}
}

export default new settingsPage();

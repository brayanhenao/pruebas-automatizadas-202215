import baseAdminPage from './baseAdminPage';
import {BasePage, baseUrl} from './basePage';
class dashboardPage extends baseAdminPage implements BasePage {
	private _route = `${baseUrl}/ghost/#/dashboard`;

	load() {
		return cy.visit(this._route);
	}
}

export default new dashboardPage();

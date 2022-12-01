import baseAdminPage from './baseAdminPage';
import {BasePage, baseUrl} from './basePage';
class membersEditPage extends baseAdminPage implements BasePage {
	private _route = `${baseUrl}/ghost/#/members/new`;

	private headerOptions = () => cy.get('main section header').first();

	public memberFormContainer = () => cy.get('.gh-member-settings').first();

	public nameInput = () =>
		this.memberFormContainer().find('input[type="text"]').eq(0);
	public emailInput = () =>
		this.memberFormContainer().find('input[type="text"]').eq(1);

	public subscribeToggle = () =>
		this.memberFormContainer()
			.find('.gh-members-subscribed-checkbox .for-switch')
			.first();

	public saveButton = () => this.headerOptions().find('button').last();

	load() {
		return cy.visit(this._route);
	}
}

export default new membersEditPage();

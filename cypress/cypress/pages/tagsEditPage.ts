import baseAdminPage from './baseAdminPage';
import {BasePage, baseUrl} from './basePage';
class tagsEditPage extends baseAdminPage implements BasePage {
	private _route = `${baseUrl}/ghost/#/tags/new`;

	private headerOptions = () => cy.get('main section header').first();

	public mainSettingsContainer = () =>
		cy.get('.gh-main-section-content').first();

	public nameInput = () =>
		this.mainSettingsContainer().find('input[type="text"]').first();

	public colorInput = () =>
		this.mainSettingsContainer()
			.find('.input-color input[type="text"]')
			.first();

	public descriptionInput = () =>
		this.mainSettingsContainer().find('textarea').first();

	public saveButton = () => this.headerOptions().find('button').last();

	public deleteButton = () => cy.get('.gh-btn-red').last();
	public deleteButtonConfirm = () => cy.get('.modal-content button').last();

	load() {
		return cy.visit(this._route);
	}
}

export default new tagsEditPage();

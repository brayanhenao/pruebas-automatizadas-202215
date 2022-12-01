import {BasePage, baseUrl} from './basePage';

class postsEditPage implements BasePage {
	private _route = `${baseUrl}/ghost/#/posts/new`;

	private headerOptions = () => cy.get('main section header').first();

	private backButton = () => this.headerOptions().find('a').first();

	private previewButton = () =>
		this.headerOptions().find('section button').first();
	private publishButton = () =>
		this.headerOptions().find('section button').last();

	public settingsButton = () => cy.get('main button').last();
	public settingsMenu = () => cy.get('.settings-menu-content').first();

	//TODO: add other settings if required
	public settingsPostAccessSelect = () =>
		this.settingsMenu().find('.form-group select').first();

	public tagInput = () => this.settingsMenu().find('#tag-input input').first();

	private editorContainer = () => cy.get('.gh-koenig-editor-pane').first();

	private titleInput = () => this.editorContainer().find('textarea').first();
	private contentInput = () =>
		this.editorContainer().find('article div').first();

	load() {
		return cy.visit(this._route);
	}

	createPost(
		title: string,
		content: string,
		publish: {
			date: string;
			time: string;
		} | boolean = false,
	) {
		this.titleInput().type(title, {parseSpecialCharSequences: false}).screenshot();
		this.contentInput().type(content, {parseSpecialCharSequences: false}).screenshot();

		if (publish) {
			this.publishButton().click();
			cy.wait(1000).screenshot();
			if (typeof publish == 'object') {
				cy.get('.gh-publish-settings button').last().click();
				cy.get('.gh-publish-settings .gh-publish-setting-form .gh-radio')
					.last()
					.click()
					.screenshot();
				cy.get(
					'.gh-publish-settings .gh-publish-setting-form .gh-date-time-picker',
				)
					.last()
					.click()
					.screenshot();
				cy.wait(1000);
				const datePicker = cy.get('.gh-date-time-picker-date > input');
				datePicker.click();
				datePicker.clear();
				datePicker.type(publish.date, { parseSpecialCharSequences: false });
				datePicker.screenshot();

				const timePicker = cy.get('.gh-date-time-picker-time > input');
				timePicker.click();
				timePicker.clear();
				timePicker.type(publish.time, { parseSpecialCharSequences: false });
				timePicker.screenshot();
			}
			cy.get('.gh-publish-cta').first().click();
			cy.wait(1000).screenshot();
			cy.get('.gh-publish-cta button').first().click();
			cy.screenshot();
		}
	}
}

export default new postsEditPage();

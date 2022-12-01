import baseAdminPage from './baseAdminPage';
import {BasePage, baseUrl} from './basePage';
class postsPage extends baseAdminPage implements BasePage {
	private _route = `${baseUrl}/ghost/#/posts`;

	public actionsContainer = () =>
		cy.get('main section[class="view-actions"]').first();

	public newPostsButton = () => this.actionsContainer().find('a').last();

	public selectPostStatus = () =>
		this.actionsContainer().find('.gh-contentfilter-type').first();
	public draftPostOption = () => cy.get('.ember-power-select-option').eq(1);

	public selectSortDate = () =>
		this.actionsContainer().find('.gh-contentfilter-sort');
	public newestFirstOption = () => cy.get('.ember-power-select-option').eq(0);
	public oldestFirstOption = () => cy.get('.ember-power-select-option').eq(1);

	public postListContainer = () => cy.get('.posts-list').first();

	load() {
		return cy.visit(this._route);
	}
}

export default new postsPage();

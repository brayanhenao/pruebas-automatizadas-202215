import baseAdminPage from './baseAdminPage';
import {BasePage, baseUrl} from './basePage';
class membersPage extends baseAdminPage implements BasePage {
	private _route = `${baseUrl}/ghost/#/members`;

	public actionsContainer = () =>
		cy.get('main section[class="view-actions"]').first();

	public membersListContainer = () => cy.get('.gh-list').first();

	public newMemberButton = () => this.actionsContainer().find('a').last();

	public filterButton = () =>
		this.actionsContainer().find('.ember-basic-dropdown-trigger').first();
	public filterMenuContainer = () => cy.get('.gh-filter-builder').first();

	public filterAddNewFilterButton = () =>
		this.filterMenuContainer().find('.gh-add-filter').first();

	public filterParameterSelect = () =>
		this.filterMenuContainer()
			.find('.gh-filter-block')
			.first()
			.find('select')
			.first();
	public filterParameterConditionSelect = () =>
		this.filterMenuContainer()
			.find('.gh-filter-block')
			.first()
			.find('select')
			.eq(1);
	public filterParameterValueSelect = () =>
		this.filterMenuContainer()
			.find('.gh-filter-block')
			.first()
			.find('select')
			.last();
	public filterParameterValueInput = () =>
		this.filterMenuContainer().find('input[type="text"]').last();

	public filterParameterSelect2 = () =>
		this.filterMenuContainer()
			.find('.gh-filter-block')
			.eq(1)
			.find('select')
			.first();
	public filterParameterConditionSelect2 = () =>
		this.filterMenuContainer()
			.find('.gh-filter-block')
			.eq(1)
			.find('select')
			.eq(1);
	public filterParameterValueSelect2 = () =>
		this.filterMenuContainer()
			.find('.gh-filter-block')
			.eq(1)
			.find('select')
			.last();
	public filterParameterValueInput2 = () =>
		this.filterMenuContainer()
			.find('.gh-filter-block')
			.eq(1)
			.find('input[type="text"]')
			.last();

	public filterApplyButton = () =>
		this.filterMenuContainer().find('button').last();

	load() {
		cy.log('route', this._route);
		return cy.visit(this._route);
	}
}

export default new membersPage();

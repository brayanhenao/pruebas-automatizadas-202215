import {BasePage, baseUrl} from './basePage';
class pageDetailPage implements BasePage {
	private _route = `${baseUrl}/`;

	private _slug = '';

	public contentContainer = () => cy.get('.site-content').first();

	load() {
		return cy.visit(this._route + this._slug);
	}

	getUrl() {
		return this._route + this._slug;
	}

	setSlug(slug: string) {
		this._slug = slug;
	}
}

export default new pageDetailPage();

import {BasePage, baseUrl} from './basePage';
class postDetailPage implements BasePage {
	private _route = `${baseUrl}/`;

	private _slug = '';

	public contentContainer = () => cy.get('.gh-content');

	load() {
		return cy.visit(this._route + this._slug);
	}

	setSlug(slug: string) {
		this._slug = slug;
	}
}

export default new postDetailPage();

import {BasePage, baseUrl} from './basePage';
class adminPage implements BasePage {
	private _route = `${baseUrl}/ghost`;

	public userTextField = () => cy.get('input[name="identification"]').first();
	public passwordTextField = () => cy.get('input[name="password"]').first();
	public signInButton = () => cy.get('button[type="submit"]').first();

	load() {
		return cy.visit(this._route);
	}

	login(user: string, password: string) {
		this.userTextField().type(user);
		this.passwordTextField().type(password);
		this.signInButton().click();
	}

	logout() {
		cy.visit(this._route + '#/signout/');
	}
}

export default new adminPage();

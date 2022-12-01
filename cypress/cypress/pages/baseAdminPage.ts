import {BasePage, baseUrl} from './basePage';

/**
 * a common page for admin to handle common items (i.e navs)
 */
class baseAdminPage {
	public navContainer = () => cy.get('.gh-nav-top').first();

	// options

	public dashboardOption = () => this.navContainer().find('li').eq(0);
	public viewSiteOption = () => this.navContainer().find('li').eq(1);
	public exploreOption = () => this.navContainer().find('li').eq(2);

	public postsOptionContainer = () => this.navContainer().find('li').eq(3);
	public postsOption = () => this.postsOptionContainer().find('a').first();

	public draftPostsOption = () =>
		this.postsOptionContainer().find('div li').eq(0);
	public scheduledPostsOption = () =>
		this.postsOptionContainer().find('div li').eq(1);
	public publishedPostsOption = () =>
		this.postsOptionContainer().find('div li').eq(2);

	public pagesOption = () => this.navContainer().find('li').eq(4);
	public tagsOption = () => this.navContainer().find('li').eq(5);
	public membersOption = () => this.navContainer().find('li').eq(6);
}

export default baseAdminPage;

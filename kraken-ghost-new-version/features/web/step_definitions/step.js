const {When, Given, Then, BeforeAll} = require('@cucumber/cucumber');

const LoginPage = require('./page_objects/login_page.js');
const PostPage = require('./page_objects/post_page.js');
const TagPage = require('./page_objects/tag_page.js');
const MemberPage = require('./page_objects/member_page.js');
const PagePage = require('./page_objects/page_page.js');
const SettingsPage = require('./page_objects/settings_page.js');

const GhostAdminAPI = require('../../../utils/ghost_admin_api');
const path = require('path');
const fs = require('fs');

// Setup pages
const loginPage = new LoginPage(this.driver);
const postPage = new PostPage(this.driver);
const tagPage = new TagPage(this.driver);
const pagePage = new PagePage(this.driver);
const memberPage = new MemberPage(this.driver);
const settingsPage = new SettingsPage(this.driver);

// Setup Utils
const ghostAdminAPI = new GhostAdminAPI();

// TearDown data in Ghost
BeforeAll(ghostAdminAPI.TearDown);

// Common actions
When('I take a screenshot for Feature {string} and Scenario {string} and Step {string}', async function(feature, scenario, step) {
	const screenshotsDir = path.join(__dirname, '../../../screenshots');
	// check if screenshots directory exists
	if (!fs.existsSync(screenshotsDir)) {
		fs.mkdirSync(screenshotsDir);
	}

	// check if feature directory exists
	const featureDir = path.join(screenshotsDir, feature);
	if (!fs.existsSync(featureDir)) {
		fs.mkdirSync(featureDir);
	}

	const screenshotPath = path.join(featureDir, scenario + '_' + step + '.png');
	await this.driver.saveScreenshot(screenshotPath);
});

When('I enter login credentials', loginPage.EnterLoginCredentials);

When('I click the login button', loginPage.ClickLoginButton);

// Login actions
Given('I login into ghost admin console', loginPage.FullLogin);

Given('I navigate to login page', loginPage.NavigateToLoginPage);

// Post actions
When('I navigate to posts', postPage.NavigateToPosts);

When('I click the create posts button', postPage.ClickCreatePostButton);

When('I fill in the title with {string}', postPage.FillInTitle);

When('I fill in the content with {string}', postPage.FillInContent);

When('I click the publish button', postPage.ClickPublishButton);

When('I click the publish now button', postPage.ClickPublishNowButton);

When('I schedule post for later with date {string} and time {string}', postPage.SchedulePostForLater);

When('I click the settings menu', postPage.ClickPostSettingsMenu);

When('I click the select tag', postPage.ClickInSelectTag);

When('I click the post access combo box', postPage.ClickPostAccessComboBox);

When('I select the {string} option', postPage.SelectPostAccessOption);

When('I filter the posts access by {string}', postPage.FilterPostsByAccess);

When('I change the publish date to {string} and time to {string}', postPage.ChangePublishDateAndTime);

When('I filter the posts published date by {string}', postPage.FilterPostsByPublishedDate);

When('I filter the posts by status {string}', postPage.FilterPostsByStatus);

Then('I should see the post with title {string} in the list of posts', postPage.VerifyPostTitle);

Then('I should not see the post with title {string} in the list of posts', postPage.VerifyPostTitleNotPresent);

Then('I should see the post with title {string} in the list of posts with status {string}', postPage.VerifyPostTitleStatus);

Then('I should see the post with title {string} in the list of posts with scheduled date {string} and time {string}', postPage.VerifyPostTitleScheduledDate);

Then('I should see the post with title {string} with access {string} in the list of posts filtered by access', postPage.VerifyPostTitleAccess);

Then('I should see the post with title {string} in the position {int}', postPage.VerifyPostPosition);

Then('I should see the post with title {string} in the blog', postPage.VerifyPostInBlog);

Then('I should not see the post with title {string} in the blog', postPage.VerifyPostNotInBlog);

Then('I should have access only for {string}', postPage.VerifyPostAccessOnlyFor);


// Page actions
When('I navigate to pages', pagePage.NavigateToPages);

When('I click the create page button', pagePage.ClickCreatePageButton);

When('I fill in the page title with {string}', pagePage.FillInTitle);

When('I fill in the page content with {string}', pagePage.FillInDescription);

When('I click the publish page button', pagePage.ClickPublishButton);

When('I click the publish page now button', pagePage.ClickPublishNowButton);

When('I click the Schedule For Later Button button', pagePage.ClickScheduleForLaterButton);

When('I fill in the date with {string}', pagePage.FillInDateForLater);

When('I fill in the time with {string}', pagePage.FillInTimeForLater);

Then('I should see the page with title {string} in the list of pages', pagePage.VerifyPageTitle);

Then('I should see the pages with title {string} in the list of pages with status {string}', pagePage.VerifyPageTitleStatus);

// List Pages
Then('I should see {int} number of pages with status {string}.', pagePage.VerifyNumberPageWithStatus);

When('I click the filter pages button', pagePage.ClickFilterPageButton);

When('I click the filter published pages button', pagePage.ClickFilterPublishedPageButton);

When('I click the filter draft pages button', pagePage.ClickFilterDrafPageButton);

// Tag actions
When('I navigate to tags', tagPage.NavigateToTags);

When('I click the create tag button', tagPage.ClickCreateTagsButton);

When('I fill in the tag name with {string}', tagPage.FillInTitle);

When('I fill in the tag description with {string}', tagPage.FillInDescription);

When('I click the save tag button', tagPage.ClickSaveTagButton);

Then('I should see the tag with title {string} in the list of tags', tagPage.VerifyTagTitle);

Then('I should see the tag with name {string} and {int} post in the list of tags', tagPage.VerifyNumbersTagWithTitle);


// Member actions
When('I navigate to members', memberPage.NavigateToMembers);

When('I click the create New member button', memberPage.ClickCreateNewMemberButton);

When('I fill in the Name with {string}', memberPage.FillInName);

When('I fill in the email with {string}', memberPage.FillInEmail);

When('I fill in the Note with {string}', memberPage.FillInNote);

When('I set member as unsubscribed', memberPage.SetMemberAsUnsubscribed);

When('I click the save button', memberPage.ClickSaveButton);

When('I click on filter member', memberPage.ClickFilter);

When('I click the Add filter button', memberPage.ClickAddFilter);

When('I filter members as {string} member', memberPage.FilterMemberBySubscriptionCriteria);

When('I filter members by name with query {string}', memberPage.FilterMemberByName);

When('I filter members by email with query {string} in position {int}', memberPage.FilterMemberByEmail);

Then('I should see the member with email {string} in the list of members', memberPage.VerifyEmail);

Then('I should see the member with name {string} in the list of members', memberPage.VerifyName);

// Code injection actions
When('I navigate to settings', settingsPage.NavigateToSettings);

When('I navigate to ghost blog', settingsPage.NavigateToGhost);

When('I click the code injection setting', settingsPage.ClickCodeInjectionFeature);

When('I fill in the Ghost Header with {string}', settingsPage.FillInCodeInjectionEditor);

When('I fill in the Ghost Footer with {string}', settingsPage.FillInCodeInjectionEditorFooter);

When('I scroll down in ghost blog', settingsPage.ScrollDown);

When('I should see the ghost header with text {string}', settingsPage.CheckCustomHeader);

When('I should see the ghost footer with text {string}', settingsPage.CheckCustomFooter);


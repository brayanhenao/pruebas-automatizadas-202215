import {
	adminPage,
	dashboardPage,
	homePage,
	postsEditPage,
	postsPage,
	postDetailPage,
} from '../../pages';

import {faker} from '@faker-js/faker';
import {generateManyInvalidPosts, generateManyValidPosts} from '../../helpers/mock';
// faker.seed(666); //set seed to keep data consistent

describe('create_post', () => {
	before(cy.clearData);

	beforeEach(() => {
		adminPage.load().screenshot();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000).screenshot();
		});
	});

	// ESC1 - F1
	it('should create a valid post and publish it (a-priori)', () => {
		cy.fixture('data-pool').then(({posts}) => {
			const post = Math.floor(Math.random() * (posts.valid.length));
			dashboardPage.postsOption().click();
			cy.wait(1000).screenshot();
			const postTitle = posts.valid[post].title;
			const postContent = posts.valid[post].content.content;
			postsPage.newPostsButton().click();
			cy.screenshot();
			postsEditPage.createPost(postTitle, postContent, true);
			cy.wait(1000);

			postsPage.load().screenshot();

			postsPage.publishedPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('be.visible');
			cy.wait(1000);
			postsPage.draftPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('not.exist');

			cy.wait(1000);

			homePage.load().screenshot();
			cy.wait(1000);

			homePage.feedContainer().contains(postTitle).should('be.visible');
			cy.screenshot();
		});

	});

	it('should create an invalid post, with missingKeys and publish it (a-priori)', () => {
		cy.fixture('data-pool').then(({posts}) => {
			const post = Math.floor(Math.random() * (posts.invalid.postsWithMissingKeys.length));
			dashboardPage.postsOption().click();
			cy.wait(1000).screenshot();
			const postTitle = posts.invalid.postsWithMissingKeys[post].title;
			const postContent = posts.invalid.postsWithMissingKeys[post].content.content;
			postsPage.newPostsButton().click();
			cy.screenshot();
			postsEditPage.createPost(postTitle, postContent, true);
			cy.wait(1000);

			postsPage.load().screenshot();

			postsPage.publishedPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('be.visible');
			cy.wait(1000);
			postsPage.draftPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('not.exist');

			cy.wait(1000);

			homePage.load().screenshot();
			cy.wait(1000);

			homePage.feedContainer().contains(postTitle).should('be.visible');
			cy.screenshot();
		});

	});

	it('should create a valid post and publish it (pseudo-aleatorio)', () => {
		const randomPosts = generateManyValidPosts(100);
		const randomPost = Math.floor(Math.random() * (randomPosts.length));
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const postTitle = randomPosts[randomPost].title;
		// @ts-ignore
		const postContent = randomPosts[randomPost].content.content; // si no accedo el content de esta manera, cypress me genera error.
		postsPage.newPostsButton().click();
		cy.screenshot();
		postsEditPage.createPost(postTitle, postContent, true);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');

		cy.wait(1000);

		homePage.load().screenshot();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('be.visible');
		cy.screenshot();

	});

	it('should create an invalid post with invalid types and publish it (pseudo-aleatorio)', () => {
		const randomPosts = generateManyInvalidPosts().postWithInvalidTypesPerField;
		const randomPost = Math.floor(Math.random() * (randomPosts.length));
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const postTitle = randomPosts[randomPost].title.toString();
		// @ts-ignore
		const postContent = randomPosts[randomPost].content.content.toString(); // si no accedo el content de esta manera, cypress me genera error.
		postsPage.newPostsButton().click();
		cy.screenshot();
		postsEditPage.createPost(postTitle, postContent, true);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');

		cy.wait(1000);

		homePage.load().screenshot();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('be.visible');
		cy.screenshot();

	});

	it('should create an invalid post with border cases and publish it (pseudo-aleatorio)', () => {
		const randomPosts = generateManyInvalidPosts().postsWithBorderCases;
		const randomPost = Math.floor(Math.random() * (randomPosts.length));
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const postTitle = randomPosts[randomPost].title.toString();
		// @ts-ignore
		const postContent = randomPosts[randomPost].content.content; // si no accedo el content de esta manera, cypress me genera error.
		postsPage.newPostsButton().click();
		cy.screenshot();
		postsEditPage.createPost(postTitle, postContent, true);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');

		cy.wait(1000);

		homePage.load().screenshot();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('be.visible');
		cy.screenshot();

	});

	it('should create a valid post and publish it (aleatorio)', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const postTitle = faker.lorem.words();
		const postContent = faker.lorem.paragraphs();
		postsPage.newPostsButton().click();
		cy.screenshot();
		postsEditPage.createPost(postTitle, postContent, true);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');

		cy.wait(1000);

		homePage.load().screenshot();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('be.visible');
		cy.screenshot();
	});

	// ESC2 - F1
	it('should create a valid post and leave it draft (a-priori)', () => {
		cy.fixture('data-pool').then(({posts}) => {
			const post = Math.floor(Math.random() * (posts.valid.length));
			dashboardPage.postsOption().click();
			cy.wait(1000).screenshot();
			const postTitle = posts.valid[post].title;
			const postContent = posts.valid[post].content.content;
			postsPage.newPostsButton().click();
			cy.screenshot();
			postsEditPage.createPost(postTitle, postContent);
			cy.wait(1000);

			postsPage.load().screenshot();

			postsPage.publishedPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('not.exist');
			cy.wait(1000);
			postsPage.draftPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('be.visible');

			cy.wait(1000);

			homePage.load().screenshot();
			cy.wait(1000);

			homePage.feedContainer().contains(postTitle).should('not.exist');
			cy.screenshot();

			adminPage.load().screenshot();
		});
	});

	it('should create an invalid post, with missing keys and leave it draft (a-priori)', () => {
		cy.fixture('data-pool').then(({posts}) => {
			const post = Math.floor(Math.random() * (posts.invalid.postsWithMissingKeys.length));
			dashboardPage.postsOption().click();
			cy.wait(1000).screenshot();
			const postTitle = posts.invalid.postsWithMissingKeys[post].title;
			const postContent = posts.invalid.postsWithMissingKeys[post].content.content;
			postsPage.newPostsButton().click();
			cy.screenshot();
			postsEditPage.createPost(postTitle, postContent);
			cy.wait(1000);

			postsPage.load().screenshot();

			postsPage.publishedPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('not.exist');
			cy.wait(1000);
			postsPage.draftPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('be.visible');

			cy.wait(1000);

			homePage.load().screenshot();
			cy.wait(1000);

			homePage.feedContainer().contains(postTitle).should('not.exist');
			cy.screenshot();

			adminPage.load().screenshot();
		});
	});

	it('should create a valid post and leave it draft (pseudo-aleatorio)', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const randomPosts = generateManyValidPosts(100);
		const randomPost = Math.floor(Math.random() * (randomPosts.length));
		const postTitle = randomPosts[randomPost].title;
		// @ts-ignore
		const postContent = randomPosts[randomPost].content.content; // si no accedo el content de esta manera, cypress me genera error.

		postsPage.newPostsButton().click();
		cy.screenshot();
		postsEditPage.createPost(postTitle, postContent);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');

		cy.wait(1000);

		homePage.load().screenshot();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('not.exist');
		cy.screenshot();

		adminPage.load().screenshot();
	});

	it('should create an invalid post with invalid types and leave it draft (pseudo-aleatorio)', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const randomPosts = generateManyInvalidPosts().postWithInvalidTypesPerField;
		const randomPost = Math.floor(Math.random() * (randomPosts.length));
		const postTitle = randomPosts[randomPost].title.toString();
		// @ts-ignore
		const postContent = randomPosts[randomPost].content.content.toString();
		postsPage.newPostsButton().click();
		cy.screenshot();
		postsEditPage.createPost(postTitle, postContent);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');

		cy.wait(1000);

		homePage.load().screenshot();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('not.exist');
		cy.screenshot();

		adminPage.load().screenshot();
	});

	it('should create an valid post with border cases and leave it draft (pseudo-aleatorio)', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const randomPosts = generateManyInvalidPosts().postsWithBorderCases;
		const randomPost = Math.floor(Math.random() * (randomPosts.length));
		const postTitle = randomPosts[randomPost].title.toString();
		// @ts-ignore
		const postContent = randomPosts[randomPost].content.content.toString();
		postsPage.newPostsButton().click();
		cy.screenshot();
		postsEditPage.createPost(postTitle, postContent);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');

		cy.wait(1000);

		homePage.load().screenshot();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('not.exist');
		cy.screenshot();

		adminPage.load().screenshot();
	});

	it('should create a valid post and leave it draft (aleatorio)', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const postTitle = faker.lorem.words();
		const postContent = faker.lorem.paragraphs();
		postsPage.newPostsButton().click();
		cy.screenshot();
		postsEditPage.createPost(postTitle, postContent);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');

		cy.wait(1000);

		homePage.load().screenshot();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('not.exist');
		cy.screenshot();

		adminPage.load().screenshot();
	});

	// ESC3 - F1
	it('should create a valid post and schedule its publication (a-priori)', () => {
		cy.fixture('data-pool').then(({posts}) => {
			const post = Math.floor(Math.random() * (posts.valid.length));
			const postTitle = posts.valid[post].title;
			const postContent = posts.valid[post].content.content;
			const publishDate = posts.valid[post].publishSettings.publishDate;
			const publishTime = posts.valid[post].publishSettings.publishTime;
			dashboardPage.postsOption().click();
			cy.wait(1000).screenshot();
			postsPage.newPostsButton().click();
			cy.screenshot();
			postsEditPage.createPost(postTitle, postContent, {date: publishDate, time: publishTime});
			cy.wait(1000);

			postsPage.load().screenshot();

			postsPage.publishedPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('not.exist');
			cy.wait(1000);
			postsPage.draftPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('not.exist');
			postsPage.scheduledPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('be.visible');

			cy.wait(1000);

			homePage.load().screenshot();
			cy.wait(1000);

			homePage.feedContainer().contains(postTitle).should('not.exist');
			cy.screenshot();
		});
	});

	it('should create an invalid post with missing keys and schedule its publication (a-priori)', () => {
		cy.fixture('data-pool').then(({posts}) => {
			const post = Math.floor(Math.random() * (posts.invalid.postsWithMissingKeys.length));
			const postTitle = posts.invalid.postsWithMissingKeys[post].title?.toString();
			const postContent = posts.invalid.postsWithMissingKeys[post].content.content?.toString();
			const publishDate = posts.invalid.postsWithMissingKeys[post].publishSettings.publishDate?.toString();
			const publishTime = posts.invalid.postsWithMissingKeys[post].publishSettings.publishTime?.toString();
			dashboardPage.postsOption().click();
			cy.wait(1000).screenshot();
			postsPage.newPostsButton().click();
			cy.screenshot();
			postsEditPage.createPost(postTitle, postContent, {date: publishDate, time: publishTime});
			cy.wait(1000);

			postsPage.load().screenshot();

			postsPage.publishedPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('not.exist');
			cy.wait(1000);
			postsPage.draftPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('not.exist');
			postsPage.scheduledPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('be.visible');

			cy.wait(1000);

			homePage.load().screenshot();
			cy.wait(1000);

			homePage.feedContainer().contains(postTitle).should('not.exist');
			cy.screenshot();
		});
	});

	it('should create a valid post and schedule its publication (pseudo-aleatorio)', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const randomPosts = generateManyValidPosts(100);
		const randomPost = Math.floor(Math.random() * (randomPosts.length));
		const postTitle = randomPosts[randomPost].title;
		// @ts-ignore
		const postContent = randomPosts[randomPost].content.content; // si no accedo el content de esta manera, cypress me genera error.
		const publishDate = randomPosts[randomPost].publishSettings.publishDate;
		const publishTime = randomPosts[randomPost].publishSettings.publishTime;
		postsPage.newPostsButton().click();
		cy.screenshot();
		postsEditPage.createPost(postTitle, postContent, {date: publishDate, time:publishTime});
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');
		postsPage.scheduledPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');

		cy.wait(1000);

		homePage.load().screenshot();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('not.exist');
		cy.screenshot();
	});

	it('should create an invalid post with invalid types and schedule its publication (pseudo-aleatorio)', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const randomPosts = generateManyInvalidPosts().postWithInvalidTypesPerField;
		const randomPost = Math.floor(Math.random() * (randomPosts.length));
		const postTitle = randomPosts[randomPost].title?.toString();
		// @ts-ignore
		const postContent = randomPosts[randomPost].content.content.toString();
		// @ts-ignore
		const publishDate = randomPosts[randomPost].publishSettings.publishDate?.toString();
		// @ts-ignore
		const publishTime = randomPosts[randomPost].publishSettings.publishTime?.toString();
		postsPage.newPostsButton().click();
		cy.screenshot();
		postsEditPage.createPost(postTitle, postContent, {date: publishDate, time: publishTime});
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');
		postsPage.scheduledPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');

		cy.wait(1000);

		homePage.load().screenshot();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('not.exist');
		cy.screenshot();
	});

	it('should create an invalid post with border cases and schedule its publication (pseudo-aleatorio)', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const randomPosts = generateManyInvalidPosts().postsWithBorderCases;
		const randomPost = Math.floor(Math.random() * (randomPosts.length));
		const postTitle = randomPosts[randomPost].title.toString();
		// @ts-ignore
		const postContent = randomPosts[randomPost].content.content.toString();
		// @ts-ignore
		const publishDate = randomPosts[randomPost].publishSettings.publishDate?.toString();
		// @ts-ignore
		const publishTime = randomPosts[randomPost].publishSettings.publishTime?.toString();
		postsPage.newPostsButton().click();
		cy.screenshot();
		postsEditPage.createPost(postTitle, postContent, {date: publishDate, time: publishTime});
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');
		postsPage.scheduledPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');

		cy.wait(1000);

		homePage.load().screenshot();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('not.exist');
		cy.screenshot();
	});

	it('should create a valid post and schedule its publication (aleatorio)', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const postTitle = faker.lorem.words();
		const postContent = faker.lorem.paragraphs();
		const publishDate = faker.date.soon().toISOString().substring(0,10);
		const publishTime = faker.date.soon().toISOString().substring(11,19);
		postsPage.newPostsButton().click();
		cy.screenshot();
		postsEditPage.createPost(postTitle, postContent, {date: publishDate, time: publishTime});
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');
		postsPage.scheduledPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');

		cy.wait(1000);

		homePage.load().screenshot();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('not.exist');
		cy.screenshot();
	});

	// ESC4 - F1
	it('should create a valid post and change the access to members only (a-priori)', () => {
		cy.fixture('data-pool').then(({posts}) => {
			const post = Math.floor(Math.random() * (posts.valid.length));
			const postTitle = posts.valid[post].title;
			const postContent = posts.valid[post].content.content;
			dashboardPage.postsOption().click();
			cy.wait(1000).screenshot();
			postsPage.newPostsButton().click();
			cy.screenshot();
			cy.wait(1000);
			postsEditPage.settingsButton().click();
			postsEditPage.settingsPostAccessSelect().select('members');
			cy.wait(500);
			postsEditPage.settingsButton().click();

			postsEditPage.createPost(postTitle, postContent, true);
			cy.wait(1000);

			postsPage.load().screenshot();

			postsPage.publishedPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('be.visible');
			cy.wait(1000);
			postsPage.draftPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('not.exist');

			cy.wait(1000);

			homePage.load().screenshot();

			cy.wait(1000);

			homePage.feedContainer().contains(postTitle).should('be.visible').click();

			cy.fixture('messages').then(({subscribersOnly}) => {
				postDetailPage
					.contentContainer()
					.contains(subscribersOnly)
					.should('be.visible');
				postDetailPage
					.contentContainer()
					.contains(postContent)
					.should('not.exist');
			});
			cy.screenshot();
		});
	});

	it('should create an invalid post with missing keys and change the access to members only (a-priori)', () => {
		cy.fixture('data-pool').then(({posts}) => {
			const post = Math.floor(Math.random() * (posts.invalid.postsWithMissingKeys.length));
			const postTitle = posts.valid[post].title;
			const postContent = posts.valid[post].content.content;
			dashboardPage.postsOption().click();
			cy.wait(1000).screenshot();
			postsPage.newPostsButton().click();
			cy.screenshot();
			cy.wait(1000);
			postsEditPage.settingsButton().click();
			postsEditPage.settingsPostAccessSelect().select('members');
			cy.wait(500);
			postsEditPage.settingsButton().click();

			postsEditPage.createPost(postTitle, postContent, true);
			cy.wait(1000);

			postsPage.load().screenshot();

			postsPage.publishedPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('be.visible');
			cy.wait(1000);
			postsPage.draftPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('not.exist');

			cy.wait(1000);

			homePage.load().screenshot();

			cy.wait(1000);

			homePage.feedContainer().contains(postTitle).should('be.visible').click();

			cy.fixture('messages').then(({subscribersOnly}) => {
				postDetailPage
					.contentContainer()
					.contains(subscribersOnly)
					.should('be.visible');
				postDetailPage
					.contentContainer()
					.contains(postContent)
					.should('not.exist');
			});
			cy.screenshot();
		});
	});

	it('should create a valid post and change the access to members only (pseudo-aleatorio)', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const randomPosts = generateManyValidPosts(100);
		const randomPost = Math.floor(Math.random() * (randomPosts.length));
		const postTitle = randomPosts[randomPost].title;
		// @ts-ignore
		const postContent = randomPosts[randomPost].content.content; // si no accedo el content de esta manera, cypress me genera error.

		postsPage.newPostsButton().click();
		cy.screenshot();
		cy.wait(1000);
		postsEditPage.settingsButton().click();
		postsEditPage.settingsPostAccessSelect().select('members');
		cy.wait(500);
		postsEditPage.settingsButton().click();

		postsEditPage.createPost(postTitle, postContent, true);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');

		cy.wait(1000);

		homePage.load().screenshot();

		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('be.visible').click();

		cy.fixture('messages').then(({subscribersOnly}) => {
			postDetailPage
				.contentContainer()
				.contains(subscribersOnly)
				.should('be.visible');
			postDetailPage
				.contentContainer()
				.contains(postContent)
				.should('not.exist');
		});
		cy.screenshot();
	});

	it('should create an invalid post with invalid types and change the access to members only (pseudo-aleatorio)', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const randomPosts = generateManyInvalidPosts().postWithInvalidTypesPerField;
		const randomPost = Math.floor(Math.random() * (randomPosts.length));
		const postTitle = randomPosts[randomPost].title.toString();
		// @ts-ignore
		const postContent = randomPosts[randomPost].content.content; // si no accedo el content de esta manera, cypress me genera error.

		postsPage.newPostsButton().click();
		cy.screenshot();
		cy.wait(1000);
		postsEditPage.settingsButton().click();
		postsEditPage.settingsPostAccessSelect().select('members');
		cy.wait(500);
		postsEditPage.settingsButton().click();

		postsEditPage.createPost(postTitle, postContent, true);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');

		cy.wait(1000);

		homePage.load().screenshot();

		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('be.visible').click();

		cy.fixture('messages').then(({subscribersOnly}) => {
			postDetailPage
				.contentContainer()
				.contains(subscribersOnly)
				.should('be.visible');
			postDetailPage
				.contentContainer()
				.contains(postContent)
				.should('not.exist');
		});
		cy.screenshot();
	});

	it('should create an invalid post with border cases and change the access to members only (aleatorio)', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const randomPosts = generateManyInvalidPosts().postsWithBorderCases;
		const randomPost = Math.floor(Math.random() * (randomPosts.length));
		const postTitle = randomPosts[randomPost].title.toString();
		// @ts-ignore
		const postContent = randomPosts[randomPost].content.content; // si no accedo el content de esta manera, cypress me genera error.

		postsPage.newPostsButton().click();
		cy.screenshot();
		cy.wait(1000);
		postsEditPage.settingsButton().click();
		postsEditPage.settingsPostAccessSelect().select('members');
		cy.wait(500);
		postsEditPage.settingsButton().click();

		postsEditPage.createPost(postTitle, postContent, true);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');

		cy.wait(1000);

		homePage.load().screenshot();

		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('be.visible').click();

		cy.fixture('messages').then(({subscribersOnly}) => {
			postDetailPage
				.contentContainer()
				.contains(subscribersOnly)
				.should('be.visible');
			postDetailPage
				.contentContainer()
				.contains(postContent)
				.should('not.exist');
		});
		cy.screenshot();
	});

	it('should create a valid post and change the access to members only (aleatorio)', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const postTitle = faker.lorem.words();
		const postContent = faker.lorem.paragraphs();
		postsPage.newPostsButton().click();
		cy.screenshot();
		cy.wait(1000);
		postsEditPage.settingsButton().click();
		postsEditPage.settingsPostAccessSelect().select('members');
		cy.wait(500);
		postsEditPage.settingsButton().click();

		postsEditPage.createPost(postTitle, postContent, true);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');

		cy.wait(1000);

		homePage.load().screenshot();

		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('be.visible').click();

		cy.fixture('messages').then(({subscribersOnly}) => {
			postDetailPage
				.contentContainer()
				.contains(subscribersOnly)
				.should('be.visible');
			postDetailPage
				.contentContainer()
				.contains(postContent)
				.should('not.exist');
		});
		cy.screenshot();
	});

	// ESC5 - F1
	it('should create a valid post and change the access to paid members only (a-priori)', () => {
		cy.fixture('data-pool').then(({posts}) => {
			const post = Math.floor(Math.random() * (posts.valid.length));
			const postTitle = posts.valid[post].title;
			const postContent = posts.valid[post].content.content;
			dashboardPage.postsOption().click();
			cy.wait(1000).screenshot();
			postsPage.newPostsButton().click();
			cy.screenshot();
			cy.wait(1000);
			postsEditPage.settingsButton().click();
			postsEditPage.settingsPostAccessSelect().select('paid');
			cy.wait(500);
			postsEditPage.settingsButton().click();

			postsEditPage.createPost(postTitle, postContent, true);
			cy.wait(1000);

			postsPage.load().screenshot();

			postsPage.publishedPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('be.visible');
			cy.wait(1000);
			postsPage.draftPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('not.exist');

			cy.wait(1000);

			homePage.load().screenshot();

			cy.wait(1000);

			homePage.feedContainer().contains(postTitle).should('be.visible').click();

			cy.fixture('messages').then(({paidSubscribersOnly}) => {
				postDetailPage
					.contentContainer()
					.contains(paidSubscribersOnly)
					.should('be.visible');
				postDetailPage
					.contentContainer()
					.contains(postContent)
					.should('not.exist');
			});
			cy.screenshot();
		});
	});

	it('should create an invalid post and change the access to paid members only (a-priori)', () => {
		cy.fixture('data-pool').then(({posts}) => {
			const post = Math.floor(Math.random() * (posts.invalid.postsWithMissingKeys.length));
			const postTitle = posts.valid[post].title;
			const postContent = posts.valid[post].content.content;
			dashboardPage.postsOption().click();
			cy.wait(1000).screenshot();
			postsPage.newPostsButton().click();
			cy.screenshot();
			cy.wait(1000);
			postsEditPage.settingsButton().click();
			postsEditPage.settingsPostAccessSelect().select('paid');
			cy.wait(500);
			postsEditPage.settingsButton().click();

			postsEditPage.createPost(postTitle, postContent, true);
			cy.wait(1000);

			postsPage.load().screenshot();

			postsPage.publishedPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('be.visible');
			cy.wait(1000);
			postsPage.draftPostsOption().click();
			postsPage
				.postListContainer()
				.screenshot()
				.contains(postTitle)
				.should('not.exist');

			cy.wait(1000);

			homePage.load().screenshot();

			cy.wait(1000);

			homePage.feedContainer().contains(postTitle).should('be.visible').click();

			cy.fixture('messages').then(({paidSubscribersOnly}) => {
				postDetailPage
					.contentContainer()
					.contains(paidSubscribersOnly)
					.should('be.visible');
				postDetailPage
					.contentContainer()
					.contains(postContent)
					.should('not.exist');
			});
			cy.screenshot();
		});
	});

	it('should create a valid post and change the access to paid members only (pseudo-aleatorio)', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const randomPosts = generateManyValidPosts(100);
		const randomPost = Math.floor(Math.random() * (randomPosts.length));
		const postTitle = randomPosts[randomPost].title;
		// @ts-ignore
		const postContent = randomPosts[randomPost].content.content; // si no accedo el content de esta manera, cypress me genera error.

		postsPage.newPostsButton().click();
		cy.screenshot();
		cy.wait(1000);
		postsEditPage.settingsButton().click();
		postsEditPage.settingsPostAccessSelect().select('paid');
		cy.wait(500);
		postsEditPage.settingsButton().click();

		postsEditPage.createPost(postTitle, postContent, true);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');

		cy.wait(1000);

		homePage.load().screenshot();

		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('be.visible').click();

		cy.fixture('messages').then(({paidSubscribersOnly}) => {
			postDetailPage
				.contentContainer()
				.contains(paidSubscribersOnly)
				.should('be.visible');
			postDetailPage
				.contentContainer()
				.contains(postContent)
				.should('not.exist');
		});
		cy.screenshot();
	});

	it('should create an invalid post with invalid types and change the access to paid members only (pseudo-aleatorio)', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const randomPosts = generateManyInvalidPosts().postWithInvalidTypesPerField;
		const randomPost = Math.floor(Math.random() * (randomPosts.length));
		const postTitle = randomPosts[randomPost].title.toString();
		// @ts-ignore
		const postContent = randomPosts[randomPost].content.content; // si no accedo el content de esta manera, cypress me genera error.

		postsPage.newPostsButton().click();
		cy.screenshot();
		cy.wait(1000);
		postsEditPage.settingsButton().click();
		postsEditPage.settingsPostAccessSelect().select('paid');
		cy.wait(500);
		postsEditPage.settingsButton().click();

		postsEditPage.createPost(postTitle, postContent, true);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');

		cy.wait(1000);

		homePage.load().screenshot();

		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('be.visible').click();

		cy.fixture('messages').then(({paidSubscribersOnly}) => {
			postDetailPage
				.contentContainer()
				.contains(paidSubscribersOnly)
				.should('be.visible');
			postDetailPage
				.contentContainer()
				.contains(postContent)
				.should('not.exist');
		});
		cy.screenshot();
	});

	it('should create an invalid post with border cases and change the access to paid members only (pseudo-aleatorio)', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const randomPosts = generateManyInvalidPosts().postsWithBorderCases;
		const randomPost = Math.floor(Math.random() * (randomPosts.length));
		const postTitle = randomPosts[randomPost].title.toString();
		// @ts-ignore
		const postContent = randomPosts[randomPost].content.content; // si no accedo el content de esta manera, cypress me genera error.

		postsPage.newPostsButton().click();
		cy.screenshot();
		cy.wait(1000);
		postsEditPage.settingsButton().click();
		postsEditPage.settingsPostAccessSelect().select('paid');
		cy.wait(500);
		postsEditPage.settingsButton().click();

		postsEditPage.createPost(postTitle, postContent, true);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');

		cy.wait(1000);

		homePage.load().screenshot();

		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('be.visible').click();

		cy.fixture('messages').then(({paidSubscribersOnly}) => {
			postDetailPage
				.contentContainer()
				.contains(paidSubscribersOnly)
				.should('be.visible');
			postDetailPage
				.contentContainer()
				.contains(postContent)
				.should('not.exist');
		});
		cy.screenshot();
	});

	it('should create a valid post and change the access to paid members only (aleatorio)', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const postTitle = faker.lorem.words();
		const postContent = faker.lorem.paragraphs();
		postsPage.newPostsButton().click();
		cy.screenshot();
		cy.wait(1000);
		postsEditPage.settingsButton().click();
		postsEditPage.settingsPostAccessSelect().select('paid');
		cy.wait(500);
		postsEditPage.settingsButton().click();

		postsEditPage.createPost(postTitle, postContent, true);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');

		cy.wait(1000);

		homePage.load().screenshot();

		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('be.visible').click();

		cy.fixture('messages').then(({paidSubscribersOnly}) => {
			postDetailPage
				.contentContainer()
				.contains(paidSubscribersOnly)
				.should('be.visible');
			postDetailPage
				.contentContainer()
				.contains(postContent)
				.should('not.exist');
		});
		cy.screenshot();
	});
});

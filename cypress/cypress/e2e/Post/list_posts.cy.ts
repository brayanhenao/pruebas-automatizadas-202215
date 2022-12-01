import {adminPage, postsEditPage, postsPage} from '../../pages';

import {faker} from '@faker-js/faker';
import {generateManyInvalidPosts, generateManyValidPosts} from '../../helpers/mock';

describe('list_post', () => {
	context('filter', () => {
		let postTitle,
			postTitle2,
			postTitle3 = '';

		before(() => {
			cy.clearData();

			adminPage.load().screenshot();
			cy.fixture('admin').then(({user, password}) => {
				cy.log(user, password);
				adminPage.login(user, password);
				cy.wait(1000).screenshot();
			});

			adminPage.logout();
		});

		beforeEach(() => {
			adminPage.load().screenshot();
			cy.fixture('admin').then(({user, password}) => {
				cy.log(user, password);
				adminPage.login(user, password);
				cy.wait(1000).screenshot();
			});
		});

		// ESC1 - F2
		it('should list all created posts with valid data (a-priori)', () => {
			cy.fixture('data-pool').then(({posts}) => {
				// @ts-ignore
				const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * posts.valid.length)))];
				const postsToCreate = indexes.map((index) => posts.valid[index]);

				//draft
				postTitle = postsToCreate[0].title?.toString();
				const postContent = postsToCreate[0].content.content?.toString();
				postsPage.load().screenshot();
				cy.wait(1000);
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle, postContent);
				cy.wait(1000);

				//published
				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle2 = postsToCreate[1].title;
				const postContent2 = postsToCreate[1].content.content;
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle2, postContent2, true);
				cy.wait(1000);

				//scheduled
				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle3 = postsToCreate[2].title;
				const postContent3 = postsToCreate[2].content.content;
				postsPage.newPostsButton().click();
				const publishDate = postsToCreate[2].publishSettings.publishDate;
				const publishTime = postsToCreate[2].publishSettings.publishTime;
				postsEditPage.createPost(postTitle3, postContent3, {date: publishDate, time: publishTime});
				cy.wait(1000);

				postsPage.load().screenshot();
				postsPage.postListContainer().contains(postTitle).should('be.visible');
				postsPage.postListContainer().contains(postTitle2).should('be.visible');
				postsPage.postListContainer().contains(postTitle3).should('be.visible');

			});

		});

		it('should list all created posts with missing keys (a-priori)', () => {
			cy.fixture('data-pool').then(({posts}) => {
				// @ts-ignore
				const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * posts.invalid.postsWithMissingKeys.length)))];
				const postsToCreate = indexes.map((index) => posts.invalid.postsWithMissingKeys[index]);

				//draft
				postTitle = postsToCreate[0].title?.toString();
				const postContent = postsToCreate[0].content.content?.toString();
				postsPage.load().screenshot();
				cy.wait(1000);
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle, postContent);
				cy.wait(1000);

				//published
				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle2 = postsToCreate[1].title?.toString();
				const postContent2 = postsToCreate[1].content?.content.toString();
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle2, postContent2, true);
				cy.wait(1000);

				//scheduled
				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle3 = postsToCreate[2]?.title?.toString();
				const postContent3 = postsToCreate[2]?.content.content?.toString();
				postsPage.newPostsButton().click();
				const publishDate = postsToCreate[2]?.publishSettings.publishDate?.toString();
				const publishTime = postsToCreate[2]?.publishSettings.publishTime?.toString();
				postsEditPage.createPost(postTitle3, postContent3, {date: publishDate, time: publishTime});
				cy.wait(1000);

				postsPage.load().screenshot();
				postsPage.postListContainer().contains(postTitle).should('be.visible');
				postsPage.postListContainer().contains(postTitle2).should('be.visible');
				postsPage.postListContainer().contains(postTitle3).should('be.visible');

			});

		});

		it('should list all created posts with valid data (pseudo-aleatorio)', () => {
			const randomPosts = generateManyValidPosts(100);
			// @ts-ignore
			const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * randomPosts.length)))];
			const postsToCreate = indexes.map((index) => randomPosts[index]);
			//draft
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle = postsToCreate[0].title;
			// @ts-ignore
			const postContent = postsToCreate[0].content.content;
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle, postContent);
			cy.wait(1000);

			//published
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle2 = postsToCreate[1].title;
			// @ts-ignore
			const postContent2 = postsToCreate[1].content.content;
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle2, postContent2, true);
			cy.wait(1000);

			//scheduled
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle3 = postsToCreate[2].title;
			// @ts-ignore
			const postContent3 = postsToCreate[2].content.content;
			postsPage.newPostsButton().click();
			const publishDate = postsToCreate[2].publishSettings.publishDate;
			const publishTime = postsToCreate[2].publishSettings.publishTime;
			// @ts-ignore
			postsEditPage.createPost(postTitle3, postContent3, {date: publishDate, time: publishTime});
			cy.wait(1000);

			postsPage.load().screenshot();
			postsPage.postListContainer().contains(postTitle).should('be.visible');
			postsPage.postListContainer().contains(postTitle2).should('be.visible');
			postsPage.postListContainer().contains(postTitle3).should('be.visible');
		});

		it('should list all created posts with invalid data types (pseudo-aleatorio)', () => {
			const randomPosts = generateManyInvalidPosts(100).postWithInvalidTypesPerField;
			// @ts-ignore
			const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * randomPosts.length)))];
			const postsToCreate = indexes.map((index) => randomPosts[index]);
			//draft
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle = postsToCreate[0].title.toString();
			// @ts-ignore
			const postContent = postsToCreate[0].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle, postContent);
			cy.wait(1000);

			//published
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle2 = postsToCreate[1].title.toString();
			// @ts-ignore
			const postContent2 = postsToCreate[1].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle2, postContent2, true);
			cy.wait(1000);

			//scheduled
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle3 = postsToCreate[2].title.toString();
			// @ts-ignore
			const postContent3 = postsToCreate[2].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			const publishDate = postsToCreate[2].publishSettings?.publishDate;
			// @ts-ignore
			const publishTime = postsToCreate[2].publishSettings?.publishTime;
			// @ts-ignore
			postsEditPage.createPost(postTitle3, postContent3, {date: publishDate, time: publishTime});
			cy.wait(1000);

			postsPage.load().screenshot();
			postsPage.postListContainer().contains(postTitle).should('be.visible');
			postsPage.postListContainer().contains(postTitle2).should('be.visible');
			postsPage.postListContainer().contains(postTitle3).should('be.visible');
		});

		it('should list all created posts - invalid data with border cases (pseudo-aleatorio)', () => {
			const randomPosts = generateManyInvalidPosts(100).postsWithBorderCases;
			// @ts-ignore
			const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * randomPosts.length)))];
			const postsToCreate = indexes.map((index) => randomPosts[index]);
			//draft
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle = postsToCreate[0].title.toString();
			// @ts-ignore
			const postContent = postsToCreate[0].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle, postContent);
			cy.wait(1000);

			//published
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle2 = postsToCreate[1].title.toString();
			// @ts-ignore
			const postContent2 = postsToCreate[1].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle2, postContent2, true);
			cy.wait(1000);

			//scheduled
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle3 = postsToCreate[2].title.toString();
			// @ts-ignore
			const postContent3 = postsToCreate[2].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			const publishDate = postsToCreate[2].publishSettings?.publishDate;
			// @ts-ignore
			const publishTime = postsToCreate[2].publishSettings?.publishTime;
			// @ts-ignore
			postsEditPage.createPost(postTitle3, postContent3, {date: publishDate, time: publishTime});
			cy.wait(1000);

			postsPage.load().screenshot();
			postsPage.postListContainer().contains(postTitle).should('be.visible');
			postsPage.postListContainer().contains(postTitle2).should('be.visible');
			postsPage.postListContainer().contains(postTitle3).should('be.visible');
		});

		it('should list all created posts with valid data (aleatorio)', () => {
			//draft
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle = faker.lorem.words();
			const postContent = faker.lorem.paragraphs();
			postsPage.newPostsButton().click();
			postsEditPage.createPost(postTitle, postContent);
			cy.wait(1000);

			//published
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle2 = faker.lorem.words();
			const postContent2 = faker.lorem.paragraphs();
			postsPage.newPostsButton().click();
			postsEditPage.createPost(postTitle2, postContent2, true);
			cy.wait(1000);

			//scheduled
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle3 = faker.lorem.words();
			const postContent3 = faker.lorem.paragraphs();
			postsPage.newPostsButton().click();
			const publishDate = faker.date.soon().toISOString().substring(0,10);
			const publishTime = faker.date.soon().toISOString().substring(11,19);
			postsEditPage.createPost(postTitle3, postContent3, {date: publishDate, time: publishTime});
			cy.wait(1000);

			postsPage.load().screenshot();
			postsPage.postListContainer().contains(postTitle).should('be.visible');
			postsPage.postListContainer().contains(postTitle2).should('be.visible');
			postsPage.postListContainer().contains(postTitle3).should('be.visible');
		});

		// ESC2 - F2
		it('should filter posts by status "draft" with valid data (a-priori)', () => {
			cy.fixture('data-pool').then(({posts}) => {
				// @ts-ignore
				const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * posts.valid.length)))];
				const postsToCreate = indexes.map((index) => posts.valid[index]);

				//draft
				postTitle = postsToCreate[0].title?.toString();
				const postContent = postsToCreate[0].content.content?.toString();
				postsPage.load().screenshot();
				cy.wait(1000);
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle, postContent);
				cy.wait(1000);

				//published
				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle2 = postsToCreate[1].title;
				const postContent2 = postsToCreate[1].content.content;
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle2, postContent2, true);
				cy.wait(1000);

				//scheduled
				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle3 = postsToCreate[2].title;
				const postContent3 = postsToCreate[2].content.content;
				postsPage.newPostsButton().click();
				const publishDate = postsToCreate[2].publishSettings.publishDate;
				const publishTime = postsToCreate[2].publishSettings.publishTime;
				postsEditPage.createPost(postTitle3, postContent3, {date: publishDate, time: publishTime});
				cy.wait(1000);

				postsPage.load().screenshot();
				cy.wait(1000);
				postsPage.selectPostStatus().click();
				postsPage.draftPostOption().click();
				postsPage.postListContainer().contains(postTitle).should('be.visible');
				postsPage.postListContainer().contains(postTitle2).should('not.exist');
				postsPage.postListContainer().contains(postTitle3).should('not.exist');

			});

		});

		it('should filter posts by status "draft" with missing keys (a-priori)', () => {
			cy.fixture('data-pool').then(({posts}) => {
				// @ts-ignore
				const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * posts.invalid.postsWithMissingKeys.length)))];
				const postsToCreate = indexes.map((index) => posts.invalid.postsWithMissingKeys[index]);

				//draft
				postTitle = postsToCreate[0].title?.toString();
				const postContent = postsToCreate[0].content.content?.toString();
				postsPage.load().screenshot();
				cy.wait(1000);
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle, postContent);
				cy.wait(1000);

				//published
				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle2 = postsToCreate[1].title?.toString();
				const postContent2 = postsToCreate[1].content?.content.toString();
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle2, postContent2, true);
				cy.wait(1000);

				//scheduled
				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle3 = postsToCreate[2]?.title?.toString();
				const postContent3 = postsToCreate[2]?.content.content?.toString();
				postsPage.newPostsButton().click();
				const publishDate = postsToCreate[2]?.publishSettings.publishDate?.toString();
				const publishTime = postsToCreate[2]?.publishSettings.publishTime?.toString();
				postsEditPage.createPost(postTitle3, postContent3, {date: publishDate, time: publishTime});
				cy.wait(1000);

				postsPage.load().screenshot();
				cy.wait(1000);
				postsPage.selectPostStatus().click();
				postsPage.draftPostOption().click();
				postsPage.postListContainer().contains(postTitle).should('be.visible');
				postsPage.postListContainer().contains(postTitle2).should('not.exist');
				postsPage.postListContainer().contains(postTitle3).should('not.exist');

			});

		});

		it('should filter posts by status "draft" with valid data (pseudo-aleatorio)', () => {
			const randomPosts = generateManyValidPosts(100);
			// @ts-ignore
			const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * randomPosts.length)))];
			const postsToCreate = indexes.map((index) => randomPosts[index]);
			//draft
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle = postsToCreate[0].title;
			// @ts-ignore
			const postContent = postsToCreate[0].content.content;
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle, postContent);
			cy.wait(1000);

			//published
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle2 = postsToCreate[1].title;
			// @ts-ignore
			const postContent2 = postsToCreate[1].content.content;
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle2, postContent2, true);
			cy.wait(1000);

			//scheduled
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle3 = postsToCreate[2].title;
			// @ts-ignore
			const postContent3 = postsToCreate[2].content.content;
			postsPage.newPostsButton().click();
			const publishDate = postsToCreate[2].publishSettings.publishDate;
			const publishTime = postsToCreate[2].publishSettings.publishTime;
			// @ts-ignore
			postsEditPage.createPost(postTitle3, postContent3, {date: publishDate, time: publishTime});
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postsPage.selectPostStatus().click();
			postsPage.draftPostOption().click();
			postsPage.postListContainer().contains(postTitle).should('be.visible');
			postsPage.postListContainer().contains(postTitle2).should('not.exist');
			postsPage.postListContainer().contains(postTitle3).should('not.exist');
		});

		it('should filter posts by status "draft" with invalid data types (pseudo-aleatorio)', () => {
			const randomPosts = generateManyInvalidPosts(100).postWithInvalidTypesPerField;
			// @ts-ignore
			const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * randomPosts.length)))];
			const postsToCreate = indexes.map((index) => randomPosts[index]);
			//draft
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle = postsToCreate[0].title.toString();
			// @ts-ignore
			const postContent = postsToCreate[0].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle, postContent);
			cy.wait(1000);

			//published
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle2 = postsToCreate[1].title.toString();
			// @ts-ignore
			const postContent2 = postsToCreate[1].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle2, postContent2, true);
			cy.wait(1000);

			//scheduled
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle3 = postsToCreate[2].title.toString();
			// @ts-ignore
			const postContent3 = postsToCreate[2].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			const publishDate = postsToCreate[2].publishSettings?.publishDate;
			// @ts-ignore
			const publishTime = postsToCreate[2].publishSettings?.publishTime;
			// @ts-ignore
			postsEditPage.createPost(postTitle3, postContent3, {date: publishDate, time: publishTime});
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postsPage.selectPostStatus().click();
			postsPage.draftPostOption().click();
			postsPage.postListContainer().contains(postTitle).should('be.visible');
			postsPage.postListContainer().contains(postTitle2).should('not.exist');
			postsPage.postListContainer().contains(postTitle3).should('not.exist');
		});

		it('should filter posts by status "draft" - invalid data with border cases (pseudo-aleatorio)', () => {
			const randomPosts = generateManyInvalidPosts(100).postsWithBorderCases;
			// @ts-ignore
			const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * randomPosts.length)))];
			const postsToCreate = indexes.map((index) => randomPosts[index]);
			//draft
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle = postsToCreate[0].title.toString();
			// @ts-ignore
			const postContent = postsToCreate[0].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle, postContent);
			cy.wait(1000);

			//published
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle2 = postsToCreate[1].title.toString();
			// @ts-ignore
			const postContent2 = postsToCreate[1].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle2, postContent2, true);
			cy.wait(1000);

			//scheduled
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle3 = postsToCreate[2].title.toString();
			// @ts-ignore
			const postContent3 = postsToCreate[2].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			const publishDate = postsToCreate[2].publishSettings?.publishDate;
			// @ts-ignore
			const publishTime = postsToCreate[2].publishSettings?.publishTime;
			// @ts-ignore
			postsEditPage.createPost(postTitle3, postContent3, {date: publishDate, time: publishTime});
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postsPage.selectPostStatus().click();
			postsPage.draftPostOption().click();
			postsPage.postListContainer().contains(postTitle).should('be.visible');
			postsPage.postListContainer().contains(postTitle2).should('not.exist');
			postsPage.postListContainer().contains(postTitle3).should('not.exist');
		});

		it('should filter posts by status "draft" with valid data (aleatorio)', () => {
			//draft
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle = faker.lorem.words();
			const postContent = faker.lorem.paragraphs();
			postsPage.newPostsButton().click();
			postsEditPage.createPost(postTitle, postContent);
			cy.wait(1000);

			//published
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle2 = faker.lorem.words();
			const postContent2 = faker.lorem.paragraphs();
			postsPage.newPostsButton().click();
			postsEditPage.createPost(postTitle2, postContent2, true);
			cy.wait(1000);

			//scheduled
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle3 = faker.lorem.words();
			const postContent3 = faker.lorem.paragraphs();
			postsPage.newPostsButton().click();
			const publishDate = faker.date.soon().toISOString().substring(0,10);
			const publishTime = faker.date.soon().toISOString().substring(11,19);
			postsEditPage.createPost(postTitle3, postContent3, {date: publishDate, time: publishTime});
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postsPage.selectPostStatus().click();
			postsPage.draftPostOption().click();
			cy.wait(1000);
			postsPage.selectPostStatus().click();
			postsPage.draftPostOption().click();
			postsPage.postListContainer().contains(postTitle).should('be.visible');
			postsPage.postListContainer().contains(postTitle2).should('not.exist');
			postsPage.postListContainer().contains(postTitle3).should('not.exist');
		});
	});

	context('sort', () => {
		let postTitle,
			postTitle2,
			postTitle3 = '';

		before(() => {
			cy.clearData();

			adminPage.load().screenshot();
			cy.fixture('admin').then(({user, password}) => {
				cy.log(user, password);
				adminPage.login(user, password);
				cy.wait(1000).screenshot();
			});

			adminPage.logout();
		});

		beforeEach(() => {
			adminPage.load().screenshot();
			cy.fixture('admin').then(({user, password}) => {
				cy.log(user, password);
				adminPage.login(user, password);
				cy.wait(1000).screenshot();
			});
		});

		// ESC3 - F2
		it('should sort post by publish date  - oldest first, with valid data (a-priori)', () => {
			cy.fixture('data-pool').then(({posts}) => {
				// @ts-ignore
				const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * posts.valid.length)))];
				const postsToCreate = indexes.map((index) => posts.valid[index]);


				//published
				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle = postsToCreate[0].title;
				const postContent = postsToCreate[0].content.content;
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle, postContent, true);
				cy.wait(1000);

				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle2 = postsToCreate[1].title;
				const postContent2 = postsToCreate[1].content.content;
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle2, postContent2, true);
				cy.wait(1000);

				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle3 = postsToCreate[2].title;
				const postContent3 = postsToCreate[2].content.content;
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle3, postContent3, true);
				cy.wait(1000);

				postsPage.load().screenshot();
				cy.wait(1000);
				postsPage.selectSortDate().click();
				cy.screenshot();
				postsPage.oldestFirstOption().click();
				cy.screenshot();

				postsPage
					.postListContainer()
					.children()
					.each(($child, i) => {
						cy.wrap($child)
							.contains(i == 0 ? postTitle : i == 1 ? postTitle2 : postTitle3)
							.should('be.visible');
					});
				cy.screenshot();

			});

		});

		it('should sort post by publish date  - oldest first, with missing keys (a-priori)', () => {
			cy.fixture('data-pool').then(({posts}) => {
				// @ts-ignore
				const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * posts.invalid.postsWithMissingKeys.length)))];
				const postsToCreate = indexes.map((index) => posts.invalid.postsWithMissingKeys[index]);

				//published
				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle = postsToCreate[0].title?.toString();
				const postContent = postsToCreate[0].content?.content.toString();
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle, postContent, true);
				cy.wait(1000);

				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle2 = postsToCreate[1].title?.toString();
				const postContent2 = postsToCreate[1].content?.content.toString();
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle2, postContent2, true);
				cy.wait(1000);

				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle3 = postsToCreate[2].title?.toString();
				const postContent3 = postsToCreate[2].content?.content.toString();
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle3, postContent3, true);
				cy.wait(1000);

				postsPage.load().screenshot();
				cy.wait(1000);
				postsPage.selectSortDate().click();
				cy.screenshot();
				postsPage.oldestFirstOption().click();
				cy.screenshot();

				postsPage
					.postListContainer()
					.children()
					.each(($child, i) => {
						cy.wrap($child)
							.contains(i == 0 ? postTitle : i == 1 ? postTitle2 : postTitle3)
							.should('be.visible');
					});
				cy.screenshot();

			});

		});

		it('should sort post by publish date  - oldest first, with valid data (pseudo-aleatorio)', () => {
			const randomPosts = generateManyValidPosts(100);
			// @ts-ignore
			const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * randomPosts.length)))];
			const postsToCreate = indexes.map((index) => randomPosts[index]);

			//published
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle = postsToCreate[0].title;
			// @ts-ignore
			const postContent = postsToCreate[0].content.content;
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle1, postContent, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle2 = postsToCreate[1].title;
			// @ts-ignore
			const postContent2 = postsToCreate[1].content.content;
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle2, postContent2, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle3 = postsToCreate[2].title;
			// @ts-ignore
			const postContent3 = postsToCreate[2].content.content;
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle3, postContent3, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postsPage.selectSortDate().click();
			cy.screenshot();
			postsPage.oldestFirstOption().click();
			cy.screenshot();

			postsPage
				.postListContainer()
				.children()
				.each(($child, i) => {
					cy.wrap($child)
						.contains(i == 0 ? postTitle : i == 1 ? postTitle2 : postTitle3)
						.should('be.visible');
				});
			cy.screenshot();
		});

		it('should sort post by publish date  - oldest first, with invalid data types (pseudo-aleatorio)', () => {
			const randomPosts = generateManyInvalidPosts(100).postWithInvalidTypesPerField;
			// @ts-ignore
			const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * randomPosts.length)))];
			const postsToCreate = indexes.map((index) => randomPosts[index]);

			//published
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle = postsToCreate[0].title.toString();
			// @ts-ignore
			const postContent = postsToCreate[0].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle, postContent, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle2 = postsToCreate[1].title.toString();
			// @ts-ignore
			const postContent2 = postsToCreate[1].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle2, postContent2, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle3 = postsToCreate[2].title.toString();
			// @ts-ignore
			const postContent3 = postsToCreate[2].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle3, postContent3, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postsPage.selectSortDate().click();
			cy.screenshot();
			postsPage.oldestFirstOption().click();
			cy.screenshot();

			postsPage
				.postListContainer()
				.children()
				.each(($child, i) => {
					cy.wrap($child)
						.contains(i == 0 ? postTitle : i == 1 ? postTitle2 : postTitle3)
						.should('be.visible');
				});
			cy.screenshot();
		});

		it('should sort post by publish date  - oldest first, with invalid data - border cases (pseudo-aleatorio)', () => {
			const randomPosts = generateManyInvalidPosts(100).postsWithBorderCases;
			// @ts-ignore
			const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * randomPosts.length)))];
			const postsToCreate = indexes.map((index) => randomPosts[index]);

			//published
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle = postsToCreate[0].title.toString();
			// @ts-ignore
			const postContent = postsToCreate[0].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle, postContent, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle2 = postsToCreate[1].title.toString();
			// @ts-ignore
			const postContent2 = postsToCreate[1].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle2, postContent2, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle3 = postsToCreate[2].title.toString();
			// @ts-ignore
			const postContent3 = postsToCreate[2].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle3, postContent3, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postsPage.selectSortDate().click();
			cy.screenshot();
			postsPage.oldestFirstOption().click();
			cy.screenshot();

			postsPage
				.postListContainer()
				.children()
				.each(($child, i) => {
					cy.wrap($child)
						.contains(i == 0 ? postTitle : i == 1 ? postTitle2 : postTitle3)
						.should('be.visible');
				});
			cy.screenshot();
		});

		it('should sort post by publish date  - oldest first, with valid data (aleatorio)', () => {
			//published
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle = faker.lorem.words();
			const postContent = faker.lorem.paragraphs();
			postsPage.newPostsButton().click();
			postsEditPage.createPost(postTitle, postContent, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle2 = faker.lorem.words();
			const postContent2 = faker.lorem.paragraphs();
			postsPage.newPostsButton().click();
			postsEditPage.createPost(postTitle2, postContent2, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle3 = faker.lorem.words();
			const postContent3 = faker.lorem.paragraphs();
			postsPage.newPostsButton().click();
			postsEditPage.createPost(postTitle3, postContent3, true);
			cy.wait(1000);


			postsPage.load().screenshot();
			cy.wait(1000);
			postsPage.selectSortDate().click();
			cy.screenshot();
			postsPage.oldestFirstOption().click();
			cy.screenshot();

			postsPage
				.postListContainer()
				.children()
				.each(($child, i) => {
					cy.wrap($child)
						.contains(i == 0 ? postTitle : i == 1 ? postTitle2 : postTitle3)
						.should('be.visible');
				});
			cy.screenshot();
		});

		// ESC4 - F2
		it('should sort post by publish date  - newest first, with valid data (a-priori)', () => {
			cy.fixture('data-pool').then(({posts}) => {
				// @ts-ignore
				const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * posts.valid.length)))];
				const postsToCreate = indexes.map((index) => posts.valid[index]);


				//published
				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle = postsToCreate[0].title;
				const postContent = postsToCreate[0].content.content;
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle, postContent, true);
				cy.wait(1000);

				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle2 = postsToCreate[1].title;
				const postContent2 = postsToCreate[1].content.content;
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle2, postContent2, true);
				cy.wait(1000);

				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle3 = postsToCreate[2].title;
				const postContent3 = postsToCreate[2].content.content;
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle3, postContent3, true);
				cy.wait(1000);

				postsPage.load().screenshot();
				cy.wait(1000);
				postsPage.selectSortDate().click();
				cy.screenshot();
				postsPage.newestFirstOption().click();
				cy.screenshot();

				postsPage
					.postListContainer()
					.children()
					.each(($child, i) => {
						cy.wrap($child)
							.contains(i == 0 ? postTitle3 : i == 1 ? postTitle2 : postTitle)
							.should('be.visible');
					});
				cy.screenshot();

			});

		});

		it('should sort post by publish date  - newest first, with missing keys (a-priori)', () => {
			cy.fixture('data-pool').then(({posts}) => {
				// @ts-ignore
				const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * posts.invalid.postsWithMissingKeys.length)))];
				const postsToCreate = indexes.map((index) => posts.invalid.postsWithMissingKeys[index]);

				//published
				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle = postsToCreate[0].title?.toString();
				const postContent = postsToCreate[0].content?.content.toString();
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle, postContent, true);
				cy.wait(1000);

				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle2 = postsToCreate[1].title?.toString();
				const postContent2 = postsToCreate[1].content?.content.toString();
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle2, postContent2, true);
				cy.wait(1000);

				postsPage.load().screenshot();
				cy.wait(1000);
				postTitle3 = postsToCreate[2].title?.toString();
				const postContent3 = postsToCreate[2].content?.content.toString();
				postsPage.newPostsButton().click();
				postsEditPage.createPost(postTitle3, postContent3, true);
				cy.wait(1000);

				postsPage.load().screenshot();
				cy.wait(1000);
				postsPage.selectSortDate().click();
				cy.screenshot();
				postsPage.newestFirstOption().click();
				cy.screenshot();

				postsPage
					.postListContainer()
					.children()
					.each(($child, i) => {
						cy.wrap($child)
							.contains(i == 0 ? postTitle3 : i == 1 ? postTitle2 : postTitle)
							.should('be.visible');
					});
				cy.screenshot();

			});

		});

		it('should sort post by publish date  - newest first, with valid data (pseudo-aleatorio)', () => {
			const randomPosts = generateManyValidPosts(100);
			// @ts-ignore
			const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * randomPosts.length)))];
			const postsToCreate = indexes.map((index) => randomPosts[index]);

			//published
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle = postsToCreate[0].title;
			// @ts-ignore
			const postContent = postsToCreate[0].content.content;
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle1, postContent, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle2 = postsToCreate[1].title;
			// @ts-ignore
			const postContent2 = postsToCreate[1].content.content;
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle2, postContent2, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle3 = postsToCreate[2].title;
			// @ts-ignore
			const postContent3 = postsToCreate[2].content.content;
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle3, postContent3, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postsPage.selectSortDate().click();
			cy.screenshot();
			postsPage.newestFirstOption().click();
			cy.screenshot();

			postsPage
				.postListContainer()
				.children()
				.each(($child, i) => {
					cy.wrap($child)
						.contains(i == 0 ? postTitle3 : i == 1 ? postTitle2 : postTitle)
						.should('be.visible');
				});
			cy.screenshot();
		});

		it('should sort post by publish date  - newest first, with invalid data types (pseudo-aleatorio)', () => {
			const randomPosts = generateManyInvalidPosts(100).postWithInvalidTypesPerField;
			// @ts-ignore
			const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * randomPosts.length)))];
			const postsToCreate = indexes.map((index) => randomPosts[index]);

			//published
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle = postsToCreate[0].title.toString();
			// @ts-ignore
			const postContent = postsToCreate[0].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle, postContent, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle2 = postsToCreate[1].title.toString();
			// @ts-ignore
			const postContent2 = postsToCreate[1].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle2, postContent2, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle3 = postsToCreate[2].title.toString();
			// @ts-ignore
			const postContent3 = postsToCreate[2].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle3, postContent3, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postsPage.selectSortDate().click();
			cy.screenshot();
			postsPage.newestFirstOption().click();
			cy.screenshot();

			postsPage
				.postListContainer()
				.children()
				.each(($child, i) => {
					cy.wrap($child)
						.contains(i == 0 ? postTitle3 : i == 1 ? postTitle2 : postTitle)
						.should('be.visible');
				});
			cy.screenshot();
		});

		it('should sort post by publish date  - newest first, with invalid data - border cases (pseudo-aleatorio)', () => {
			const randomPosts = generateManyInvalidPosts(100).postsWithBorderCases;
			// @ts-ignore
			const indexes = [...new Set([...Array(3)].map(() => Math.floor(Math.random() * randomPosts.length)))];
			const postsToCreate = indexes.map((index) => randomPosts[index]);

			//published
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle = postsToCreate[0].title.toString();
			// @ts-ignore
			const postContent = postsToCreate[0].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle, postContent, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle2 = postsToCreate[1].title.toString();
			// @ts-ignore
			const postContent2 = postsToCreate[1].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle2, postContent2, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle3 = postsToCreate[2].title.toString();
			// @ts-ignore
			const postContent3 = postsToCreate[2].content.content.toString();
			postsPage.newPostsButton().click();
			// @ts-ignore
			postsEditPage.createPost(postTitle3, postContent3, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postsPage.selectSortDate().click();
			cy.screenshot();
			postsPage.newestFirstOption().click();
			cy.screenshot();

			postsPage
				.postListContainer()
				.children()
				.each(($child, i) => {
					cy.wrap($child)
						.contains(i == 0 ? postTitle3 : i == 1 ? postTitle2 : postTitle)
						.should('be.visible');
				});
			cy.screenshot();
		});

		it('should sort post by publish date  - newest first, with valid data (aleatorio)', () => {
			//published
			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle = faker.lorem.words();
			const postContent = faker.lorem.paragraphs();
			postsPage.newPostsButton().click();
			postsEditPage.createPost(postTitle, postContent, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle2 = faker.lorem.words();
			const postContent2 = faker.lorem.paragraphs();
			postsPage.newPostsButton().click();
			postsEditPage.createPost(postTitle2, postContent2, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postTitle3 = faker.lorem.words();
			const postContent3 = faker.lorem.paragraphs();
			postsPage.newPostsButton().click();
			postsEditPage.createPost(postTitle3, postContent3, true);
			cy.wait(1000);

			postsPage.load().screenshot();
			cy.wait(1000);
			postsPage.selectSortDate().click();
			cy.screenshot();
			postsPage.newestFirstOption().click();
			cy.screenshot();

			postsPage
				.postListContainer()
				.children()
				.each(($child, i) => {
					cy.wrap($child)
						.contains(i == 0 ? postTitle3 : i == 1 ? postTitle2 : postTitle)
						.should('be.visible');
				});
			cy.screenshot();
		});
	});
});

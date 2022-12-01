import {adminPage, membersPage, membersEditPage} from '../../pages';
import {
	generateInvalidMember,
	generateManyInvalidMembers,
	generateValidMember,
} from '../../helpers/mock';

import {faker} from '@faker-js/faker';
import {Invalid, Member} from '../../helpers/interfaces';
faker.seed(666); //set seed to keep data consistent

describe('create_member', () => {
	let memberName,
		memberName2,
		memberName3 = '';

	let memberEmail = '';
	before(cy.clearData);

	beforeEach(() => {
		adminPage.load().screenshot();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000).screenshot();
		});
		// create a member
		membersPage.load().screenshot();
		membersPage.newMemberButton().click();
	});

	//SC1

	it('should list created members (aleatorio)', () => {
		memberName = faker.name.firstName();
		let lastName = faker.name.lastName();
		memberEmail = faker.internet.email(memberName, lastName);

		membersEditPage.nameInput().type(`${memberName} ${lastName}`).screenshot();
		membersEditPage.emailInput().type(memberEmail).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		memberName2 = faker.name.firstName();
		lastName = faker.name.lastName();

		membersEditPage.nameInput().type(`${memberName2} ${lastName}`).screenshot();
		membersEditPage
			.emailInput()
			.type(faker.internet.email(memberName2, lastName))
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		memberName3 = faker.name.firstName();
		lastName = faker.name.lastName();

		membersEditPage.nameInput().type(`${memberName3} ${lastName}`).screenshot();
		membersEditPage
			.emailInput()
			.type(faker.internet.email(memberName3, lastName))
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('be.visible');
		cy.screenshot();
	});

	it('should list created members (a-priori)', () => {
		cy.fixture('data-pool').then(({members}) => {
			const memberObj: Member =
				members.valid[Math.floor(Math.random() * members.valid.length)];
			memberName = memberObj.name;
			let lastName = memberObj.name;
			memberEmail = memberObj.email;

			membersEditPage.nameInput().type(memberName).screenshot();
			membersEditPage.emailInput().type(memberEmail).screenshot();
			membersEditPage.subscribeToggle().click().screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj2: Member =
				members.valid[Math.floor(Math.random() * members.valid.length)];

			memberName2 = memberObj2.name;
			lastName = memberObj2.name;

			membersEditPage.nameInput().type(memberName2).screenshot();
			membersEditPage.emailInput().type(memberObj2.email).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj3: Member =
				members.valid[Math.floor(Math.random() * members.valid.length)];
			memberName3 = memberObj3.name;
			lastName = memberObj3.name;

			membersEditPage.nameInput().type(memberName3).screenshot();
			membersEditPage.emailInput().type(memberObj3.email).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			/////pasos a desarrollar/////////

			membersPage.load().screenshot();
			cy.wait(1000);
			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName)
				.should('be.visible');
			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName2)
				.should('be.visible');
			cy.screenshot();
		});
	});

	it('should list created members with invalid data (a-priori)', () => {
		cy.fixture('data-pool').then(({members}) => {
			const memberObj: Member =
				members.invalid.membersWithBorderCases[
					Math.floor(
						Math.random() * members.invalid.membersWithBorderCases.length
					)
				];
			memberName = memberObj.name;
			let lastName = memberObj.name;
			memberEmail = memberObj.email;

			membersEditPage.nameInput().type(memberName).screenshot();
			membersEditPage.emailInput().type(memberEmail).screenshot();
			membersEditPage.subscribeToggle().click().screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj2: Member =
				members.invalid.membersWithBorderCases[
					Math.floor(
						Math.random() * members.invalid.membersWithBorderCases.length
					)
				];

			memberName2 = memberObj2.name;
			lastName = memberObj2.name;

			membersEditPage.nameInput().type(memberName2).screenshot();
			membersEditPage.emailInput().type(memberObj2.email).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj3: Member =
				members.invalid.membersWithBorderCases[
					Math.floor(
						Math.random() * members.invalid.membersWithBorderCases.length
					)
				];

			memberName3 = memberObj3.name;
			lastName = memberObj3.name;

			membersEditPage.nameInput().type(memberName3).screenshot();
			membersEditPage.emailInput().type(memberObj3.email).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			/////pasos a desarrollar/////////

			membersPage.load().screenshot();
			cy.wait(1000);
			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName)
				.should('be.visible');
			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName2)
				.should('be.visible');
			cy.screenshot();
		});
	});

	it('should list created members (pseudo-aleatorio)', () => {
		const memberObj: Member = generateValidMember();
		memberName = memberObj.name;
		let lastName = memberObj.name;
		memberEmail = memberObj.email;

		membersEditPage.nameInput().type(memberName).screenshot();
		membersEditPage.emailInput().type(memberEmail).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj2: Member = generateValidMember();

		memberName2 = memberObj2.name;
		lastName = memberObj2.name;

		membersEditPage.nameInput().type(memberName2).screenshot();
		membersEditPage.emailInput().type(memberObj2.email).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj3: Member = generateValidMember();

		memberName3 = memberObj3.name;
		lastName = memberObj3.name;

		membersEditPage.nameInput().type(memberName3).screenshot();
		membersEditPage.emailInput().type(memberObj3.email).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('be.visible');
		cy.screenshot();
	});

	it('should list created members with invalid data (pseudo-aleatorio)', () => {
		const memberObj: Invalid<Member> = generateInvalidMember();
		memberName = memberObj.name;
		let lastName = memberObj.name;
		const memberEmail = memberObj.email;

		membersEditPage.nameInput().type(memberName).screenshot();
		membersEditPage.emailInput().type(memberEmail?.toString()).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj2: Invalid<Member> = generateInvalidMember();

		memberName2 = memberObj2.name;
		lastName = memberObj2.name;

		membersEditPage.nameInput().type(memberName2).screenshot();
		membersEditPage
			.emailInput()
			.type(memberObj2.email?.toString())
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj3: Invalid<Member> = generateInvalidMember();

		let memberName3 = memberObj3.name;
		lastName = memberObj3.name;

		membersEditPage.nameInput().type(memberName3?.toString()).screenshot();
		membersEditPage
			.emailInput()
			.type(memberObj3.email?.toString())
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('be.visible');
		cy.screenshot();
	});

	it('should list created members with invalid types (pseudo-aleatorio)', () => {
		const membersWithInvalidTypesPerField =
			generateManyInvalidMembers(10).membersWithInvalidTypesPerField;
		const memberObj: Invalid<Member> =
			membersWithInvalidTypesPerField[
				Math.floor(Math.random() * membersWithInvalidTypesPerField.length)
			];
		memberName = memberObj.name;
		let lastName = memberObj.name;
		const memberEmail = memberObj.email;

		membersEditPage.nameInput().type(memberName).screenshot();
		membersEditPage.emailInput().type(memberEmail?.toString()).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const membersWithInvalidTypesPerField2 =
			generateManyInvalidMembers(11).membersWithInvalidTypesPerField;
		const memberObj2: Invalid<Member> =
			membersWithInvalidTypesPerField2[
				Math.floor(Math.random() * membersWithInvalidTypesPerField2.length)
			];

		memberName2 = memberObj2.name;
		lastName = memberObj2.name;

		membersEditPage.nameInput().type(memberName2).screenshot();
		membersEditPage
			.emailInput()
			.type(memberObj2.email?.toString())
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const membersWithInvalidTypesPerField3 =
			generateManyInvalidMembers(12).membersWithInvalidTypesPerField;
		const memberObj3: Invalid<Member> =
			membersWithInvalidTypesPerField3[
				Math.floor(Math.random() * membersWithInvalidTypesPerField3.length)
			];

		let memberName3 = memberObj3.name;
		lastName = memberObj3.name;

		membersEditPage.nameInput().type(memberName3?.toString()).screenshot();
		membersEditPage
			.emailInput()
			.type(memberObj3.email?.toString())
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('be.visible');
		cy.screenshot();
	});

	//SC2;
	it('should filter member by subscribed to newsletter (aleatorio)', () => {
		memberName = faker.name.firstName();
		let lastName = faker.name.lastName();
		memberEmail = faker.internet.email(memberName, lastName);

		membersEditPage.nameInput().type(`${memberName} ${lastName}`).screenshot();
		membersEditPage.emailInput().type(memberEmail).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		memberName2 = faker.name.firstName();
		lastName = faker.name.lastName();

		membersEditPage.nameInput().type(`${memberName2} ${lastName}`).screenshot();
		membersEditPage
			.emailInput()
			.type(faker.internet.email(memberName2, lastName))
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		memberName3 = faker.name.firstName();
		lastName = faker.name.lastName();

		membersEditPage.nameInput().type(`${memberName3} ${lastName}`).screenshot();
		membersEditPage
			.emailInput()
			.type(faker.internet.email(memberName3, lastName))
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('subscribed');
		membersPage.filterParameterValueSelect().screenshot().select('true');

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('not.exist');
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('be.visible');
		cy.screenshot();
	});

	it('should filter member by subscribed to newsletter (a-priori)', () => {
		cy.fixture('data-pool').then(({members}) => {
			const memberObj: Member =
				members.valid[Math.floor(Math.random() * members.valid.length)];
			memberName = memberObj.name;
			let lastName = memberObj.name;
			memberEmail = memberObj.email;

			membersEditPage.nameInput().type(memberName).screenshot();
			membersEditPage.emailInput().type(memberEmail).screenshot();
			membersEditPage.subscribeToggle().click().screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj2: Member =
				members.valid[Math.floor(Math.random() * members.valid.length)];

			memberName2 = memberObj2.name;
			lastName = memberObj2.name;

			membersEditPage.nameInput().type(memberName2).screenshot();
			membersEditPage.emailInput().type(memberObj2.email).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj3: Member =
				members.valid[Math.floor(Math.random() * members.valid.length)];
			memberName3 = memberObj3.name;
			lastName = memberObj3.name;

			membersEditPage.nameInput().type(memberName3).screenshot();
			membersEditPage.emailInput().type(memberObj3.email).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			/////pasos a desarrollar/////////

			membersPage.load().screenshot();
			cy.wait(1000);
			membersPage.filterButton().click().screenshot();
			cy.wait(500);
			membersPage.filterParameterSelect().screenshot().select('subscribed');
			membersPage.filterParameterValueSelect().screenshot().select('true');

			membersPage.filterApplyButton().click();
			cy.wait(1000);
			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName)
				.should('not.exist');
			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName2)
				.should('be.visible');
			cy.screenshot();
		});
	});

	it('should filter member by subscribed to newsletter with invalid data (a-priori)', () => {
		cy.fixture('data-pool').then(({members}) => {
			const memberObj: Member =
				members.invalid.membersWithBorderCases[
					Math.floor(
						Math.random() * members.invalid.membersWithBorderCases.length
					)
				];
			memberName = memberObj.name;
			let lastName = memberObj.name;
			memberEmail = memberObj.email;

			membersEditPage.nameInput().type(memberName).screenshot();
			membersEditPage.emailInput().type(memberEmail).screenshot();
			membersEditPage.subscribeToggle().click().screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj2: Member =
				members.invalid.membersWithBorderCases[
					Math.floor(
						Math.random() * members.invalid.membersWithBorderCases.length
					)
				];

			memberName2 = memberObj2.name;
			lastName = memberObj2.name;

			membersEditPage.nameInput().type(memberName2).screenshot();
			membersEditPage.emailInput().type(memberObj2.email).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj3: Member =
				members.invalid.membersWithBorderCases[
					Math.floor(
						Math.random() * members.invalid.membersWithBorderCases.length
					)
				];
			memberName3 = memberObj3.name;
			lastName = memberObj3.name;

			membersEditPage.nameInput().type(memberName3).screenshot();
			membersEditPage.emailInput().type(memberObj3.email).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			/////pasos a desarrollar/////////

			membersPage.load().screenshot();
			cy.wait(1000);
			membersPage.filterButton().click().screenshot();
			cy.wait(500);
			membersPage.filterParameterSelect().screenshot().select('subscribed');
			membersPage.filterParameterValueSelect().screenshot().select('true');

			membersPage.filterApplyButton().click();
			cy.wait(1000);
			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName)
				.should('not.exist');
			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName2)
				.should('be.visible');
			cy.screenshot();
		});
	});

	it('should filter member by subscribed to newsletter (pseudo-aleatorio)', () => {
		const memberObj: Member = generateValidMember();
		memberName = memberObj.name;
		let lastName = memberObj.name;
		memberEmail = memberObj.email;

		membersEditPage.nameInput().type(memberName).screenshot();
		membersEditPage.emailInput().type(memberEmail).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj2: Member = generateValidMember();

		memberName2 = memberObj2.name;
		lastName = memberObj2.name;

		membersEditPage.nameInput().type(memberName2).screenshot();
		membersEditPage.emailInput().type(memberObj2.email).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj3: Member = generateValidMember();

		memberName3 = memberObj3.name;
		lastName = memberObj3.name;

		membersEditPage.nameInput().type(memberName3).screenshot();
		membersEditPage.emailInput().type(memberObj3.email).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('subscribed');
		membersPage.filterParameterValueSelect().screenshot().select('true');

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('not.exist');
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('be.visible');
		cy.screenshot();
	});

	it('should filter member by subscribed to newsletter (pseudo-aleatorio)', () => {
		const memberObj: Invalid<Member> = generateInvalidMember();
		memberName = memberObj.name;
		let lastName = memberObj.name;
		const memberEmail = memberObj.email;

		membersEditPage.nameInput().type(memberName).screenshot();
		membersEditPage.emailInput().type(memberEmail?.toString()).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj2: Invalid<Member> = generateInvalidMember();
		memberName2 = memberObj2.name;
		lastName = memberObj2.name;

		membersEditPage.nameInput().type(memberName2).screenshot();
		membersEditPage
			.emailInput()
			.type(memberObj2.email?.toString())
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj3: Invalid<Member> = generateInvalidMember();
		let memberName3 = memberObj3.name;
		lastName = memberObj3.name;

		membersEditPage.nameInput().type(memberName3?.toString()).screenshot();
		membersEditPage
			.emailInput()
			.type(memberObj3.email?.toString())
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('subscribed');
		membersPage.filterParameterValueSelect().screenshot().select('true');

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('not.exist');
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('be.visible');
		cy.screenshot();
	});

	it('should filter member by subscribed to newsletter with invalid types (pseudo-aleatorio)', () => {
		const membersWithInvalidTypesPerField =
			generateManyInvalidMembers(10).membersWithInvalidTypesPerField;
		const memberObj: Invalid<Member> =
			membersWithInvalidTypesPerField[
				Math.floor(Math.random() * membersWithInvalidTypesPerField.length)
			];
		memberName = memberObj.name;
		let lastName = memberObj.name;
		const memberEmail = memberObj.email;

		membersEditPage.nameInput().type(memberName).screenshot();
		membersEditPage.emailInput().type(memberEmail?.toString()).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const membersWithInvalidTypesPerField2 =
			generateManyInvalidMembers(11).membersWithInvalidTypesPerField;
		const memberObj2: Invalid<Member> =
			membersWithInvalidTypesPerField2[
				Math.floor(Math.random() * membersWithInvalidTypesPerField2.length)
			];
		memberName2 = memberObj2.name;
		lastName = memberObj2.name;

		membersEditPage.nameInput().type(memberName2).screenshot();
		membersEditPage
			.emailInput()
			.type(memberObj2.email?.toString())
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const membersWithInvalidTypesPerField3 =
			generateManyInvalidMembers(12).membersWithInvalidTypesPerField;
		const memberObj3: Invalid<Member> =
			membersWithInvalidTypesPerField3[
				Math.floor(Math.random() * membersWithInvalidTypesPerField3.length)
			];
		let memberName3 = memberObj3.name;
		lastName = memberObj3.name;

		membersEditPage.nameInput().type(memberName3?.toString()).screenshot();
		membersEditPage
			.emailInput()
			.type(memberObj3.email?.toString())
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('subscribed');
		membersPage.filterParameterValueSelect().screenshot().select('true');

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('not.exist');
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('be.visible');
		cy.screenshot();
	});

	//SC3
	it('should filter member by not subscribed to newsletter (aleatory)', () => {
		memberName = faker.name.firstName();
		let lastName = faker.name.lastName();
		memberEmail = faker.internet.email(memberName, lastName);

		membersEditPage.nameInput().type(`${memberName} ${lastName}`).screenshot();
		membersEditPage.emailInput().type(memberEmail).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		memberName2 = faker.name.firstName();
		lastName = faker.name.lastName();

		membersEditPage.nameInput().type(`${memberName2} ${lastName}`).screenshot();
		membersEditPage
			.emailInput()
			.type(faker.internet.email(memberName2, lastName))
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		memberName3 = faker.name.firstName();
		lastName = faker.name.lastName();

		membersEditPage.nameInput().type(`${memberName3} ${lastName}`).screenshot();
		membersEditPage
			.emailInput()
			.type(faker.internet.email(memberName3, lastName))
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('subscribed');
		membersPage.filterParameterValueSelect().screenshot().select('false');

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('not.exist');
		cy.screenshot();
	});

	it('should filter member by not subscribed to newsletter (a-priori)', () => {
		cy.fixture('data-pool').then(({members}) => {
			const memberObj: Member =
				members.valid[Math.floor(Math.random() * members.valid.length)];
			memberName = memberObj.name;
			let lastName = memberObj.name;
			memberEmail = memberObj.email;

			membersEditPage.nameInput().type(memberName).screenshot();
			membersEditPage.emailInput().type(memberEmail).screenshot();
			membersEditPage.subscribeToggle().click().screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj2: Member =
				members.valid[Math.floor(Math.random() * members.valid.length)];
			memberName2 = memberObj2.name;
			lastName = memberObj2.name;
			let memberEmail2 = memberObj2.email;

			membersEditPage.nameInput().type(memberName2).screenshot();
			membersEditPage.emailInput().type(memberEmail2).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj3: Member =
				members.valid[Math.floor(Math.random() * members.valid.length)];
			memberName3 = memberObj3.name;
			lastName = memberObj3.name;
			let memberEmail3 = memberObj3.email;

			membersEditPage.nameInput().type(memberName3).screenshot();
			membersEditPage.emailInput().type(memberEmail3).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			/////pasos a desarrollar/////////

			membersPage.load().screenshot();
			cy.wait(1000);
			membersPage.filterButton().click().screenshot();
			cy.wait(500);
			membersPage.filterParameterSelect().screenshot().select('subscribed');
			membersPage.filterParameterValueSelect().screenshot().select('false');

			membersPage.filterApplyButton().click();
			cy.wait(1000);
			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName)
				.should('be.visible');

			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName2)
				.should('not.exist');
			cy.screenshot();
		});
	});

	it('should filter member by not subscribed to newsletter with invalid data (a-priori)', () => {
		cy.fixture('data-pool').then(({members}) => {
			const memberObj: Member =
				members.invalid.membersWithBorderCases[
					Math.floor(
						Math.random() * members.invalid.membersWithBorderCases.length
					)
				];
			memberName = memberObj.name;
			let lastName = memberObj.name;
			memberEmail = memberObj.email;

			membersEditPage.nameInput().type(memberName).screenshot();
			membersEditPage.emailInput().type(memberEmail).screenshot();
			membersEditPage.subscribeToggle().click().screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj2: Member =
				members.invalid.membersWithBorderCases[
					Math.floor(
						Math.random() * members.invalid.membersWithBorderCases.length
					)
				];
			memberName2 = memberObj2.name;
			lastName = memberObj2.name;
			let memberEmail2 = memberObj2.email;

			membersEditPage.nameInput().type(memberName2).screenshot();
			membersEditPage.emailInput().type(memberEmail2).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj3: Member =
				members.invalid.membersWithBorderCases[
					Math.floor(
						Math.random() * members.invalid.membersWithBorderCases.length
					)
				];
			memberName3 = memberObj3.name;
			lastName = memberObj3.name;
			let memberEmail3 = memberObj3.email;

			membersEditPage.nameInput().type(memberName3).screenshot();
			membersEditPage.emailInput().type(memberEmail3).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			/////pasos a desarrollar/////////

			membersPage.load().screenshot();
			cy.wait(1000);
			membersPage.filterButton().click().screenshot();
			cy.wait(500);
			membersPage.filterParameterSelect().screenshot().select('subscribed');
			membersPage.filterParameterValueSelect().screenshot().select('false');

			membersPage.filterApplyButton().click();
			cy.wait(1000);
			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName)
				.should('be.visible');

			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName2)
				.should('not.exist');
			cy.screenshot();
		});
	});

	it('should filter member by not subscribed to newsletter (pseudo-aleatorio)', () => {
		const memberObj: Member = generateValidMember();
		memberName = memberObj.name;
		let lastName = memberObj.name;
		memberEmail = memberObj.email;

		membersEditPage.nameInput().type(memberName).screenshot();
		membersEditPage.emailInput().type(memberEmail).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj2: Member = generateValidMember();
		memberName2 = memberObj2.name;
		lastName = memberObj2.name;
		let memberEmail2 = memberObj2.email;

		membersEditPage.nameInput().type(memberName2).screenshot();
		membersEditPage.emailInput().type(memberEmail2).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj3: Member = generateValidMember();
		memberName3 = memberObj3.name;
		lastName = memberObj3.name;
		let memberEmail3 = memberObj3.email;

		membersEditPage.nameInput().type(memberName3).screenshot();
		membersEditPage.emailInput().type(memberEmail3).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('subscribed');
		membersPage.filterParameterValueSelect().screenshot().select('false');

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('not.exist');
		cy.screenshot();
	});

	it('should filter member by not subscribed to newsletter with invalid data (pseudo-aleatorio)', () => {
		const memberObj: Invalid<Member> = generateInvalidMember();
		memberName = memberObj.name;
		let lastName = memberObj.name;
		const memberEmail = memberObj.email;

		membersEditPage.nameInput().type(memberName).screenshot();
		membersEditPage.emailInput().type(memberEmail?.toString()).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj2: Invalid<Member> = generateInvalidMember();
		memberName2 = memberObj2.name;
		lastName = memberObj2.name;
		let memberEmail2 = memberObj2.email;

		membersEditPage.nameInput().type(memberName2).screenshot();
		membersEditPage.emailInput().type(memberEmail2?.toString()).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj3: Invalid<Member> = generateInvalidMember();
		memberName3 = memberObj3?.name?.toString();
		lastName = memberObj3?.name?.toString();
		let memberEmail3 = memberObj3.email;

		membersEditPage.nameInput().type(memberName3).screenshot();
		membersEditPage.emailInput().type(memberEmail3?.toString()).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('subscribed');
		membersPage.filterParameterValueSelect().screenshot().select('false');

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('not.exist');
		cy.screenshot();
	});

	it('should filter member by not subscribed to newsletter with invalid types (pseudo-aleatorio)', () => {
		const membersWithInvalidTypesPerField =
			generateManyInvalidMembers(10).membersWithInvalidTypesPerField;
		const memberObj: Invalid<Member> =
			membersWithInvalidTypesPerField[
				Math.floor(Math.random() * membersWithInvalidTypesPerField.length)
			];
		memberName = memberObj.name;
		let lastName = memberObj.name;
		const memberEmail = memberObj.email;

		membersEditPage.nameInput().type(memberName).screenshot();
		membersEditPage.emailInput().type(memberEmail?.toString()).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const membersWithInvalidTypesPerField2 =
			generateManyInvalidMembers(11).membersWithInvalidTypesPerField;
		const memberObj2: Invalid<Member> =
			membersWithInvalidTypesPerField2[
				Math.floor(Math.random() * membersWithInvalidTypesPerField2.length)
			];
		memberName2 = memberObj2.name;
		lastName = memberObj2.name;
		let memberEmail2 = memberObj2.email;

		membersEditPage.nameInput().type(memberName2).screenshot();
		membersEditPage.emailInput().type(memberEmail2?.toString()).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const membersWithInvalidTypesPerField3 =
			generateManyInvalidMembers(12).membersWithInvalidTypesPerField;
		const memberObj3: Invalid<Member> =
			membersWithInvalidTypesPerField3[
				Math.floor(Math.random() * membersWithInvalidTypesPerField3.length)
			];
		memberName3 = memberObj3?.name?.toString();
		lastName = memberObj3?.name?.toString();
		let memberEmail3 = memberObj3.email;

		membersEditPage.nameInput().type(memberName3).screenshot();
		membersEditPage.emailInput().type(memberEmail3?.toString()).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('subscribed');
		membersPage.filterParameterValueSelect().screenshot().select('false');

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('not.exist');
		cy.screenshot();
	});

	//SC4

	it('should filter by name (aleatorio)', () => {
		memberName = faker.name.firstName();
		let lastName = faker.name.lastName();
		memberEmail = faker.internet.email(memberName, lastName);

		membersEditPage.nameInput().type(`${memberName} ${lastName}`).screenshot();
		membersEditPage.emailInput().type(memberEmail).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		memberName2 = faker.name.firstName();
		lastName = faker.name.lastName();

		membersEditPage.nameInput().type(`${memberName2} ${lastName}`).screenshot();
		membersEditPage
			.emailInput()
			.type(faker.internet.email(memberName2, lastName))
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		memberName3 = faker.name.firstName();
		lastName = faker.name.lastName();

		membersEditPage.nameInput().type(`${memberName3} ${lastName}`).screenshot();
		membersEditPage
			.emailInput()
			.type(faker.internet.email(memberName3, lastName))
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('name');
		membersPage
			.filterParameterConditionSelect()
			.screenshot()
			.select('contains');
		membersPage.filterParameterValueInput().type(memberName).screenshot();

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('not.exist');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName3)
			.should('not.exist');
		cy.screenshot();
	});

	it('should filter by name (a-priori)', () => {
		cy.fixture('data-pool').then(({members}) => {
			const memberObj: Member =
				members.valid[Math.floor(Math.random() * members.valid.length)];
			memberName = memberObj.name;
			let lastName = memberObj.name;
			memberEmail = memberObj.email;

			membersEditPage.nameInput().type(memberName).screenshot();
			membersEditPage.emailInput().type(memberEmail).screenshot();
			membersEditPage.subscribeToggle().click().screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj2: Member =
				members.valid[Math.floor(Math.random() * members.valid.length)];
			memberName2 = memberObj2.name;
			lastName = memberObj2.name;
			let memberEmail2 = memberObj2.email;

			membersEditPage.nameInput().type(memberName2).screenshot();
			membersEditPage.emailInput().type(memberEmail2).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj3: Member =
				members.valid[Math.floor(Math.random() * members.valid.length)];
			memberName3 = memberObj3.name;
			lastName = memberObj3.name;
			let memberEmail3 = memberObj3.email;

			membersEditPage.nameInput().type(memberName3).screenshot();
			membersEditPage.emailInput().type(memberEmail3).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			/////pasos a desarrollar/////////

			membersPage.load().screenshot();
			cy.wait(1000);
			membersPage.filterButton().click().screenshot();
			cy.wait(500);
			membersPage.filterParameterSelect().screenshot().select('name');
			membersPage
				.filterParameterConditionSelect()
				.screenshot()
				.select('contains');
			membersPage.filterParameterValueInput().type(memberName).screenshot();

			membersPage.filterApplyButton().click();
			cy.wait(1000);
			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName)
				.should('be.visible');

			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName2)
				.should('not.exist');

			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName3)
				.should('not.exist');
			cy.screenshot();
		});
	});

	it('should filter by name with invalid data (a-priori)', () => {
		cy.fixture('data-pool').then(({members}) => {
			const memberObj: Member =
				members.invalid.membersWithInvalidTypesPerField[
					Math.floor(
						Math.random() *
							members.invalid.membersWithInvalidTypesPerField.length
					)
				];
			memberName = memberObj.name;
			let lastName = memberObj.name;
			memberEmail = memberObj.email;

			membersEditPage.nameInput().type(memberName?.toString()).screenshot();
			membersEditPage.emailInput().type(memberEmail?.toString()).screenshot();
			membersEditPage.subscribeToggle().click().screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj2: Member =
				members.invalid.membersWithInvalidTypesPerField[
					Math.floor(
						Math.random() *
							members.invalid.membersWithInvalidTypesPerField.length
					)
				];
			memberName2 = memberObj2.name;
			lastName = memberObj2.name;
			let memberEmail2 = memberObj2.email;

			membersEditPage.nameInput().type(memberName2?.toString()).screenshot();
			membersEditPage.emailInput().type(memberEmail2?.toString()).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj3: Member =
				members.invalid.membersWithInvalidTypesPerField[
					Math.floor(
						Math.random() *
							members.invalid.membersWithInvalidTypesPerField.length
					)
				];
			memberName3 = memberObj3.name;
			lastName = memberObj3.name;
			let memberEmail3 = memberObj3.email;

			membersEditPage.nameInput().type(memberName3?.toString()).screenshot();
			membersEditPage.emailInput().type(memberEmail3?.toString()).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			/////pasos a desarrollar/////////

			membersPage.load().screenshot();
			cy.wait(1000);
			membersPage.filterButton().click().screenshot();
			cy.wait(500);
			membersPage.filterParameterSelect().screenshot().select('name');
			membersPage
				.filterParameterConditionSelect()
				.screenshot()
				.select('contains');
			membersPage.filterParameterValueInput().type(memberName).screenshot();

			membersPage.filterApplyButton().click();
			cy.wait(1000);
			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName)
				.should('be.visible');

			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName2)
				.should('not.exist');

			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName3)
				.should('not.exist');
			cy.screenshot();
		});
	});

	it('should filter by name (pseudo-aleatorio)', () => {
		const memberObj: Member = generateValidMember();
		memberName = memberObj.name;
		let lastName = memberObj.name;
		memberEmail = memberObj.email;

		membersEditPage.nameInput().type(memberName).screenshot();
		membersEditPage.emailInput().type(memberEmail).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj2: Member = generateValidMember();
		memberName2 = memberObj2.name;
		lastName = memberObj2.name;
		let memberEmail2 = memberObj2.email;

		membersEditPage.nameInput().type(memberName2).screenshot();
		membersEditPage.emailInput().type(memberEmail2).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj3: Member = generateValidMember();
		memberName3 = memberObj3.name;
		lastName = memberObj3.name;
		let memberEmail3 = memberObj3.email;

		membersEditPage.nameInput().type(memberName3).screenshot();
		membersEditPage.emailInput().type(memberEmail3).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('name');
		membersPage
			.filterParameterConditionSelect()
			.screenshot()
			.select('contains');
		membersPage.filterParameterValueInput().type(memberName).screenshot();

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('not.exist');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName3)
			.should('not.exist');
		cy.screenshot();
	});

	it('should filter by name with invalid data (pseudo-aleatorio)', () => {
		const memberObj: Invalid<Member> = generateInvalidMember();
		memberName = memberObj.name;
		let lastName = memberObj.name;
		const memberEmail = memberObj.email;

		membersEditPage.nameInput().type(memberName?.toString()).screenshot();
		membersEditPage.emailInput().type(memberEmail?.toString()).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj2: Invalid<Member> = generateInvalidMember();
		memberName2 = memberObj2.name;
		lastName = memberObj2.name;
		let memberEmail2 = memberObj2.email;

		membersEditPage.nameInput().type(memberName2?.toString()).screenshot();
		membersEditPage.emailInput().type(memberEmail2?.toString()).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj3: Invalid<Member> = generateInvalidMember();
		let memberName3 = memberObj3.name;
		lastName = memberObj3.name;
		let memberEmail3 = memberObj3.email;

		membersEditPage.nameInput().type(memberName3?.toString()).screenshot();
		membersEditPage.emailInput().type(memberEmail3?.toString()).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('name');
		membersPage
			.filterParameterConditionSelect()
			.screenshot()
			.select('contains');
		membersPage.filterParameterValueInput().type(memberName).screenshot();

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('not.exist');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName3?.toString())
			.should('not.exist');
		cy.screenshot();
	});

	it('should filter by name with invalid data (pseudo-aleatorio)', () => {
		const membersWithInvalidTypesPerField =
			generateManyInvalidMembers(10).membersWithInvalidTypesPerField;
		const memberObj: Invalid<Member> =
			membersWithInvalidTypesPerField[
				Math.floor(Math.random() * membersWithInvalidTypesPerField.length)
			];
		memberName = memberObj.name;
		let lastName = memberObj.name;
		const memberEmail = memberObj.email;

		membersEditPage.nameInput().type(memberName?.toString()).screenshot();
		membersEditPage.emailInput().type(memberEmail?.toString()).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const membersWithInvalidTypesPerField2 =
			generateManyInvalidMembers(11).membersWithInvalidTypesPerField;
		const memberObj2: Invalid<Member> =
			membersWithInvalidTypesPerField2[
				Math.floor(Math.random() * membersWithInvalidTypesPerField2.length)
			];
		memberName2 = memberObj2.name;
		lastName = memberObj2.name;
		let memberEmail2 = memberObj2.email;

		membersEditPage.nameInput().type(memberName2?.toString()).screenshot();
		membersEditPage.emailInput().type(memberEmail2?.toString()).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const membersWithInvalidTypesPerField3 =
			generateManyInvalidMembers(12).membersWithInvalidTypesPerField;
		const memberObj3: Invalid<Member> =
			membersWithInvalidTypesPerField3[
				Math.floor(Math.random() * membersWithInvalidTypesPerField3.length)
			];
		let memberName3 = memberObj3.name;
		lastName = memberObj3.name;
		let memberEmail3 = memberObj3.email;

		membersEditPage.nameInput().type(memberName3?.toString()).screenshot();
		membersEditPage.emailInput().type(memberEmail3?.toString()).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('name');
		membersPage
			.filterParameterConditionSelect()
			.screenshot()
			.select('contains');
		membersPage.filterParameterValueInput().type(memberName).screenshot();

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('not.exist');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName3?.toString())
			.should('not.exist');
		cy.screenshot();
	});

	//SC5
	it('should filter by email (aleatorio)', () => {
		memberName = faker.name.firstName();
		let lastName = faker.name.lastName();
		memberEmail = faker.internet.email(memberName, lastName);

		membersEditPage.nameInput().type(`${memberName} ${lastName}`).screenshot();
		membersEditPage.emailInput().type(memberEmail).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		memberName2 = faker.name.firstName();
		lastName = faker.name.lastName();

		membersEditPage.nameInput().type(`${memberName2} ${lastName}`).screenshot();
		membersEditPage
			.emailInput()
			.type(faker.internet.email(memberName2, lastName))
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		memberName3 = faker.name.firstName();
		lastName = faker.name.lastName();

		membersEditPage.nameInput().type(`${memberName3} ${lastName}`).screenshot();
		membersEditPage
			.emailInput()
			.type(faker.internet.email(memberName3, lastName))
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('email');
		membersPage
			.filterParameterConditionSelect()
			.screenshot()
			.select('contains');
		membersPage
			.filterParameterValueInput()
			.type(memberEmail.substring(2))
			.screenshot();

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('not.exist');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName3)
			.should('not.exist');

		cy.screenshot();
	});

	it('should filter by email (a-priori)', () => {
		cy.fixture('data-pool').then(({members}) => {
			const memberObj: Member =
				members.valid[Math.floor(Math.random() * members.valid.length)];
			memberName = memberObj.name;
			let lastName = memberObj.name;
			memberEmail = memberObj.email;

			membersEditPage.nameInput().type(memberName).screenshot();
			membersEditPage.emailInput().type(memberEmail).screenshot();
			membersEditPage.subscribeToggle().click().screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj2: Member =
				members.valid[Math.floor(Math.random() * members.valid.length)];
			memberName2 = memberObj2.name;
			lastName = memberObj2.name;
			let memberEmail2 = memberObj2.email;

			membersEditPage.nameInput().type(memberName2).screenshot();
			membersEditPage.emailInput().type(memberEmail2).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj3: Member =
				members.valid[Math.floor(Math.random() * members.valid.length)];
			memberName3 = memberObj3.name;
			lastName = memberObj3.name;
			let memberEmail3 = memberObj3.email;

			membersEditPage.nameInput().type(memberName3).screenshot();
			membersEditPage.emailInput().type(memberEmail3).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			/////pasos a desarrollar/////////

			membersPage.load().screenshot();
			cy.wait(1000);
			membersPage.filterButton().click().screenshot();
			cy.wait(500);
			membersPage.filterParameterSelect().screenshot().select('email');
			membersPage
				.filterParameterConditionSelect()
				.screenshot()
				.select('contains');
			membersPage
				.filterParameterValueInput()
				.type(memberEmail.substring(2))
				.screenshot();

			membersPage.filterApplyButton().click();
			cy.wait(1000);
			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName)
				.should('be.visible');

			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName2)
				.should('not.exist');

			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName3)
				.should('not.exist');

			cy.screenshot();
		});
	});

	it('should filter by email with invalid data (a-priori)', () => {
		cy.fixture('data-pool').then(({members}) => {
			const memberObj: Member =
				members.invalid.membersWithBorderCases[
					Math.floor(
						Math.random() * members.invalid.membersWithBorderCases.length
					)
				];
			memberName = memberObj.name;
			let lastName = memberObj.name;
			memberEmail = memberObj.email;

			membersEditPage.nameInput().type(memberName).screenshot();
			membersEditPage.emailInput().type(memberEmail).screenshot();
			membersEditPage.subscribeToggle().click().screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj2: Member =
				members.invalid.membersWithBorderCases[
					Math.floor(
						Math.random() * members.invalid.membersWithBorderCases.length
					)
				];
			memberName2 = memberObj2.name;
			lastName = memberObj2.name;
			let memberEmail2 = memberObj2.email;

			membersEditPage.nameInput().type(memberName2).screenshot();
			membersEditPage.emailInput().type(memberEmail2).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj3: Member =
				members.invalid.membersWithBorderCases[
					Math.floor(
						Math.random() * members.invalid.membersWithBorderCases.length
					)
				];
			memberName3 = memberObj3.name;
			lastName = memberObj3.name;
			let memberEmail3 = memberObj3.email;

			membersEditPage.nameInput().type(memberName3).screenshot();
			membersEditPage.emailInput().type(memberEmail3).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			/////pasos a desarrollar/////////

			membersPage.load().screenshot();
			cy.wait(1000);
			membersPage.filterButton().click().screenshot();
			cy.wait(500);
			membersPage.filterParameterSelect().screenshot().select('email');
			membersPage
				.filterParameterConditionSelect()
				.screenshot()
				.select('contains');
			membersPage
				.filterParameterValueInput()
				.type(memberEmail.substring(2))
				.screenshot();

			membersPage.filterApplyButton().click();
			cy.wait(1000);
			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName)
				.should('be.visible');

			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName2)
				.should('not.exist');

			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName3)
				.should('not.exist');

			cy.screenshot();
		});
	});

	it('should filter by email (pseudo-aleatorio)', () => {
		const memberObj: Member = generateValidMember();
		memberName = memberObj.name;
		let lastName = memberObj.name;
		memberEmail = memberObj.email;

		membersEditPage.nameInput().type(memberName).screenshot();
		membersEditPage.emailInput().type(memberEmail).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj2: Member = generateValidMember();
		memberName2 = memberObj2.name;
		lastName = memberObj2.name;
		let memberEmail2 = memberObj2.email;

		membersEditPage.nameInput().type(memberName2).screenshot();
		membersEditPage.emailInput().type(memberEmail2).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj3: Member = generateValidMember();
		memberName3 = memberObj3.name;
		lastName = memberObj3.name;
		let memberEmail3 = memberObj3.email;

		membersEditPage.nameInput().type(memberName3).screenshot();
		membersEditPage.emailInput().type(memberEmail3).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('email');
		membersPage
			.filterParameterConditionSelect()
			.screenshot()
			.select('contains');
		membersPage
			.filterParameterValueInput()
			.type(memberEmail.substring(2))
			.screenshot();

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('not.exist');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName3)
			.should('not.exist');

		cy.screenshot();
	});

	it('should filter by email with invalid data (pseudo-aleatorio)', () => {
		const memberObj: Invalid<Member> = generateInvalidMember();
		memberName = memberObj.name;
		let lastName = memberObj.name;
		const memberEmail = memberObj.email?.toString();

		membersEditPage.nameInput().type(memberName?.toString()).screenshot();
		membersEditPage.emailInput().type(memberEmail?.toString()).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj2: Invalid<Member> = generateInvalidMember();
		memberName2 = memberObj2.name;
		lastName = memberObj2.name;
		let memberEmail2 = memberObj2.email?.toString();

		membersEditPage.nameInput().type(memberName2?.toString()).screenshot();
		membersEditPage.emailInput().type(memberEmail2?.toString()).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj3: Invalid<Member> = generateInvalidMember();
		let memberName3 = memberObj3?.name?.toString();;
		lastName = memberObj3.name;
		let memberEmail3 = memberObj3?.email?.toString();

		membersEditPage.nameInput().type(memberName3?.toString()).screenshot();
		membersEditPage.emailInput().type(memberEmail3).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('email');
		membersPage
			.filterParameterConditionSelect()
			.screenshot()
			.select('contains');
		membersPage
			.filterParameterValueInput()
			.type(memberEmail.substring(2))
			.screenshot();

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('not.exist');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName3)
			.should('not.exist');

		cy.screenshot();
	});
	
	it('should filter by email with invalid types (pseudo-aleatorio)', () => {
		const membersWithInvalidTypesPerField =
			generateManyInvalidMembers(10).membersWithInvalidTypesPerField;
		const memberObj: Invalid<Member> =
			membersWithInvalidTypesPerField[
				Math.floor(Math.random() * membersWithInvalidTypesPerField.length)
			];
		memberName = memberObj.name;
		let lastName = memberObj.name;
		const memberEmail = memberObj.email?.toString();

		membersEditPage.nameInput().type(memberName?.toString()).screenshot();
		membersEditPage.emailInput().type(memberEmail?.toString()).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const membersWithInvalidTypesPerField2 =
			generateManyInvalidMembers(11).membersWithInvalidTypesPerField;
		const memberObj2: Invalid<Member> =
			membersWithInvalidTypesPerField2[
				Math.floor(Math.random() * membersWithInvalidTypesPerField2.length)
			];
		memberName2 = memberObj2.name;
		lastName = memberObj2.name;
		let memberEmail2 = memberObj2.email?.toString();

		membersEditPage.nameInput().type(memberName2?.toString()).screenshot();
		membersEditPage.emailInput().type(memberEmail2?.toString()).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const membersWithInvalidTypesPerField3 =
			generateManyInvalidMembers(12).membersWithInvalidTypesPerField;
		const memberObj3: Invalid<Member> =
			membersWithInvalidTypesPerField3[
				Math.floor(Math.random() * membersWithInvalidTypesPerField3.length)
			];
		let memberName3 = memberObj3?.name?.toString();
		lastName = memberObj3.name;
		let memberEmail3 = memberObj3?.email?.toString();

		membersEditPage.nameInput().type(memberName3?.toString()).screenshot();
		membersEditPage.emailInput().type(memberEmail3).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);
		membersPage.filterParameterSelect().screenshot().select('email');
		membersPage
			.filterParameterConditionSelect()
			.screenshot()
			.select('contains');
		membersPage
			.filterParameterValueInput()
			.type(memberEmail.substring(2))
			.screenshot();

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('not.exist');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName3)
			.should('not.exist');

		cy.screenshot();
	});

	//SC6

	it('should filter by email and name (aleatoria)', () => {
		memberName = faker.name.firstName();
		let lastName = faker.name.lastName();
		memberEmail = faker.internet.email(memberName, lastName);

		membersEditPage.nameInput().type(`${memberName} ${lastName}`).screenshot();
		membersEditPage.emailInput().type(memberEmail).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		memberName2 = faker.name.firstName();
		lastName = faker.name.lastName();

		membersEditPage.nameInput().type(`${memberName2} ${lastName}`).screenshot();
		membersEditPage
			.emailInput()
			.type(faker.internet.email(memberName2, lastName))
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		memberName3 = faker.name.firstName();
		lastName = faker.name.lastName();

		membersEditPage.nameInput().type(`${memberName3} ${lastName}`).screenshot();
		membersEditPage
			.emailInput()
			.type(faker.internet.email(memberName3, lastName))
			.screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);

		membersPage.filterParameterSelect().screenshot().select('name');
		membersPage
			.filterParameterConditionSelect()
			.screenshot()
			.select('contains');
		membersPage
			.filterParameterValueInput()
			.type(memberName?.substring(2))
			.screenshot();

		membersPage.filterAddNewFilterButton().click().screenshot();
		cy.wait(500);

		membersPage.filterParameterSelect2().screenshot().select('email');
		membersPage
			.filterParameterConditionSelect2()
			.screenshot()
			.select('contains');
		membersPage
			.filterParameterValueInput2()
			.type(memberEmail.substring(2))
			.screenshot();

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('not.exist');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName3)
			.should('not.exist');
		cy.screenshot();
	});

	it('should filter by email and name (a-priori)', () => {
		cy.fixture('data-pool').then(({members}) => {
			const memberObj: Member =
				members.valid[Math.floor(Math.random() * members.valid.length)];
			memberName = memberObj.name;
			let lastName = memberObj.name;
			memberEmail = memberObj.email;

			membersEditPage.nameInput().type(memberName).screenshot();
			membersEditPage.emailInput().type(memberEmail).screenshot();
			membersEditPage.subscribeToggle().click().screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj2: Member =
				members.valid[Math.floor(Math.random() * members.valid.length)];
			memberName2 = memberObj2.name;
			lastName = memberObj2.name;
			let memberEmail2 = memberObj2.email;

			membersEditPage.nameInput().type(memberName2).screenshot();
			membersEditPage.emailInput().type(memberEmail2).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj3: Member =
				members.valid[Math.floor(Math.random() * members.valid.length)];
			memberName3 = memberObj3.name;
			lastName = memberObj3.name;
			let memberEmail3 = memberObj3.email;

			membersEditPage.nameInput().type(memberName3).screenshot();
			membersEditPage.emailInput().type(memberEmail3).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			/////pasos a desarrollar/////////

			membersPage.load().screenshot();
			cy.wait(1000);
			membersPage.filterButton().click().screenshot();
			cy.wait(500);

			membersPage.filterParameterSelect().screenshot().select('name');
			membersPage
				.filterParameterConditionSelect()
				.screenshot()
				.select('contains');
			membersPage
				.filterParameterValueInput()
				.type(memberName?.substring(2))
				.screenshot();

			membersPage.filterAddNewFilterButton().click().screenshot();
			cy.wait(500);

			membersPage.filterParameterSelect2().screenshot().select('email');
			membersPage
				.filterParameterConditionSelect2()
				.screenshot()
				.select('contains');
			membersPage
				.filterParameterValueInput2()
				.type(memberEmail.substring(2))
				.screenshot();

			membersPage.filterApplyButton().click();
			cy.wait(1000);
			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName)
				.should('be.visible');

			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName2)
				.should('not.exist');

			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName3)
				.should('not.exist');
			cy.screenshot();
		});
	});

	it('should filter by email and name with invalid data (a-priori)', () => {
		cy.fixture('data-pool').then(({members}) => {
			const memberObj: Member =
				members.invalid.membersWithBorderCases[
					Math.floor(
						Math.random() * members.invalid.membersWithBorderCases.length
					)
				];
			memberName = memberObj.name;
			let lastName = memberObj.name;
			memberEmail = memberObj.email;

			membersEditPage.nameInput().type(memberName).screenshot();
			membersEditPage.emailInput().type(memberEmail).screenshot();
			membersEditPage.subscribeToggle().click().screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj2: Member =
				members.invalid.membersWithBorderCases[
					Math.floor(
						Math.random() * members.invalid.membersWithBorderCases.length
					)
				];
			memberName2 = memberObj2.name;
			lastName = memberObj2.name;
			let memberEmail2 = memberObj2.email;

			membersEditPage.nameInput().type(memberName2).screenshot();
			membersEditPage.emailInput().type(memberEmail2).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			membersPage.load().screenshot();
			membersPage.newMemberButton().click();

			const memberObj3: Member =
				members.invalid.membersWithBorderCases[
					Math.floor(
						Math.random() * members.invalid.membersWithBorderCases.length
					)
				];
			memberName3 = memberObj3.name;
			lastName = memberObj3.name;
			let memberEmail3 = memberObj3.email;

			membersEditPage.nameInput().type(memberName3).screenshot();
			membersEditPage.emailInput().type(memberEmail3).screenshot();
			membersEditPage.saveButton().click().screenshot();
			cy.wait(1000);

			/////pasos a desarrollar/////////

			membersPage.load().screenshot();
			cy.wait(1000);
			membersPage.filterButton().click().screenshot();
			cy.wait(500);

			membersPage.filterParameterSelect().screenshot().select('name');
			membersPage
				.filterParameterConditionSelect()
				.screenshot()
				.select('contains');
			membersPage
				.filterParameterValueInput()
				.type(memberName?.substring(2))
				.screenshot();

			membersPage.filterAddNewFilterButton().click().screenshot();
			cy.wait(500);

			membersPage.filterParameterSelect2().screenshot().select('email');
			membersPage
				.filterParameterConditionSelect2()
				.screenshot()
				.select('contains');
			membersPage
				.filterParameterValueInput2()
				.type(memberEmail.substring(2))
				.screenshot();

			membersPage.filterApplyButton().click();
			cy.wait(1000);
			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName)
				.should('be.visible');

			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName2)
				.should('not.exist');

			membersPage
				.membersListContainer()
				.scrollIntoView()
				.contains(memberName3)
				.should('not.exist');
			cy.screenshot();
		});
	});

	it('should filter by email and name with invalid data (pseudo-aleatorio)', () => {
		const memberObj: Member = generateValidMember();
		memberName = memberObj.name;
		let lastName = memberObj.name;
		memberEmail = memberObj.email;

		membersEditPage.nameInput().type(memberName).screenshot();
		membersEditPage.emailInput().type(memberEmail).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj2: Member = generateValidMember();
		memberName2 = memberObj2.name;
		lastName = memberObj2.name;
		let memberEmail2 = memberObj2.email;

		membersEditPage.nameInput().type(memberName2).screenshot();
		membersEditPage.emailInput().type(memberEmail2).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj3: Member = generateValidMember();
		memberName3 = memberObj3.name;
		lastName = memberObj3.name;
		let memberEmail3 = memberObj3.email;

		membersEditPage.nameInput().type(memberName3).screenshot();
		membersEditPage.emailInput().type(memberEmail3).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);

		membersPage.filterParameterSelect().screenshot().select('name');
		membersPage
			.filterParameterConditionSelect()
			.screenshot()
			.select('contains');
		membersPage
			.filterParameterValueInput()
			.type(memberName?.substring(2))
			.screenshot();

		membersPage.filterAddNewFilterButton().click().screenshot();
		cy.wait(500);

		membersPage.filterParameterSelect2().screenshot().select('email');
		membersPage
			.filterParameterConditionSelect2()
			.screenshot()
			.select('contains');
		membersPage
			.filterParameterValueInput2()
			.type(memberEmail.substring(2))
			.screenshot();

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('not.exist');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName3)
			.should('not.exist');
		cy.screenshot();
	});
	
	it('should filter by email and name with invalid data with invalid data (pseudo-aleatorio)', () => {
		const memberObj: Invalid<Member> = generateInvalidMember();
		memberName = memberObj.name;
		let lastName = memberObj.name;
		memberEmail = memberObj?.email?.toString();

		membersEditPage.nameInput().type(memberName).screenshot();
		membersEditPage.emailInput().type(memberEmail).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj2: Invalid<Member> = generateInvalidMember();
		memberName2 = memberObj2.name;
		lastName = memberObj2.name;
		let memberEmail2 = memberObj2?.email?.toString();

		membersEditPage.nameInput().type(memberName2).screenshot();
		membersEditPage.emailInput().type(memberEmail2).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const memberObj3: Invalid<Member> = generateInvalidMember();
		memberName3 = memberObj3?.name?.toString();;
		lastName = memberObj3.name;
		let memberEmail3 = memberObj3?.email?.toString();

		membersEditPage.nameInput().type(memberName3).screenshot();
		membersEditPage.emailInput().type(memberEmail3).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);

		membersPage.filterParameterSelect().screenshot().select('name');
		membersPage
			.filterParameterConditionSelect()
			.screenshot()
			.select('contains');
		membersPage
			.filterParameterValueInput()
			.type(memberName?.substring(2))
			.screenshot();

		membersPage.filterAddNewFilterButton().click().screenshot();
		cy.wait(500);

		membersPage.filterParameterSelect2().screenshot().select('email');
		membersPage
			.filterParameterConditionSelect2()
			.screenshot()
			.select('contains');
		membersPage
			.filterParameterValueInput2()
			.type(memberEmail.substring(2))
			.screenshot();

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('not.exist');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName3)
			.should('not.exist');
		cy.screenshot();
	});
	
	it('should filter by email and name with invalid data with invalid types (pseudo-aleatorio)', () => {
		const membersWithInvalidTypesPerField =
			generateManyInvalidMembers(10).membersWithInvalidTypesPerField;
		const memberObj: Invalid<Member> =
			membersWithInvalidTypesPerField[
				Math.floor(Math.random() * membersWithInvalidTypesPerField.length)
			];
		memberName = memberObj?.name?.toString();
		let lastName = memberObj.name;
		memberEmail = memberObj?.email?.toString();

		membersEditPage.nameInput().type(memberName).screenshot();
		membersEditPage.emailInput().type(memberEmail).screenshot();
		membersEditPage.subscribeToggle().click().screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const membersWithInvalidTypesPerField2 =
			generateManyInvalidMembers(11).membersWithInvalidTypesPerField;
		const memberObj2: Invalid<Member> =
			membersWithInvalidTypesPerField2[
				Math.floor(Math.random() * membersWithInvalidTypesPerField2.length)
			];
		memberName2 = memberObj2?.name?.toString();;
		lastName = memberObj2.name;
		let memberEmail2 = memberObj2?.email?.toString();

		membersEditPage.nameInput().type(memberName2).screenshot();
		membersEditPage.emailInput().type(memberEmail2).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		membersPage.load().screenshot();
		membersPage.newMemberButton().click();

		const membersWithInvalidTypesPerField3 =
			generateManyInvalidMembers(12).membersWithInvalidTypesPerField;
		const memberObj3: Invalid<Member> =
			membersWithInvalidTypesPerField3[
				Math.floor(Math.random() * membersWithInvalidTypesPerField3.length)
			];
		memberName3 = memberObj3?.name?.toString();
		lastName = memberObj3.name;
		let memberEmail3 = memberObj3?.email?.toString();

		membersEditPage.nameInput().type(memberName3).screenshot();
		membersEditPage.emailInput().type(memberEmail3).screenshot();
		membersEditPage.saveButton().click().screenshot();
		cy.wait(1000);

		/////pasos a desarrollar/////////

		membersPage.load().screenshot();
		cy.wait(1000);
		membersPage.filterButton().click().screenshot();
		cy.wait(500);

		membersPage.filterParameterSelect().screenshot().select('name');
		membersPage
			.filterParameterConditionSelect()
			.screenshot()
			.select('contains');
		membersPage
			.filterParameterValueInput()
			.type(memberName?.substring(2))
			.screenshot();

		membersPage.filterAddNewFilterButton().click().screenshot();
		cy.wait(500);

		membersPage.filterParameterSelect2().screenshot().select('email');
		membersPage
			.filterParameterConditionSelect2()
			.screenshot()
			.select('contains');
		membersPage
			.filterParameterValueInput2()
			.type(memberEmail.substring(2))
			.screenshot();

		membersPage.filterApplyButton().click();
		cy.wait(1000);
		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName)
			.should('be.visible');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName2)
			.should('not.exist');

		membersPage
			.membersListContainer()
			.scrollIntoView()
			.contains(memberName3)
			.should('not.exist');
		cy.screenshot();
	});
});

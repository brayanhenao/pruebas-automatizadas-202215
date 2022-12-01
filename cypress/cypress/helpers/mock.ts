import {faker} from '@faker-js/faker';

import {
	Invalid,
	Options,
	Member,
	InvalidOptions,
	InvalidOptionConfig,
	Post,
	Page,
	Tag,
	CodeInjection,
} from './interfaces';

const types: InvalidOptionConfig['datatype'][] = [
	'bigInt',
	'boolean',
	'email',
	'null',
	'number',
	'json',
	'string',
	'text',
	'word',
	'date',
];

const generateInvalidInput = (
	originalType: InvalidOptionConfig['datatype'],
	option?: InvalidOptionConfig,
) => {
	const generateRandomInputByType = (
		type?: InvalidOptionConfig['datatype'],
	) => {
		const randomType = type || faker.helpers.arrayElement(types);

		if (Array.isArray(randomType)) {
			const len = option?.max || faker.datatype.number(10);
			const arr = [];
			for (let i = 0; i < len; i++) {
				arr.push(generateRandomInputByType(randomType[0]));
			}
			return arr;
		}

		if (['email', 'text', 'word', 'null', 'color'].includes(randomType)) {
			if (randomType === 'email') {
				const randCase = option?.randCase || faker.datatype.number(3);
				switch (randCase) {
					case 0:
						return faker.internet.email(undefined, undefined, undefined, {
							allowSpecialCharacters: true,
						});
					case 1:
						return faker.internet.email(
							undefined,
							undefined,
							faker.database.mongodbObjectId(),
						);
					case 2:
						return faker.internet.email().replace('@', '¢');
					default:
						return faker.internet.email().replace('@', '@@@');
				}
			} else if (randomType === 'word') {
				return (
					option?.randCase ? option.randCase == 1 : faker.datatype.boolean()
				)
					? faker.lorem.word({length: {max: option?.max, min: option?.min}})
					: faker.datatype.string(option?.min || option?.max);
			} else if (randomType === 'text') {
				return (
					option?.randCase ? option.randCase == 1 : faker.datatype.boolean()
				)
					? faker.lorem.paragraph(option?.max)
					: faker.datatype.string(option?.min || option?.max);
			} else if (randomType === 'color') {
				return faker.color.rgb({prefix: ''});
			} else {
				return faker.datatype.boolean() ? null : undefined;
			}
		} else if (randomType === 'date') {
			return faker.date.recent().toISOString().substring(0, 10);
		} else if (randomType === 'time') {
			return faker.date.recent().toISOString().substring(11, 16);
		} else if (randomType === 'date-time') {
			return faker.date.recent().toISOString();
		}
		return faker.datatype[randomType]();
	};

	if (!option) {
		return generateRandomInputByType();
	}
	if (option.preserveType == undefined)
		option.preserveType = faker.datatype.boolean();

	if (option.min == undefined) option.min = 0;
	if (option.max == undefined) option.max = 100;

	return option?.datatype
		? generateRandomInputByType(option.datatype)
		: option.preserveType
			? generateRandomInputByType(originalType)
			: generateRandomInputByType();
};

//Members

export const generateValidMember = (options?: Options<Member>): Member => {
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();
	return {
		name: `${firstName} ${lastName}`,
		email: faker.internet.email(firstName, lastName),
		subscribed: faker.datatype.boolean(),
		labels: faker.datatype.boolean()
			? faker.lorem
				.words(
					faker.datatype.number({
						min: options?.labels?.min || 0,
						max: options?.labels?.max || 10,
					}),
				)
				.split(' ')
			: undefined,
		note: faker.lorem.sentence(),
	};
};

export const generateInvalidMember = (
	options?: InvalidOptions<Member>,
): Invalid<Member> => ({
	name: generateInvalidInput('word', options?.name),
	email: generateInvalidInput('email', options?.email),
	subscribed: generateInvalidInput('boolean', options?.subscribed),
	labels: generateInvalidInput(['string'], options?.labels),
	note: generateInvalidInput('text', options?.note),
});

export const generateManyValidMembers = (amount = 100) => {
	const members: Member[] = [];
	for (let i = 0; i < amount; i++) {
		members.push(generateValidMember());
	}
	return members;
};

export const generateManyInvalidMembers = (variantAmounts = 5) => {
	const validTypes: Record<keyof Member, InvalidOptionConfig['datatype']> = {
		email: 'email',
		name: 'word',
		subscribed: 'boolean',
		labels: ['string'],
		note: 'text',
	};
	// valid members missing fields //TODO: multiply for variants if required :D //TODO: combinations
	const membersWithMissingKeys = generateManyValidMembers(5).map(
		(member, i) => {
			delete member[Object.keys(member)[i]];
			return member;
		},
	);

	const membersWithInvalidTypesPerField: Invalid<Member>[] = [].concat.apply(
		[],
		Object.entries(validTypes).map(([k, v]) =>
			[...types]
				.filter((t) => t !== v)
				.map((type) => generateInvalidMember({[k]: {datatype: type}})),
		),
	);

	//border cases
	const membersWithBorderCases: Invalid<Member>[] = [];
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true, max: 190, randCase: 2}, // max length name = 191
			email: {preserveType: true},
			labels: {preserveType: true},
			note: {preserveType: true},
			subscribed: {preserveType: true},
		}),
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true, max: 191, randCase: 2}, // max length name = 191
			email: {preserveType: true},
			labels: {preserveType: true},
			note: {preserveType: true},
			subscribed: {preserveType: true},
		}),
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true, max: 192, randCase: 2}, // max length name = 191
			email: {preserveType: true},
			labels: {preserveType: true},
			note: {preserveType: true},
			subscribed: {preserveType: true},
		}),
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true},
			email: {preserveType: true, max: 319}, // max email length = 320
			labels: {preserveType: true},
			note: {preserveType: true},
			subscribed: {preserveType: true},
		}),
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true},
			email: {preserveType: true, max: 320}, // max email length = 320
			labels: {preserveType: true},
			note: {preserveType: true},
			subscribed: {preserveType: true},
		}),
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true},
			email: {preserveType: true, max: 321}, // max email length = 320
			labels: {preserveType: true},
			note: {preserveType: true},
			subscribed: {preserveType: true},
		}),
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true},
			email: {preserveType: true},
			labels: {preserveType: true, max: 9999}, // max labels 10000
			note: {preserveType: true},
			subscribed: {preserveType: true},
		}),
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true},
			email: {preserveType: true},
			labels: {preserveType: true, max: 10000}, // max labels 10000
			note: {preserveType: true},
			subscribed: {preserveType: true},
		}),
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true},
			email: {preserveType: true},
			labels: {preserveType: true, max: 10001}, // max labels 10000
			note: {preserveType: true},
			subscribed: {preserveType: true},
		}),
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true},
			email: {preserveType: true},
			labels: {preserveType: true},
			note: {preserveType: true, max: 499, randCase: 2}, // max note 500
			subscribed: {preserveType: true},
		}),
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true},
			email: {preserveType: true},
			labels: {preserveType: true},
			note: {preserveType: true, max: 500, randCase: 2}, // max note 500
			subscribed: {preserveType: true},
		}),
	);
	membersWithBorderCases.push(
		generateInvalidMember({
			name: {preserveType: true},
			email: {preserveType: true},
			labels: {preserveType: true},
			note: {preserveType: true, max: 501, randCase: 2}, // max note 500
			subscribed: {preserveType: true},
		}),
	);

	// variantAmount * 5 fields * 3 cases + (4 borders * fields with border )
	return {
		membersWithMissingKeys,
		membersWithInvalidTypesPerField,
		membersWithBorderCases,
	};
};

//Post

export const generateValidPost = (options?: Options<Post>): Post => {
	const publicationState: 'draft' | 'published' | 'scheduled' =
		faker.helpers.arrayElement(['draft', 'published', 'scheduled']);

	return {
		title: faker.lorem.words(),
		content: {
			type: 'text',
			content: faker.lorem.paragraphs(),
		},
		publishSettings: {
			publicationState,
			publishDate: publicationState
				? faker.date.recent().toISOString().substring(0, 10)
				: undefined,
			publishTime: publicationState
				? faker.date.recent().toISOString().substring(11, 16)
				: undefined,
			tags: faker.datatype.boolean()
				? faker.lorem.words(faker.datatype.number(10)).split(' ')
				: undefined,
			access: faker.helpers.arrayElement([
				'public',
				'members',
				'paid',
				'tiers',
			]),
			excerpt: faker.lorem.paragraph(),
			featured: faker.datatype.boolean(),
		},
	};
};

export const generateInvalidPost = (
	options?: InvalidOptions<Post>,
): Invalid<Post> => ({
	title: generateInvalidInput('word', options?.title),
	content: {
		type: 'text',
		content: generateInvalidInput('text', options?.content),
	},
	publishSettings: {
		publicationState: generateInvalidInput(
			'string',
			options?.publishSettings?.publicationState,
		),
		publishDate: generateInvalidInput(
			'date',
			options?.publishSettings?.publishDate,
		),
		publishTime: generateInvalidInput(
			'time',
			options?.publishSettings?.publishTime,
		),
		tags: generateInvalidInput(['string'], options?.publishSettings?.tags),
		access: generateInvalidInput('string', options?.publishSettings?.access),
		excerpt: generateInvalidInput('text', options?.publishSettings?.excerpt),
		featured: generateInvalidInput(
			'boolean',
			options?.publishSettings?.featured,
		),
	},
});

export const generateManyValidPosts = (amount = 100) => {
	const post: Post[] = [];
	for (let i = 0; i < amount; i++) {
		post.push(generateValidPost());
	}
	return post;
};

export const generateManyInvalidPosts = (variantAmounts = 5) => {
	const validTypes: Record<keyof Post,
		| InvalidOptionConfig['datatype']
		| Record<string, InvalidOptionConfig['datatype']>> = {
		title: 'word',
		content: {
			content: 'text',
		},
		publishSettings: {
			publicationState: 'string',
			publishDate: 'date',
			publishTime: 'time',
			tags: ['string'],
			access: 'string',
			excerpt: 'text',
			featured: 'boolean',
		},
	};
	// valid posts missing fields //TODO: multiply for variants if required :D //TODO: combinations
	const postsWithMissingKeys = generateManyValidPosts(9).map((post, i) => {
		if (i < 2) {
			delete post[Object.keys(post)[i]];
		} else {
			delete post.publishSettings[Object.keys(post.publishSettings)[i - 2]];
		}
		return post;
	});

	let postWithInvalidTypesPerField: Invalid<Post>[] = [].concat.apply(
		[],
		Object.entries(validTypes).map(([k, v]) =>
			[...types]
				.filter((t) => t !== v)
				.map((type) => generateInvalidPost({[k]: {datatype: type}})),
		),
	);

	const invalidTypesPerFieldPublishSettings = [].concat.apply(
		[],
		Object.entries(validTypes.publishSettings).map(([k, v]) =>
			[...types]
				.filter((t) => t !== v)
				.map((type) =>
					generateInvalidPost({
						publishSettings: {
							[k]: {datatype: type},
						} as any,
					}),
				),
		),
	);
	postWithInvalidTypesPerField = postWithInvalidTypesPerField.concat(
		invalidTypesPerFieldPublishSettings,
	);

	// border cases

	const postsWithBorderCases: Invalid<Post>[] = [];
	postsWithBorderCases.push(
		generateInvalidPost({
			title: {preserveType: true, max: 254, randCase: 2} as any, // title = 255
			content: {preserveType: true} as any,
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true},
				access: {preserveType: true},
				excerpt: {preserveType: true},
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	postsWithBorderCases.push(
		generateInvalidPost({
			title: {preserveType: true, max: 255, randCase: 2} as any, // title = 255
			content: {preserveType: true} as any,
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true},
				access: {preserveType: true},
				excerpt: {preserveType: true},
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	postsWithBorderCases.push(
		generateInvalidPost({
			title: {preserveType: true, max: 256, randCase: 2} as any, // title = 255
			content: {preserveType: true} as any,
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true},
				access: {preserveType: true},
				excerpt: {preserveType: true},
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	postsWithBorderCases.push(
		generateInvalidPost({
			title: {preserveType: true} as any,
			content: {preserveType: true, max: 2 ** 53 - 2, randCase: 2} as any, // content = 2^53 - 1
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true},
				access: {preserveType: true},
				excerpt: {preserveType: true},
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	postsWithBorderCases.push(
		generateInvalidPost({
			title: {preserveType: true} as any,
			content: {preserveType: true, max: 2 ** 53 - 1, randCase: 2} as any, // content = 2^53 - 1
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true},
				access: {preserveType: true},
				excerpt: {preserveType: true},
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	postsWithBorderCases.push(
		generateInvalidPost({
			title: {preserveType: true} as any,
			content: {preserveType: true, max: 2 ** 53, randCase: 2} as any, // content = 2^53 - 1
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true},
				access: {preserveType: true},
				excerpt: {preserveType: true},
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	postsWithBorderCases.push(
		generateInvalidPost({
			title: {preserveType: true} as any,
			content: {preserveType: true} as any,
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true, max: 999}, // tags = 10000
				access: {preserveType: true},
				excerpt: {preserveType: true},
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	postsWithBorderCases.push(
		generateInvalidPost({
			title: {preserveType: true} as any,
			content: {preserveType: true} as any,
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true, max: 10000}, // tags = 10000
				access: {preserveType: true},
				excerpt: {preserveType: true},
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	postsWithBorderCases.push(
		generateInvalidPost({
			title: {preserveType: true} as any,
			content: {preserveType: true} as any,
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true, max: 10001}, // tags = 10000
				access: {preserveType: true},
				excerpt: {preserveType: true},
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	postsWithBorderCases.push(
		generateInvalidPost({
			title: {preserveType: true} as any,
			content: {preserveType: true} as any,
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true},
				access: {preserveType: true},
				excerpt: {preserveType: true, max: 299, randCase: 2}, // excerpt = 300
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	postsWithBorderCases.push(
		generateInvalidPost({
			title: {preserveType: true} as any,
			content: {preserveType: true} as any,
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true},
				access: {preserveType: true},
				excerpt: {preserveType: true, max: 300, randCase: 2}, // excerpt = 300
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	postsWithBorderCases.push(
		generateInvalidPost({
			title: {preserveType: true} as any,
			content: {preserveType: true} as any,
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true},
				access: {preserveType: true},
				excerpt: {preserveType: true, max: 301, randCase: 2}, // excerpt = 300
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	return {
		postsWithMissingKeys,
		postWithInvalidTypesPerField,
		postsWithBorderCases,
	};
};

//Page

export const generateValidPage = (options?: Options<Page>): Page => {
	const publicationState: 'draft' | 'published' | 'scheduled' =
		faker.helpers.arrayElement(['draft', 'published', 'scheduled']);

	return {
		title: faker.lorem.words(),
		content: {
			type: 'text',
			content: faker.lorem.paragraphs().replace(/\n/g, ' '),
		},
		publishSettings: {
			publicationState,
			publishDate: publicationState
				? faker.date.recent().toISOString().substring(0, 10)
				: undefined,
			publishTime: publicationState
				? faker.date.recent().toISOString().substring(11, 16)
				: undefined,
			tags: faker.datatype.boolean()
				? faker.lorem.words(faker.datatype.number(10)).split(' ')
				: undefined,
			access: faker.helpers.arrayElement([
				'public',
				'members',
				'paid',
				'tiers',
			]),
			excerpt: faker.lorem.paragraph(),
			featured: faker.datatype.boolean(),
		},
	};
};

export const generateInvalidPage = (
	options?: InvalidOptions<Page>,
): Invalid<Page> => ({
	title: generateInvalidInput('word', options?.title),
	content: {
		type: 'text',
		content: generateInvalidInput('text', options?.content),
	},
	publishSettings: {
		publicationState: generateInvalidInput(
			'string',
			options?.publishSettings?.publicationState,
		),
		publishDate: generateInvalidInput(
			'date',
			options?.publishSettings?.publishDate,
		),
		publishTime: generateInvalidInput(
			'time',
			options?.publishSettings?.publishTime,
		),
		tags: generateInvalidInput(['string'], options?.publishSettings?.tags),
		access: generateInvalidInput('string', options?.publishSettings?.access),
		excerpt: generateInvalidInput('text', options?.publishSettings?.excerpt),
		featured: generateInvalidInput(
			'boolean',
			options?.publishSettings?.featured,
		),
	},
});

export const generateManyValidPages = (amount = 100) => {
	const page: Page[] = [];
	for (let i = 0; i < amount; i++) {
		page.push(generateValidPage());
	}
	return page;
};

export const generateManyInvalidPages = (variantAmounts = 5) => {
	const validTypes: Record<keyof Page,
		| InvalidOptionConfig['datatype']
		| Record<string, InvalidOptionConfig['datatype']>> = {
		title: 'word',
		content: {
			content: 'text',
		},
		publishSettings: {
			publicationState: 'string',
			publishDate: 'date',
			publishTime: 'time',
			tags: ['string'],
			access: 'string',
			excerpt: 'text',
			featured: 'boolean',
		},
	};
	// valid pages missing fields //TODO: multiply for variants if required :D //TODO: combinations
	const pagesWithMissingKeys = generateManyValidPages(9).map((page, i) => {
		if (i < 2) {
			delete page[Object.keys(page)[i]];
		} else {
			delete page.publishSettings[Object.keys(page.publishSettings)[i - 2]];
		}
		return page;
	});

	let pageWithInvalidTypesPerField: Invalid<Page>[] = [].concat.apply(
		[],
		Object.entries(validTypes).map(([k, v]) =>
			[...types]
				.filter((t) => t !== v)
				.map((type) => generateInvalidPost({[k]: {datatype: type}})),
		),
	);

	const invalidTypesPerFieldPublishSettings = [].concat.apply(
		[],
		Object.entries(validTypes.publishSettings).map(([k, v]) =>
			[...types]
				.filter((t) => t !== v)
				.map((type) =>
					generateInvalidPost({
						publishSettings: {
							[k]: {datatype: type},
						} as any,
					}),
				),
		),
	);
	pageWithInvalidTypesPerField = pageWithInvalidTypesPerField.concat(
		invalidTypesPerFieldPublishSettings,
	);

	// border cases

	const pagesWithBorderCases: Invalid<Page>[] = [];
	pagesWithBorderCases.push(
		generateInvalidPage({
			title: {preserveType: true, max: 254, randCase: 2} as any, // title = 255
			content: {preserveType: true} as any,
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true},
				access: {preserveType: true},
				excerpt: {preserveType: true},
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	pagesWithBorderCases.push(
		generateInvalidPage({
			title: {preserveType: true, max: 255, randCase: 2} as any, // title = 255
			content: {preserveType: true} as any,
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true},
				access: {preserveType: true},
				excerpt: {preserveType: true},
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	pagesWithBorderCases.push(
		generateInvalidPage({
			title: {preserveType: true, max: 256, randCase: 2} as any, // title = 255
			content: {preserveType: true} as any,
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true},
				access: {preserveType: true},
				excerpt: {preserveType: true},
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	pagesWithBorderCases.push(
		generateInvalidPage({
			title: {preserveType: true} as any,
			content: {preserveType: true, max: 2 ** 53 - 2, randCase: 2} as any, // content = 2^53 - 1
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true},
				access: {preserveType: true},
				excerpt: {preserveType: true},
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	pagesWithBorderCases.push(
		generateInvalidPage({
			title: {preserveType: true} as any,
			content: {preserveType: true, max: 2 ** 53 - 1, randCase: 2} as any, // content = 2^53 - 1
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true},
				access: {preserveType: true},
				excerpt: {preserveType: true},
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	pagesWithBorderCases.push(
		generateInvalidPage({
			title: {preserveType: true} as any,
			content: {preserveType: true, max: 2 ** 53, randCase: 2} as any, // content = 2^53 - 1
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true},
				access: {preserveType: true},
				excerpt: {preserveType: true},
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	pagesWithBorderCases.push(
		generateInvalidPage({
			title: {preserveType: true} as any,
			content: {preserveType: true} as any,
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true, max: 999}, // tags = 10000
				access: {preserveType: true},
				excerpt: {preserveType: true},
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	pagesWithBorderCases.push(
		generateInvalidPage({
			title: {preserveType: true} as any,
			content: {preserveType: true} as any,
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true, max: 10000}, // tags = 10000
				access: {preserveType: true},
				excerpt: {preserveType: true},
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	pagesWithBorderCases.push(
		generateInvalidPage({
			title: {preserveType: true} as any,
			content: {preserveType: true} as any,
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true, max: 10001}, // tags = 10000
				access: {preserveType: true},
				excerpt: {preserveType: true},
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	pagesWithBorderCases.push(
		generateInvalidPage({
			title: {preserveType: true} as any,
			content: {preserveType: true} as any,
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true},
				access: {preserveType: true},
				excerpt: {preserveType: true, max: 299, randCase: 2}, // excerpt = 300
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	pagesWithBorderCases.push(
		generateInvalidPage({
			title: {preserveType: true} as any,
			content: {preserveType: true} as any,
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true},
				access: {preserveType: true},
				excerpt: {preserveType: true, max: 300, randCase: 2}, // excerpt = 300
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	pagesWithBorderCases.push(
		generateInvalidPage({
			title: {preserveType: true} as any,
			content: {preserveType: true} as any,
			publishSettings: {
				publicationState: {preserveType: true},
				publishDate: {preserveType: true},
				publishTime: {preserveType: true},
				tags: {preserveType: true},
				access: {preserveType: true},
				excerpt: {preserveType: true, max: 301, randCase: 2}, // excerpt = 300
				featured: {preserveType: true},
				author: {preserveType: true},
			},
		}),
	);
	return {
		pagesWithMissingKeys,
		pageWithInvalidTypesPerField,
		pagesWithBorderCases,
	};
};

//Tag

export const generateValidTag = (options?: Options<Tag>): Tag => {
	const name = faker.lorem.words();

	return {
		name,
		slug: faker.helpers.slugify(name),
		color: faker.color.rgb({prefix: ''}),
		description: faker.lorem.paragraph(),
	};
};

export const generateInvalidTag = (
	options?: InvalidOptions<Tag>,
): Invalid<Tag> => ({
	name: generateInvalidInput('word', options?.name),
	slug: generateInvalidInput('word', options?.slug),
	color: generateInvalidInput('color', options?.color),
	description: generateInvalidInput('text', options?.description),
});

export const generateManyValidTags = (amount = 100) => {
	const page: Tag[] = [];
	for (let i = 0; i < amount; i++) {
		page.push(generateValidTag());
	}
	return page;
};

export const generateManyInvalidTags = (variantAmounts = 5) => {
	const validTypes: Record<keyof Tag, InvalidOptionConfig['datatype']> = {
		name: 'word',
		slug: 'word',
		color: 'color',
		description: 'text',
	};
	// valid tags missing fields //TODO: multiply for variants if required :D //TODO: combinations
	const tagsWithMissingKeys = generateManyValidTags(4).map((tag, i) => {
		delete tag[Object.keys(tag)[i]];
		return tag;
	});

	const tagsWithInvalidTypesPerField: Invalid<Tag>[] = [].concat.apply(
		[],
		Object.entries(validTypes).map(([k, v]) =>
			[...types]
				.filter((t) => t !== v)
				.map((type) => generateInvalidTag({[k]: {datatype: type}})),
		),
	);

	//border cases

	const tagsWithBorderCases: Invalid<Tag>[] = [];
	tagsWithBorderCases.push(
		generateInvalidTag({
			name: {preserveType: true, max: 190, randCase: 2}, //name 191
			slug: {preserveType: true},
			description: {preserveType: true},
			color: {preserveType: true},
		}),
	);
	tagsWithBorderCases.push(
		generateInvalidTag({
			name: {preserveType: true, max: 191, randCase: 2}, //name 191
			slug: {preserveType: true},
			description: {preserveType: true},
			color: {preserveType: true},
		}),
	);
	tagsWithBorderCases.push(
		generateInvalidTag({
			name: {preserveType: true, max: 192, randCase: 2}, //name 191
			slug: {preserveType: true},
			description: {preserveType: true},
			color: {preserveType: true},
		}),
	);
	tagsWithBorderCases.push(
		generateInvalidTag({
			name: {preserveType: true},
			slug: {preserveType: true, max: 190, randCase: 2}, //slug 191
			description: {preserveType: true},
			color: {preserveType: true},
		}),
	);
	tagsWithBorderCases.push(
		generateInvalidTag({
			name: {preserveType: true},
			slug: {preserveType: true, max: 191, randCase: 2}, //slug 191
			description: {preserveType: true},
			color: {preserveType: true},
		}),
	);
	tagsWithBorderCases.push(
		generateInvalidTag({
			name: {preserveType: true},
			slug: {preserveType: true, max: 192, randCase: 2}, //slug 191
			description: {preserveType: true},
			color: {preserveType: true},
		}),
	);
	tagsWithBorderCases.push(
		generateInvalidTag({
			name: {preserveType: true},
			slug: {preserveType: true},
			description: {preserveType: true, max: 499, randCase: 2}, // description 500
			color: {preserveType: true},
		}),
	);
	tagsWithBorderCases.push(
		generateInvalidTag({
			name: {preserveType: true},
			slug: {preserveType: true},
			description: {preserveType: true, max: 500, randCase: 2}, // description 500
			color: {preserveType: true},
		}),
	);
	tagsWithBorderCases.push(
		generateInvalidTag({
			name: {preserveType: true},
			slug: {preserveType: true},
			description: {preserveType: true, max: 501, randCase: 2}, // description 500
			color: {preserveType: true},
		}),
	);

	// variantAmount * 5 fields * 3 cases + (4 borders * fields with border )
	return {
		tagsWithMissingKeys,
		tagsWithInvalidTypesPerField,
		tagsWithBorderCases,
	};
};

// CodeInjection

export const generateValidCodeInjection = (
	options?: Options<CodeInjection>,
): CodeInjection => ({
	header: faker.lorem.sentence(),
	footer: faker.lorem.sentence(),
});

export const generateInvalidCodeInjection = (
	options?: InvalidOptions<CodeInjection>,
): Invalid<CodeInjection> => ({
	header: generateInvalidInput('text', options?.header),
	footer: generateInvalidInput('text', options?.footer),
});

export const generateManyValidCodeInjections = (amount = 100) => {
	const codeInjection: CodeInjection[] = [];
	for (let i = 0; i < amount; i++) {
		codeInjection.push(generateValidCodeInjection());
	}
	return codeInjection;
};

export const generateManyInvalidCodeInjections = (variantAmounts = 5) => {
	const validTypes: Record<keyof CodeInjection,
		InvalidOptionConfig['datatype']> = {
		header: 'text',
		footer: 'text',
	};
	// valid codeInjections missing fields //TODO: multiply for variants if required :D //TODO: combinations
	const codeInjectionsWithMissingKeys = generateManyValidCodeInjections(2).map(
		(codeInjection, i) => {
			delete codeInjection[Object.keys(codeInjection)[i]];
			return codeInjection;
		},
	);

	const codeInjectionsWithInvalidTypesPerField: Invalid<CodeInjection>[] =
		[].concat.apply(
			[],
			Object.entries(validTypes).map(([k, v]) =>
				[...types]
					.filter((t) => t !== v)
					.map((type) => generateInvalidCodeInjection({[k]: {datatype: type}})),
			),
		);

	//border cases

	const codeInjectionsWithBorderCases: Invalid<CodeInjection>[] = [];
	codeInjectionsWithBorderCases.push(
		generateInvalidCodeInjection({
			header: {preserveType: true, max: 65534, randCase: 2}, //header 65535
			footer: {preserveType: true},
		}),
	);
	codeInjectionsWithBorderCases.push(
		generateInvalidCodeInjection({
			header: {preserveType: true, max: 65535, randCase: 2}, //header 65535
			footer: {preserveType: true},
		}),
	);
	codeInjectionsWithBorderCases.push(
		generateInvalidCodeInjection({
			header: {preserveType: true, max: 65536, randCase: 2}, //header 65535
			footer: {preserveType: true},
		}),
	);
	codeInjectionsWithBorderCases.push(
		generateInvalidCodeInjection({
			header: {preserveType: true},
			footer: {preserveType: true, max: 65534, randCase: 2}, //footer 65535
		}),
	);
	codeInjectionsWithBorderCases.push(
		generateInvalidCodeInjection({
			header: {preserveType: true},
			footer: {preserveType: true, max: 65535, randCase: 2}, //footer 65535
		}),
	);
	codeInjectionsWithBorderCases.push(
		generateInvalidCodeInjection({
			header: {preserveType: true},
			footer: {preserveType: true, max: 65536, randCase: 2}, //footer 65535
		}),
	);
	// variantAmount * 5 fields * 3 cases + (4 borders * fields with border )
	return {
		codeInjectionsWithMissingKeys,
		codeInjectionsWithInvalidTypesPerField,
		codeInjectionsWithBorderCases,
	};
};

import {faker} from '@faker-js/faker';
import {
	generateManyValidMembers,
	generateManyInvalidMembers,
	generateManyValidPosts,
	generateManyValidPages,
	generateManyValidTags,
	generateManyInvalidPosts,
	generateManyInvalidPages,
	generateManyInvalidTags,
	generateManyValidCodeInjections,
	generateManyInvalidCodeInjections,
} from './mock';
import {writeFileSync} from 'fs';

const [seed] = process.argv.slice(3);

faker.seed(parseInt(seed));

const members = {
	valid: generateManyValidMembers(100),
	invalid: generateManyInvalidMembers(),
};

const posts = {
	valid: generateManyValidPosts(100),
	invalid: generateManyInvalidPosts(),
};
const pages = {
	valid: generateManyValidPages(100),
	invalid: generateManyInvalidPages(),
};
const tags = {
	valid: generateManyValidTags(100),
	invalid: generateManyInvalidTags(),
};

const codeInjections = {
	valid: generateManyValidCodeInjections(100),
	invalid: generateManyInvalidCodeInjections(),
};

//TODO: add other entities

const payload = {members, posts, pages, tags, codeInjections};

BigInt.prototype['toJSON'] = function () {
	return this.toString(); // hotfix for parser
};

writeFileSync(
	`${__dirname}/../fixtures/data-pool.json`,
	JSON.stringify(payload, null, 4)
);

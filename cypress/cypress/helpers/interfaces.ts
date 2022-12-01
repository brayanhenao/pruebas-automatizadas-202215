type All =
	| number
	| string
	| boolean
	| bigint
	| symbol
	| undefined
	| null
	| object
	| PublishSettings
	| WYSIWYG
	| All[];

export type Invalid<T> = Record<keyof T, All>;
export type Options<T> = Record<keyof T, {min?; max?}>;
export type DataType =
	| 'number'
	| 'string'
	| 'boolean'
	| 'bigInt'
	| 'symbol'
	| 'null'
	| 'json'
	| 'text'
	| 'word'
	| 'email'
	| 'date'
	| 'time'
	| 'date-time'
	| 'color';
export type InvalidOptionConfig = {
	min?;
	max?;
	preserveType?: boolean;
	datatype?: DataType | DataType[];
	randCase?: number;
};
export type InvalidOptions<T> = Partial<
	Record<
		keyof T,
		T extends Post | Page
			? InvalidOptionConfig & Record<keyof PublishSettings, InvalidOptionConfig>
			: InvalidOptionConfig
	>
>;

export interface WYSIWYG {
	type: 'text'; //improve this to use other kind of WYSIWYG types
	content: string;
}

export interface PublishSettings {
	publicationState: 'draft' | 'published' | 'scheduled';
	publishDate?: string;
	publishTime?: string;
	tags: (string | Tag)[];
	access: 'public' | 'members' | 'paid' | 'tiers';
	excerpt: string;
	author?: Author[];
	featured: boolean;
}

export interface Member {
	name: string;
	email: string;
	labels?: string[];
	note?: string;
	subscribed: boolean;
}

export interface Post {
	title: string;
	content: WYSIWYG | WYSIWYG[];
	publishSettings: PublishSettings;
}

export interface Tag {
	name: string;
	color: string;
	slug: string;
	description: string;
}

export type Page = Post;

export interface Author {
	name: string;
}

export interface CodeInjection {
	header: string;
	footer: string;
}

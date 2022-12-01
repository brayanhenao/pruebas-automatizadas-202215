const {defineConfig} = require('cypress');

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		screenshotsFolder: process.env.CYPRESS_GHOST_OLD_VERSION
			? 'cypress/screenshots/old'
			: 'cypress/screenshots/new',
	},
});

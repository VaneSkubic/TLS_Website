module.exports = {
	html: {
		dest: './tmp/',
		ext: false,
	},
	sass: {
		dest: './tmp/assets/css/',
		maps: true,
		autoprefixer: true,
		cleanCss: false,
		sassOptions: {
			includePaths: 'node_modules',
		},
	},
	js: {
		dest: './tmp/assets/js',
	},
	images: {
		dest: './tmp/assets/img/',
	},
	browserSync: {
		dest: ['./tmp', './src/static'],
		notify: false,
		ui: false,
		online: false,
		ghostMode: {
			clicks: false,
			forms: false,
			scroll: false,
		},
	},
};

module.exports = {
	html: {
		dest: './dist/',
		ext: false,
	},
	sass: {
		dest: './dist/assets/css/',
		maps: false,
		autoprefixer: true,
		cleanCss: true,
		sassOptions: {
			includePaths: 'node_modules',
		},
	},
	js: {
		dest: './dist/assets/js',
	},
	images: {
		dest: './dist/assets/img/',
	},
	browserSync: {
		dest: './dist',
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

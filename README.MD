## Quick start

### Setup
//v12.8.1 my node
Make sure that you have Node v.11 or above being installed.

```
npm install
```

Copy `.env.default` to `.env` if it present.

### Production

Build an optimized version of app in `/dist/`:

```
gulp build:production
```

or just use:

```
gulp
```

### Development

Deploy app and start browsersync server + watchers:

```
gulp serve
```

### Basic configuration

Build settings located in `config.development.js` or `config.production.js`.

Webpack configuration in `webpack.development.js` or `webpack.production.js`.

Other config files can be applied with `NODE_ENV` environment variable.

### File structure

```bash
├── /dist/                      # Production directory (minified, optimized and compiled files)
└── /src/                       # The source code of the application
    ├── /assets/                # The assets of the aplication
        ├── /js/                # JavaScript source
        ├── /scss/              # SCSS styles
        ├── /img/               # Root of image files
    ├── .html                   # Html files
    ├── /partials/              # Html partials
├── /tmp/                       # Temporary served files
├── .env                        # Environment variables
├── .editorconfig               # IDE style configuration
├── babel.config                # Babel config
├── config.development.js       # Development build configuration
├── config.production.js        # Production build configuration
├── webpack.development.js      # Webpack development configuration
├── webpack.production.js       # Webpack production configuration
├── package.json                # Project meta and dependencies
```

### Gulp tasks

`gulp serve` deploy the app and start browsersync server + watchers

`gulp build` build the app in `/dist/` with current environment

`gulp build:production` build the app to `/dist/` with force production environment

`gulp html` compile Html files

`gulp sass` compile Sass files

`gulp js` build JS with Webpack + Babel

`gulp copy:static` copy and compress image files

`gulp browsersync` start a browser sync server

`gulp watch` start watching stream

`gulp clean` remove temporary files

`gulp clean:dist` clean the `/dist/` directory
# TLS_Website

# lxStarter Kit

Another one starter kit for React-based applications.

Key points:

* Routing and configurable site structure
* Responsive design
* Flexible layout
* Theming

Stack of technologies:

* React
* Typescript
* MobX
* Webpack
* ESLint
* Jest
* A built-in documentation and examples

# Demo

Online demo page is available [here](https://obscure-fjord-66160.herokuapp.com/home).

## Installation

### To Read documentation and experiments

1. Download or clone the repo.
2. `npm i` to install the dependencies.
3. Build with `npm run build` or `npm run build:dev`
4. Check the `dist` folder.

Or

3. `npm run start` to build and run devserver on `localhost:3030`

Or

2. `docker-compose up` (Docker must be installed).

### Production build with Docker

Build `docker build -f Dockerfile.prod -t lx-starter:prod .`

Then run `docker run -it --rm -p 1337:80 lx-starter:prod` and check it on http://localhost:1337/

Or, with Composer: `docker-compose -f docker-compose.prod.yml up -d --build`

### To use in your project

1. Download or clone the repo.
2. `npm i` to install the dependencies.
3. `npm run dry` to clean up all the example-related pages and code.
4. Use it.

I'd recommend installing it using the first way, then run devserver and read through the documentation and examples.

&copy; 2020-21 Oleksii Koshkin aka Lexey111

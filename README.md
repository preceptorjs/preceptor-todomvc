# Preceptor-TodoMVC

This is a sample project for Preceptor, Hodman, and Kobold, suggesting a way of using all of these in your own project.

This project mostly consists of the TodoMVC application realized in Ember-CLI.

However, the Preceptor tests (with all related tools) can be found in the ```tests/ui``` folder.

## Prerequisites

You will need the following things properly installed on your computer to run this project.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)

## Prerequisites installation

For Bower:
```
npm install -g bower
```

For Ember-CLI:
```
npm install -g ember-cli
```

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running the application

* `ember server`
* Visit the app at [http://localhost:4200](http://localhost:4200).

## Execute the Preceptor tests

* `npm test`
This will run the tests in PhantomJS on your local machine. Make sure that the Ember server is running in the background.

Additionally, you can also run the tests in other browsers on your local machine:
* `npm run firefox` - You need Firefox installed on your system
* `npm run chrome` - You need Chrome installed on your system
* `npm run phantomsjs` - Same as `npm test` 

Note: 
Chrome has a [known bug](https://code.google.com/p/chromedriver/issues/detail?id=294) for having trouble capturing screenshots.

## Results

* A JUnit XML file is created in `tests/ui/test-results.xml`
* Build screenshots are in `tests/ui/regression/build`
* Visual regression comparisons are in `tests/ui/regression/highlight`

##Example

Screenshot from Firefox:
![firefox](https://raw.githubusercontent.com/marcelerz/preceptor-todomvc/master/tests/ui/regression/approved/firefox-latest_UI-Todo-Index-Complete-multiple-entries-complete-entries-appearance_1.png)


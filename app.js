// REQUIRED
const fs = require('fs');
const generatePage = require('./src/page-template');

// GLOBAL VARIABLES
const profileDataArgs = process.argv.slice(2);
const [name, github] = profileDataArgs;

const pageHTML = generatePage(name, github);

// FUNCTIONS
fs.writeFile('./index.html', pageHTML, (err) => {
  if (err) throw err;

  console.log('Portfolio complete! Check out index.html to see the output.');
});

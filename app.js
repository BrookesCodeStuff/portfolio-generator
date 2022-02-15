// // REQUIRED
const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// // GLOBAL VARIABLES
// const pageHTML = generatePage(name, github);

// // FUNCTIONS
// Get basic information from user
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub username',
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
    },
  ]);
};

// Get project specific data from user
const promptProject = (portfolioData) => {
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

  console.log(`
  =================
  Add a New Project
  =================
  `);
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your Project?',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (required):',
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: [
          'JavaScript',
          'HTML',
          'CSS',
          'ES6',
          'jQuery',
          'Bootstrap',
          'Node',
        ],
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project (required)',
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false,
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false,
      },
    ])
    .then((projectData) => {
      // Push project data to array
      portfolioData.projects.push(projectData);
      // If the user confirms they want to add another project run the prompt again
      if (projectData.confirmAddProject) {
        // Include existing portfolioData so that a new array isn't created
        return promptProject(portfolioData);
      } else {
        // If user does not want to add another project, return the array with project data
        return portfolioData;
      }
    });
};

// FUNCTION CALLS
promptUser() // Prompt for basic info
  .then(promptProject) // Prompt for project data
  .then((portfolioData) => console.log(portfolioData));

// fs.writeFile('./index.html', pageHTML, (err) => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output.');
// });

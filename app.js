// // REQUIRED
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');
const { writeFile, copyFile } = require('./utils/generate-site');

// // FUNCTIONS
// Get basic information from user
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      },
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub username',
      validate: (githubNameInput) => {
        if (githubNameInput) {
          return true;
        } else {
          console.log('Please enter your GitHub username!');
          return false;
        }
      },
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message:
        'Would you like to enter some information about yourself for an "About" section?',
      default: true,
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
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
        message: 'What is the name of your project? (required)',
        validate: (projectName) => {
          if (projectName) {
            return true;
          } else {
            console.log("Please enter your project's name!");
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (required):',
        validate: (projectDescription) => {
          if (projectDescription) {
            return true;
          } else {
            console.log('Please enter the description of your project!');
            return false;
          }
        },
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
        validate: (githubLink) => {
          if (githubLink) {
            return true;
          } else {
            console.log('Please provide the GitHub link to the project!');
            return false;
          }
        },
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
  .then((portfolioData) => {
    return generatePage(portfolioData);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .then((writeFileResponse) => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then((copyFileResponse) => {
    console.log(copyFileResponse);
  })
  .catch((err) => {
    console.log(err);
  });

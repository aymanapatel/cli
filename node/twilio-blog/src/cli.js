import arg from "arg";
import inquirer from "inquirer";

const parseArgumentIntoOptions = (rawArgs) => {

    const args = arg(
        {
            '--git': Boolean,
            '--yes': Boolean,
            '--install': Boolean,
            '-g': Boolean,
            '-y': Boolean,
            '-i': Boolean,     
        },
        {
            argv: rawArgs.slice(2)
        }
    );

    return {
       skipPrompts: args['--yes'] || false,
       git: args['--git'] || false,
       template: args._[0],
       runInstall: args['--install'] || false,
    }
}


const promptForMissingOptions = async (options) => {

    const defaultTemplate = "Javascript"

    if(options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate
        }
    }

    
    const questions = [];
    if (!options.template) {
    questions.push({
        type: 'list',
        name: 'template',
        message: 'Please choose which project template to use',
        choices: ['JavaScript', 'TypeScript'],
        default: defaultTemplate,
    });
    }

    if (!options.git) {
    questions.push({
        type: 'confirm',
        name: 'git',
        message: 'Initialize a git repository?',
        default: false,
    });
    }

    const answers = await inquirer.prompt(questions);
    return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
    };

}

export const cli = async (args) => {
    let options = parseArgumentIntoOptions(args)
    options = await promptForMissingOptions(options)
    console.log(options)
    
}
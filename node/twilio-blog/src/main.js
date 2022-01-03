// import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);


const copyTemplateFiles = async (options) => {

    return copy(options.templateDirectory, options.targetDirectory, {
        clobber:false
    })

}

export const createProject = async (options) => {

    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd()
    };

    const currentFileUrl = import.meta.url;
    console.log(currentFileUrl)
    const templateDir = path.resolve(
        new URL(currentFileUrl).pathname,
        '../../templates',
        options.template.toLowerCase()
    )
    console.log(templateDir)

    

    options.templateDirectory = templateDir

    try {
        await access(templateDir, fs.constants.R_OK)
    } catch (err) {
        // console.error('%s Invalid template name', chalk.red.bold('ERROR'));
        console.error('%s Invalid template name', 'ERROR');
        process.exit(1)
    }

    console.log('Copy project files')
    await copyTemplateFiles(options)

    // console.error('%s Project ready', chalk.green.bold('DONE'));
    console.error('%s Project ready', 'DONE');

    return 
}
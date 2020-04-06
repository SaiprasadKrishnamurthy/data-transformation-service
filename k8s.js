/* eslint-disable */
const readline = require('readline');
const fs = require('fs');
const rimraf = require('rimraf');
const fsPromises = require('fs').promises;
const {
    once
} = require('events');
const spawn = require('child_process').spawn;
const dir = './__k8s';
const {
    name,
    version,
    dockerImageNameSpace,
    dockerImagePrefix
} = require('./package.json')
let envFiles;
const listAllEnvFiles = (startPath) => {
    const files = fs.readdirSync(startPath);
    envFiles = files.filter(val => val.match(/.env$/ig));
    console.log(" Found these Environment Files " + envFiles);
}

console.log(String.raw`
#     #                                       #####                         ###               
##   ##  ####  #####  #    # # #    #  ####  #     # #####   ##   #####      #  #    #  ####  
# # # # #    # #    # ##   # # ##   # #    # #         #    #  #  #    #     #  ##   # #    # 
#  #  # #    # #    # # #  # # # #  # #       #####    #   #    # #    #     #  # #  # #      
#     # #    # #####  #  # # # #  # # #  ###       #   #   ###### #####      #  #  # # #      
#     # #    # #   #  #   ## # #   ## #    # #     #   #   #    # #   #      #  #   ## #    # 
#     #  ####  #    # #    # # #    #  ####   #####    #   #    # #    #    ### #    #  ####  
`)
process.stdout.write('Initializing Build Process.\nBe prepared for take off. ☄️\n');
const configMap = __dirname + '/kubernetes/configmap-template.yml';
const serviceDeployment = __dirname + '/kubernetes/service-deployment-template.yml';
const addTabSpace = async (path) => {
    try {
        const readInterface = readline.createInterface({
            input: fs.createReadStream(path),
            output: process.stdout,
            terminal: false
        });
        let content;
        readInterface.on('line', (line) => {
            if (content) {
                content += `\t ${line.replace('=', ':')}\n`;
                return content;
            }
            content = `\t ${line.replace('=', ':')}\n`;

        });
        await once(readInterface, 'close');
        return content;
    } catch (e) {
        console.log(e);
    }
}
const readandUpdateFile = async (filePath, replaceMap) => {
    try {
        await fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return console.log(err);
            }
            const result = data.replace(/\$\{[a-zA-Z]+\}/g, m => replaceMap[m]);
            fs.writeFile(filePath, result, 'utf8', (err) => {
                if (err) return console.log(err);
            })
        })
    } catch (e) {
        console.log(e);
    }
}
const processEnvFiles = async (envFile) => {
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        } else {
            rimraf.sync('__k8s');
            fs.mkdirSync(dir);
        }
        for (let val of envFile) {
            process.stdout.write(`Creating deployment files for ${val} 🤑.\n`);
            let path = `${__dirname}/${val}`;
            const content = await addTabSpace(path);
            const configMapTemplateName = `${val.toString().replace('.', '')}-configmap-reference-data-service`
            const configTemplateDest = `${__dirname}/__k8s/${val.toString().replace('.', '')}-configmap-template.yml`;
            const serviceDeploymentTemplateDest = `${__dirname}/__k8s/${val.toString().replace('.', '')}-service-deployment-template.yml`;
            await fsPromises.copyFile(configMap, configTemplateDest);
            await fsPromises.copyFile(serviceDeployment, serviceDeploymentTemplateDest);
            const replaceMap = {
                '${configMapTemplateName}': configMapTemplateName,
                '${properties}': content,
                '${serviceName}': name,
                '${fullyQualifiedDockerImageName}': `${dockerImageNameSpace}/${dockerImagePrefix}`,
                '${version}': version
            }
            await readandUpdateFile(configTemplateDest, replaceMap);
            await readandUpdateFile(serviceDeploymentTemplateDest, replaceMap);
        }
        // Options -r recursive -j ignore directory info - redirect to stdout
        const zip = spawn('zip', ['-rj', __dirname + `/__k8s/k8s_descriptors_${name}_${version}.zip`, __dirname + '/build']);
        // End the response on zip exit
        zip.on('close', function (code) {
            process.stdout.write(`Files are zipped and in k8s_descriptors_${name}_${version}.zip 🤑.\n`);
            process.stdout.write(`This has been created by JS Lovers for JS Workers 🏆.\n`);
        });
    } catch (error) {
        console.log(error);
    }
}

listAllEnvFiles(__dirname);
processEnvFiles(envFiles)
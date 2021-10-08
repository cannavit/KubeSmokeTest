const execa = require('execa');
const Listr = require('listr');
 



const tasks = new Listr([
    {
        title: 'Verify Cluster Connection',
        task: () => {
            return new Listr([
                {
                    title: 'Get Cluster Information 01',
                    task: () => execa('kubectl', ['cluster-info']).then(result => {
                        result = result.stdout
                        if (result === '') {
                            throw new Error('Cluster inaccessible');
                        }
                    })
                },
                {
                    title: 'Get Cluster Information 02',
                    task: () => execa('kubectl', ['cluster-info']).then(result => {
                        result = result.stdout
                        if (result === '') {
                            throw new Error('Cluster inaccessible');
                        }
                    })
                },
            ], {concurrent: false});
        }
    },

    {
        title: 'Install package dependencies with Yarn',
        task: (ctx, task) => execa('yarn')
            .catch(() => {
                ctx.yarn = false;
                task.skip('Yarn not available, install it via `npm install -g yarn`');
            })
    },
    {
        title: 'Install package dependencies with npm',
        enabled: ctx => ctx.yarn === false,
        task: () => execa('npm', ['install'])
    },
    {
        title: 'Run tests',
        task: () => execa('npm', ['test'])
    },
    {
        title: 'Publish package',
        task: () => execa('npm', ['publish'])
    }
]);
 
tasks.run().catch(err => {
    console.error(err);
});
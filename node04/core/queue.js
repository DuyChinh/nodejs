const { Job } = require("../models/index");
module.exports = {
    addJob: async(name, data) => {
        const jobContent = {
            name, 
            data,
        }
        const content = JSON.stringify(jobContent);
        try {
            const job = await Job.create({
                name,
                content,
            });
            console.log(job);
            return job;
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    removeJob: async(id) => {
        try {
            const status = await Job.destroy({
                where: { id },
            });
            return status;
        } catch(e) {
            return false;
        }
    },

    execute: async() => {
        const [firstJob] = await Job.findAll({
            order: [["id", "asc"]],
            limit: 1,
        });
        if(firstJob) {
            const jobName = firstJob.name;
            console.log(jobName);
            const { data: jobData } = JSON.parse(firstJob.content);
            let triesNumber = 3;
            try{
                const { handle, tries } = require(process.cwd() +
                  "/jobs/" +
                  jobName +
                  ".js");

                await handle(jobData);
                await firstJob.destroy();
                console.log("success");
            } catch(e) {
                if(firstJob.execute_number < 3) {
                    await firstJob.update({
                        execute_number: firstJob.execute_number+1,
                    })
                    this.execute;
                } else {
                    await firstJob.destroy();
                }
                console.log("tries");
            }
            console.log("Job execute success");
        }
        
    }
}
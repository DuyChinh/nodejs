const cron = require("node-cron");
cron.schedule("* * * * *", () => {
    console.log("Mỗi phút 1 lần");
})
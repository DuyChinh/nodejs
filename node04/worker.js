const cron = require("node-cron");
const queue = require("./core/queue");
cron.schedule("*/30 * * * * *", () => {
    queue.execute();
});

// queue.execute();

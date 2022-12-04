const cds = require("@sap/cds");
const cron = require("node-cron");

cds.once("listening", () => {
  cron.schedule("*/2 * * * *", handleErroneousWorkflows);
});

async function handleErroneousWorkflows() {
  const srv = await cds.connect.to("FailedWorkflowsService");
  const instances = await srv.run(SELECT.from("WorkflowInstances"));
  console.log("Checking if there are erroneous workflows to handle...");

  if (instances && instances.length > 0) {
    console.log(`Handling ${instances.length} erroneous workflows`);

    for (const i of instances) {
      // check the failed workflow whether something useful can be done
      // ...
    }
  }
}

module.exports = cds.server;

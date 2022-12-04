class FailedWorkflowsService extends cds.ApplicationService {
  async init() {
    this.on("READ", `WorkflowInstances`, async (req) => {
      const workflowSrv = await cds.connect.to(
        "Workflow.API.for.Cloud.Foundry"
      );

      const instances = await workflowSrv.v1_workflow_instances({
        status: "ERRONEOUS",
      });

      // enrich with error messages
      for (const i of instances) {
        i.errors = await workflowSrv.v1_workflow_instances__error_messages({
          workflowInstanceId: i.id,
        });
      }

      return instances;
    });

    await super.init();
  }
}

module.exports = FailedWorkflowsService;

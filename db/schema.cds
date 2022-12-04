namespace wf;

using {Workflow.API.for.Cloud.Foundry as CFWorkflow} from '../srv/external/SAP_CP_Workflow_CF';
using {Workflow.API.for.Cloud.Foundry_types as CFWorkflowTypes} from '../srv/external/SAP_CP_Workflow_CF';

entity WorkflowInstances : CFWorkflowTypes.WorkflowInstance {
      errors : Association to many WorkflowInstanceErrors;
};

entity WorkflowInstanceErrors @(cds.autoexpose) : CFWorkflowTypes.WorkflowInstanceErrorMessage {}
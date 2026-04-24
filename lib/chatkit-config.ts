export function getChatKitConfig() {
  const workflowId = process.env.OPENAI_CHATKIT_WORKFLOW_ID?.trim() || "";

  return {
    workflowId,
    enabled: Boolean(process.env.OPENAI_API_KEY && workflowId),
  };
}

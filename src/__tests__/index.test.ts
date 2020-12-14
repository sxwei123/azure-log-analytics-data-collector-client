import { DataCollectorClient } from "..";

describe("The data collector client", () => {
  const { LOG_ANALYTICS_AGENT_KEY, LOG_ANALYTICS_WORKSPACE_ID } = process.env;

  const client = new DataCollectorClient(
    LOG_ANALYTICS_WORKSPACE_ID!,
    LOG_ANALYTICS_AGENT_KEY!
  );

  it("is able to send logs to Azure", async () => {
    const statusCode = await client.send("MyLogs", [
      {
        level: "info",
        message: "server starts",
      },
    ]);

    expect(statusCode).toEqual(200);
  });
});

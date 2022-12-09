import { DataCollectorClient } from "../src";

describe("The data collector client", () => {
  const { LOG_ANALYTICS_HOST, LOG_ANALYTICS_AGENT_KEY, LOG_ANALYTICS_WORKSPACE_ID } = process.env;

  if (!LOG_ANALYTICS_AGENT_KEY || !LOG_ANALYTICS_WORKSPACE_ID) {
    throw new Error(
      "LOG_ANALYTICS_AGENT_KEY and LOG_ANALYTICS_WORKSPACE_ID are required"
    );
  }
  const client = new DataCollectorClient(
    LOG_ANALYTICS_WORKSPACE_ID,
    LOG_ANALYTICS_AGENT_KEY,
    LOG_ANALYTICS_HOST
  );

  it("is able to send logs to Azure", async () => {
    const res = await client.send("MyLogs", [
      {
        level: "info",
        message: "server starts",
      },
    ]);

    expect(res.code).toEqual(200);
    expect(res.status).toEqual("OK");
  });

  it("will return MissingLogType error when log type is not provided", async () => {
    const res = await client.send("", [
      {
        level: "info",
        message: "server starts",
      },
    ]);

    expect(res.code).toEqual(400);
    expect(res.errorCode).toEqual("MissingLogType");
  });

  it("will return InvalidLogType error when log type contains invalid character", async () => {
    const res = await client.send("My-Logs", [
      {
        level: "info",
        message: "server starts",
      },
    ]);

    expect(res.code).toEqual(400);
    expect(res.errorCode).toEqual("InvalidLogType");
  });

  it("will return InvalidAuthorization error when authorization code is invalid", async () => {
    const client = new DataCollectorClient(
      LOG_ANALYTICS_WORKSPACE_ID,
      "X" + LOG_ANALYTICS_AGENT_KEY,
      LOG_ANALYTICS_HOST
    );
    const res = await client.send("MyLogs", [
      {
        level: "info",
        message: "server starts",
      },
    ]);

    expect(res.code).toEqual(403);
    expect(res.errorCode).toEqual("InvalidAuthorization");
  });
});

# Azure Log Analytics Data Collector Client

![Test status](https://github.com/sxwei123/azure-log-analytics-data-collector-client/workflows/Test/badge.svg?branch=master)

Node.JS wrapper for [Azure Monitor HTTP Data Collector API](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/data-collector-api).

## Installation

```sh
npm install azure-log-analytics-data-collector-client
```

Or with yarn:

```sh
yarn add azure-log-analytics-data-collector-client
```

## Usage

Javascript:

```js
const {
  DataCollectorClient,
} = require("azure-log-analytics-data-collector-client");

const client = new DataCollectorClient(
  "WORKSPACE_ID",
  "PRIMARY_KEY_OR_SECONDARY_KEY",
  "OPTIONAL_HOST"
);

client
  .send("MyLogs", [
    {
      level: "info",
      message: "server starts",
    },
  ])
  .then(console.log);
```

Typescript:

```ts
import { DataCollectorClient } from "azure-log-analytics-data-collector-client";

const client = new DataCollectorClient(
  "WORKSPACE_ID",
  "PRIMARY_KEY_OR_SECONDARY_KEY",
  "OPTIONAL_HOST"
);

client
  .send("MyLogs", [
    {
      level: "info",
      message: "server starts",
    },
  ])
  .then(console.log);
```

To get your `WORKSPACE_ID` and `PRIMARY_KEY_OR_SECONDARY_KEY`, in your workspace go to `Agents management` -> `Log Analytics agent instructions`.

The `OPTIONAL_HOST` is available for the ODS endpoint for your workspace cloud.
- Azure Public Cloud's `ods.opinsights.azure.com` is the default used if none is provided
- [Azure US Government](https://learn.microsoft.com/en-us/azure/azure-government/compare-azure-government-global-azure)'s host has to be set to `ods.opinsights.azure.us`

To query your logs, go to the `Logs` tab of your workspace and use `MyLogs_CL` as query table name. Sample query:

```
MyLogs_CL
| where TimeGenerated > ago(24h)
| limit 10
```

Please note that only alphanumeric and underscore can be used as table name. the `-` in the table name will be replaced with `_`.

## Response Object

| Property  | Optional |                                                                                                             Description |
| --------- | :------: | ----------------------------------------------------------------------------------------------------------------------: |
| code      |    no    |                                                                                                      HTTP response code |
| status    |    no    |                                                                                                    HTTP response status |
| errorCode |   yes    | [Error code](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/data-collector-api#return-codes) from server |
| errorMsg  |   yes    |                                                                                               Error message from server |

## Local Development

To run the integration test locally, grab the workspace id and the agent key and then run:

```sh
LOG_ANALYTICS_WORKSPACE_ID=<your_workspace_id> LOG_ANALYTICS_AGENT_KEY=<your_agent_key> LOG_ANALYTICS_HOST=<your_private_host> yarn test
```

## License

MIT

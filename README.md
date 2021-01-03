# Azure Log Analytics Data Collector Client

![Test status](https://github.com/sxwei123/azure-log-analytics-data-collector-client/workflows/Test/badge.svg?branch=master)

A node.js wrapper for [Azure Monitor HTTP Data Collector API](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/data-collector-api).

## Installation

```
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
  "PRIMARY_KEY_OR_SECONDARY_KEY"
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
  "PRIMARY_KEY_OR_SECONDARY_KEY"
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

To get your `WORKSPACE_ID` and `PRIMARY_KEY_OR_SECONDARY_KEY`, in your workspace go to `advanced settings` -> `connected resources` -> `Agents management`.

## Response Object

| Property  | Optional |                                                                                                             Description |
| --------- | :------: | ----------------------------------------------------------------------------------------------------------------------: |
| code      |    no    |                                                                                                      HTTP response code |
| status    |    no    |                                                                                                    HTTP response status |
| errorCode |   yes    | [Error code](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/data-collector-api#return-codes) from server |
| errorMsg  |   yes    |                                                                                               Error message from server |

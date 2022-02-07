export interface APIResponse {
  // HTTP response code
  code: number;
  // HTTP response status
  status: string;
  // error code as documented in https://docs.microsoft.com/en-us/azure/azure-monitor/platform/data-collector-api#return-codes
  errorCode?: string;
  // error message from server
  errorMsg?: string;
}

export interface AzureResponse {
  Error: string;
  Message: string;
}

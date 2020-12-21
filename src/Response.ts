export interface APIResponse {
  code: number;
  status: string;
  // error code as documented in https://docs.microsoft.com/en-us/azure/azure-monitor/platform/data-collector-api#return-codes
  errorCode?: string;
  errorMsg?: string;
}

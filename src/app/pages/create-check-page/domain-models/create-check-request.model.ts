export interface CreateCheckRequestModel {
  protocol: string;
  url: string;
  successCodes: Array<number>;
  method: 'string';
  timeoutSeconds: number
}
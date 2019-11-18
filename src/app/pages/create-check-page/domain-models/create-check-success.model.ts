export interface CreateCheckSuccessModel {
  id: string;
  userPhone: string;
  protocol: string;
  url: string;
  method: string;
  successCodes: Array<number>
  timeoutSeconds: number
}
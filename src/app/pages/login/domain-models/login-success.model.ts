export interface LoginSuccessModel {
  tokenObj: {
    phone: string;
    id: string;
    expires: string;
  }
}
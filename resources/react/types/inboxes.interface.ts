import { IBitcoinAddress, ILightningInvoice } from "./global.interface";

export interface IInbox {
  uuid: string;
  username: string;
  email: string;
  price: number;
  settings: IInboxSettings;
  created_at: string;
  updated_at: string;
}

export interface IInboxSettings {
  body: string;
  subject: string;
}

export interface ICreateInbox {
  username: string;
  email: string;
  price: number;
  settings: IInboxSettings;
}

export interface IUpdateInbox {
  username: string;
  email: string;
  price: number;
  settings: IInboxSettings;
}

export interface IInboxMessage {
  uuid: string;
  body: string;
  from: string;
  to: string;
  subject: string;
  signature: string;
  token: string;
  amount: number;
  lightning_invoice: ILightningInvoice;
  bitcoin_address: IBitcoinAddress;
}

export interface IInboxMessageRequest {
  inbox: IInbox;
  gated_message: IInboxMessage;
  unified_qr_code: string;
  onchain_qr_code: string;
  lightning_qr_code: string;
  checkout_link: string;
}

import { IBitcoinAddress, ILightningInvoice } from "./global.interface";

export interface INodelessAddress {
  uuid: string;
  username: string;
  email: string;
  price: number;
  settings: INodelessAddressSettings;
  created_at: string;
  updated_at: string;
  nostr_npub?: string;
  nostr_hexpub?: string;
}

export interface INodelessAddressSettings {
  body: string;
  subject: string;
}

export interface ICreateNodelessAddress {
  username: string;
  email: string;
  price: number;
  settings: INodelessAddressSettings;
}

export interface IUpdateNodelessAddress {
  username: string;
  email: string;
  price: number;
  settings: INodelessAddressSettings;
}

export interface INodelessAddressMessage {
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

export interface INodelessAddressMessageRequest {
  inbox: INodelessAddress;
  gated_message: INodelessAddressMessage;
  unified_qr_code: string;
  onchain_qr_code: string;
  lightning_qr_code: string;
  checkout_link: string;
}

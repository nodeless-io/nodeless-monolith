import {
  IBitcoinAddress,
  ILightningInvoice,
  IPaginatedList,
} from "./global.interface";

export interface IStoreSettings {
  bg_color: string;
  text_color: string;
  highlight_color: string;
}

export interface IStoreRevenueMetrics {
  all_time: string;
  last_thirty_days: string;
  last_seven_days: string;
  last_day: string;
  today: string;
}

export interface IStore {
  id: number;
  uuid: string;
  user_id: number;
  name: string;
  settings: IStoreSettings;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  store_revenue_metrics: IStoreRevenueMetrics;
  url?: string;
  email?: string;
}

export interface IStorePaginatedList extends IPaginatedList {
  data: IStore[];
}

export interface ICreateStoreInvoice {
  name: string;
  url?: string;
  email?: string;
  settings: IStoreSettings;
}

export interface IStoreWebhook {
  id: number;
  uuid: string;
  store_id: number;
  name: string;
  url: string;
  status: string;
  events: string[];
  created_at: string;
  updated_at: string;
}

export interface IUpdateStoreWebhook {
  url: string;
  events: string[];
  status: string;
}

export interface IStoreInvoice {
  id: number;
  uuid: string;
  store_id: number;
  amount: number;
  status: string;
  buyer_email: string;
  redirect_url: string;
  type: string;
  created_at: string;
  updated_at: string;
  payment_request: string;
  onchain_addr: string;
  lightning_invoice: ILightningInvoice;
  bitcoin_address: IBitcoinAddress;
}

export interface IStoreNewInvoice {
  amount: string;
  currency: string;
  buyer_email?: string;
  redirect_url?: string;
}

export interface IStoreInvoicePaginatedList extends IPaginatedList {
  data: IStoreInvoice[];
}

export interface IDashboardRevenueChart {
  total: number;
  labels: string[];
  data: number[];
}

export interface IStoreInvoiceStatus {
  status: string;
}

export interface IPaginatedList {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: IPaginationLink[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface IPaginationLink {
  url: string;
  label: string;
  active: boolean;
}

export interface IBitcoinAddress {
  address: string;
}

export interface ILightningInvoice {
  memo: string;
  description_hash: string;
  r_preimage: string;
  r_hash: string;
  payment_request: string;
  amount: number;
  settled: number;
  expiry: number;
  cltv_expiry: number;
  fallback_addr: string;
  amt_paid: string;
  payment_addr: string;
  features: string;
  state: string;
  htlcs: string;
  lightning_invoiceable_id: number;
  lightning_invoiceable_type: string;
  settled_at: number;
}

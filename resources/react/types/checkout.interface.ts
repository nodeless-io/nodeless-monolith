import { IBitcoinAddress, ILightningInvoice } from "./global.interface";
import { IStore, IStoreInvoice } from "./stores.interface";

export interface ICheckout {
  store: IStore;
  store_invoice: IStoreInvoice;
  unified_qr_code: string;
  onchain_qr_code: string;
  lightning_qr_code: string;
  checkout_link: string;
}

import { IPaginatedList } from "./global.interface";

export interface IPaywall {
  uuid: string;
  name: string;
  type: string;
  price: number;
  settings: IPaywallSettings;
  created_at: string;
  updated_at: string;
}

export interface IPaywallSettings {}

export interface IPaywallPaginatedList extends IPaginatedList {
  data: IPaywall[];
}

export interface ICreatePaywall {
  name: string;
  type: string;
  price: number;
  settings: IPaywallSettings;
}

export interface IUpdatePaywall {
  name: string;
  type: string;
  price: number;
  settings: IPaywallSettings;
}

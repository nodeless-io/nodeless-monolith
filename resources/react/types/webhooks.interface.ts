export interface ICreateStoreWebhook {
  type: string;
  uuid: string;
  url: string;
  secret: string;
  events: string[];
  status: string;
}

export interface ICreateDonationPageWebhook {
  type: string;
  uuid: string;
  url: string;
  secret: string;
  events: string[];
  status: string;
}

export interface ICreateInboxWebhook {
  type: string;
  uuid: string;
  url: string;
  secret: string;
  events: string[];
  status: string;
}

export interface ICreatePaywallWebhook {
  type: string;
  uuid: string;
  url: string;
  secret: string;
  events: string[];
  status: string;
}

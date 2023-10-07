import { IPaginatedList } from "./global.interface";

export interface IContest {
  uuid: string;
  name: string;
  slug: string;
  type: string;
  status: string;
  description: string;
  settings: IContestSettings;
  created_at: string;
  updated_at: string;
  starts_at: string;
  ends_at: string;
}

export interface IContestSettings {
  bg_color: string;
  text_color: string;
  highlight_color: string;
  logo_url: string;
  header_url: string;
}

export interface IContestPaginatedList extends IPaginatedList {
  data: IContest[];
}

export interface ICreateContest {
  name: string;
  slug: string;
  type: string;
  status: string;
  description: string;
  settings: IContestSettings;
  starts_at: string;
  ends_at: string;
}

export interface IUpdateContest {
  name: string;
  slug: string;
  type: string;
  status: string;
  description: string;
  settings: IContestSettings;
  starts_at: string;
  ends_at: string;
}

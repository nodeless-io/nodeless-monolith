import { IPaginatedList } from "./global.interface";

export interface IDonationPage {
    uuid: string;
    name: string;
    slug: string;
    description: string;
    settings: IDonationPageSettings;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    header_image?: string
}

export interface IDonationPageSettings {
    bg_color: string;
    text_color: string;
    highlight_color: string;
    logo_url: string;
    header_url: string;
}

export interface IDonationPagePaginatedList extends IPaginatedList {
    data: IDonationPage[];
}

export interface ICreateDonationPage {
    name: string;
    slug: string;
    description: string;
    settings: IDonationPageSettings;
}

export interface IUpdateDonationPage {
    name: string;
    slug: string;
    description: string;
    settings: IDonationPageSettings;
}

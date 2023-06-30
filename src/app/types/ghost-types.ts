import { Settings } from "@tryghost/content-api";

interface UpdateSettings extends Settings {
    accent_color?: string;
}

type StringSlug = {
    slug: string
}

type NumberItem = {
    item: number 
}

type StringItem = {
    item: string
}

type StringItemParams = {
    params: StringItem
}

export type {
    UpdateSettings,
    StringSlug,
    NumberItem,
    StringItem,
    StringItemParams
};
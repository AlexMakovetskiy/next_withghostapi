import { Pagination, PostOrPage, Settings } from "@tryghost/content-api";
import { ReactNode } from "react";

interface IRootLayout {
    children: ReactNode
}

interface ICard {
    item: PostOrPage
}

interface ISettings {
    setting: Settings
}

interface IPagination {
    item: Pagination 
}

export type {
    IRootLayout,
    ICard,
    ISettings,
    IPagination
};
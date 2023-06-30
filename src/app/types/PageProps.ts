import { ReactNode } from "react";
import { Settings } from "@tryghost/content-api";

import { StringSlug } from "./ghost-types";

interface IStringSlugParams {
    params: StringSlug
}

interface ITag {
    params: StringSlug
}

interface IBlogLayout {
    setting: Settings, 
    children: ReactNode
}

export type {
    IStringSlugParams,
    ITag,
    IBlogLayout
}
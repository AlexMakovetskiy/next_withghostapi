import type { Metadata } from "next";
import type { PostsOrPages } from "@tryghost/content-api";

import { NumberItem, StringItemParams } from "@/app/types/ghost-types";
import PaginationItem from "@/app/components/Pagination";
import Card from "@/app/components/Card";
import { getPaginationPosts, getPosts } from "@/app/api/ghost-api";

export async function generateStaticParams() {
    const posts: PostsOrPages = await getPosts();
    let paginationItem: NumberItem[] = [];

    for (let index = 1; index <= posts?.meta.pagination.pages; index++) {
        paginationItem.push({
            item: index,
        })
    }
    return paginationItem;
}

export default async function Pagination({ params }: StringItemParams) {
    let getParams: number = Number.parseInt(params.item);
    const getPosts: PostsOrPages = await getPaginationPosts(getParams);
    console.log(getPosts.meta.pagination);
    

    return (
        <>
            <main className="container my-12 mx-auto grid grid-cols-1 gap-2 md:gap-3 lg:gap-4 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
                {
                    getPosts?.map(
                        item => {
                            return <Card key={item.uuid} item={item} />
                        })
                }
            </main>
            <PaginationItem item={getPosts.meta.pagination} />
        </>
    );
}
// import { getSinglePage, getAllPages } from "../../ghost-client";

import { notFound } from 'next/navigation';
import type { PostOrPage } from "@tryghost/content-api";

import { IStringSlugParams } from '@/app/types/PageProps';
import { getSingleTaggedPage, getSinglePage, getAllPages } from '@/app/api/ghost-api';

import "../../cards.min.css";

// genrate Static slug or params for blog

export async function generateStaticParams() {
    const pages: PostOrPage[] = await getAllPages();

    return pages.map((post: PostOrPage) => ({
        slug: post.slug,
    }));
}

async function Pages({ params }: IStringSlugParams) {

    // fetch single page
    const getPage = await getSinglePage(params.slug);

    // handle 404 error
    if (!getPage) {
        notFound()
    }

    return (
        <>
            <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 dark:bg-gray-900">
                <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                    <article className="mx-auto w-full max-w-3xl prose prose-xl prose-p:text-gray-800  dark:prose-p:text-gray-100 sm:prose-base prose-a:no-underline prose-blue dark:prose-invert">
                        <h1 className="mb-14 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                            {getPage.title}
                        </h1>
                        {
                            getPage.html !== undefined && getPage.html !== null &&
                            <div dangerouslySetInnerHTML={{ __html: getPage?.html }}></div>

                        }
                    </article>
                </div>
            </main>
        </>
    )
}

export default Pages;
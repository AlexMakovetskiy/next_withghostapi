// import Newsletter from "./Newsletter";
import Link from "next/link";
import Image from "next/image";

import { getSinglePost, getPosts } from "@/app/api/ghost-api";

// import icon
import { FaAngleLeft } from "react-icons/fa";

// types for typescript
import type { Metadata } from "next";
import type { PostOrPage } from "@tryghost/content-api";
import { IStringSlugParams } from "@/app/types/PageProps";

// format the date
import { format } from 'date-fns'

// css for card
import "../../cards.min.css"


export async function generateStaticParams() {
    const posts = await getPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

async function Read({ params }: IStringSlugParams) {
    const getPost = await getSinglePost(params.slug)

    return (
        <>
            <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 dark:bg-gray-900">
                <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                    {
                        !!getPost && 
                            <article className="mx-auto w-full max-w-3xl prose prose-xl prose-p:text-gray-800  dark:prose-p:text-gray-100 sm:prose-base prose-a:no-underline prose-blue dark:prose-invert">
                                <div className="flex mb-4 w-full justify-between">
                                    <Link className="inline-flex items-center" href={`/`}>
                                        <FaAngleLeft /> Back
                                    </Link>

                                    {
                                        
                                        getPost.primary_tag ? 
                                            <Link href={`/tags/${getPost?.primary_tag.slug}`}>
                                                # { getPost?.primary_tag.name }
                                            </Link> : ""
                                    }
                                </div>

                                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                                    {getPost.title}
                                </h1>

                                <p className="lead">
                                    {getPost.excerpt}
                                </p>

                                <header className="mb-4 lg:mb-6 not-format">
                                    <address className="flex items-center mb-6 not-italic">
                                        <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">

                                            {
                                                getPost.primary_author !== null && getPost.primary_author !== undefined && getPost.primary_author.profile_image !== null && getPost.primary_author.profile_image !== undefined &&
                                                    <Image width={32} height={32} className="mr-4 w-10 h-10 rounded-full" src={getPost.primary_author.profile_image} alt="dfhdsfg" />
                                            }
                                            {
                                                getPost.primary_author ? 
                                                    <Link href={`/authors/${getPost?.primary_author.slug}`} rel="author" className="text-xl font-bold text-gray-800 dark:text-white">
                                                        {getPost?.primary_author.name}
                                                    </Link> : " "
                                            }

                                            {
                                                getPost.published_at ? 
                                                    <time className="text-base font-light text-gray-800 dark:text-white mx-1" dateTime={getPost?.published_at} title={format(new Date(getPost?.published_at), 'yyyy-MM-dd')}>
                                                        {format(new Date(getPost?.published_at), 'dd MMMM, yyyy')}
                                                    </time> : ""
                                            }
                                            <div className="text-base w-1 h-1 rounded-full bg-black dark:bg-white mx-1"></div>
                                            <p className="text-base font-light text-gray-500 dark:text-gray-400"> {getPost.reading_time}  Min Read</p>
                                        </div>
                                    </address>
                                </header>

                                {
                                    getPost.feature_image !== null && getPost.feature_image !== undefined &&
                                        <figure>
                                            <Image className="mx-auto" width={1000} height={250} src={getPost.feature_image} alt="dfgdfg" />
                                            <figcaption className="text-center"
                                                dangerouslySetInnerHTML={{ __html: getPost?.feature_image_caption ?? ""}}>
                                            </figcaption>
                                        </figure>
                                }

                                <div dangerouslySetInnerHTML={{ __html: getPost?.html ?? ""}}></div>
                            </article>
                    }
                </div>
            </main>
            {/* <Newsletter /> */}
        </>
    )
}

export default Read;
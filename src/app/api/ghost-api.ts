import GhostContentAPI, { Author, PostOrPage } from "@tryghost/content-api";

const api = new GhostContentAPI({
    url: "http://127.0.0.1:2368" as string,
    key: "60b0bb7ed5c52a1fefeccd3049" as string,
    version: "v5.0",
});

export async function getNavigation() {
    return await api.settings.browse()
}

export async function getPosts() {
    return await api.posts
        .browse({
            include: ["tags", "authors"],
            limit: 10
        })
        .catch(err => {
            throw new Error(err)
        });
}

export async function getSinglePost(postSlug: string) {
    return await api.posts
        .read({
            slug: postSlug
        }, { include: ["tags", "authors"] })
        .catch(err => {
            console.error(err);
        });
}

export async function generateStaticParams() {

    // fetch All posts

    const posts = await getPosts()
    
    // return the slug 
    
    return posts.map((post) => ({
        slug: post.slug,
    }));
    
}

// return all posts realted to tag slug
export async function getTagPosts(tagSlug: string) {
    return await api.posts
        .browse({ 
            filter: `tag:${tagSlug}`, 
            include: 'count.posts' 
        })
        .catch(err => {
            throw new Error(err)
        });
}

// return all the slugs to build static with generateStaticParams
export async function getAllTags() {
    return await api.tags
    .browse({
        limit: "all"
    }).catch(err => {
        console.log(err)
    })
}

// get author meta Data

export async function getSingleAuthor(authorSlug: string) {
    return await api.authors
        .read({
            slug: authorSlug
        }, { include: ["count.posts"] })
        .catch(err => {
            console.log(err)
        });
}

  // get author related posts

export async function getSingleAuthorPosts(authorSlug: string) {
    return await api.posts
        .browse({ 
            filter: `authors:${authorSlug}` 
        })
        .catch(err => {
            console.log(err)
        })
};

  // get All author from Ghost CMS for generateStaticParams

export async function getAllAuthors() {
    return await api.authors
        .browse({
            limit: "all"
        })
        .catch(err => {
            throw new Error(err)
    });
}

export async function getAllPages() {
    return await api.pages
        .browse({
            include: ["tags"],
            limit: "all"
        })
        .catch(err => {
            throw new Error(err)
        });
}

// fetch all pages

export async function getSinglePage(pageSlug: string) {
    return await api.pages
        .read({
            slug: pageSlug
        })
        .catch(err => {
            console.error(err);
        });
}

// single page data 

export async function getSingleTaggedPage(pageSlug: string) {
    return await api.pages
        .read({
            slug: pageSlug
        }, { include: ["tags"] })
        .catch(err => {
            console.error(err);
        });
}

  // 
export async function getPaginationPosts(page: number) {
    return await api.posts
        .browse({
            include: ["tags", "authors"],
            limit: 10,
            page: 0
        })
        .catch(err => {
            throw new Error(err)
        });
}
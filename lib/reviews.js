// import { readdir, readFile } from 'node:fs/promises';
import { marked } from "marked";
import matter from "gray-matter";
import qs from 'qs';

export const CACHE_TAG_REVIWES = 'reviews';
const CMS_URL = 'http://localhost:1337';

export async function getReview(slug) {
    // const text = await readFile(`./content/reviews/${slug}.md`, 'utf8')
    // const {
    //     content,
    //     data: { title, date, image },
    // } = matter(text);
    // const body = marked(content, { headerIds: false, mangle: false });
    // return { slug, title, date, image, body }
    const { data } = await fetchReviews({
        filters: { slug: { $eq: slug } },
        fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
        populate: { image: { fields: ['url'] } },
        pagination: { pageSize: 1, withCount: false },
    })
    if (data.length == 0) {
        return null
    }
    const item = data[0]
    return {
        ...toReview(item),
        body: marked(item.attributes.body, { headerIds: false, mangle: false }),
    }
}


export async function getReviews(pageSize, page) {
    // const slugs = await getSlugs()
    // const reviews = []
    // for (const slug of slugs) {
    //     const review = await getReview(slug)
    //     if (review.length > 0) {
    //         reviews.push(review)
    //     }
    // }
    // reviews.sort((a, b) => b.date.localeCompare(a.date))
    // return reviews
    const { data, meta } = await fetchReviews({
        fields: ['slug', 'title', 'subtitle', 'publishedAt'],
        populate: { image: { fields: ['url'] } },
        sort: ['publishedAt:desc'],
        pagination: { pageSize, page },
    })
    // return data.map(toReview)
    return {
        pageCount: meta.pagination.pageCount,
        reviews: data.map(toReview),
    }
}

export async function getSearchableReviews() {
    const { data } = await fetchReviews({
        fields: ['slug', 'title'],
        sort: ['publishedAt:desc'],
        pagination: { pageSize: 100 },
    })

    return data.map(({ attributes }) => ({
        slug: attributes.slug,
        title: attributes.title,
    }))
}

export async function getSlugs() {
    // const files = await readdir(`./content/reviews`)
    // return files.filter((file) => file.endsWith('.md')).map((file) => file.slice(0, -'.md'.length));
    const { data } = await fetchReviews({
        fields: ['slug'],
        sort: ['publishedAt:desc'],
        pagination: { pageSize: 100 },
    })

    return data.map((item) => item.attributes.slug)
}

export async function getFeaturedReview() {
    const reviews = await getReviews()
    return reviews[0];
}

export async function fetchReviews(parameters) {
    const url = `${CMS_URL}/api/reviews` + '?' + qs.stringify(parameters, { encodeValuesOnly: true })
    const response = await fetch(url, {
        // cache:'no-store'
        next: { //Good aproach
            // revalidate: 30, //seconds
            tags: [CACHE_TAG_REVIWES],
        }
    })
    if (!response) {
        return new Error(`CMS returned ${response.status} for ${url}`)
    }
    return await response.json()
}

function toReview(item) {
    const { attributes } = item
    return {
        slug: attributes.slug,
        title: attributes.title,
        subtitle: attributes.subtitle,
        date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
        image: CMS_URL + attributes.image.data.attributes.url,
    }
}
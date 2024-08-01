import Heading from "../../../components/Heading";
import ShareLinkButton from "../../../components/ShareLinkButton";
import ShareButtons from "../../../components/ShareButtons";

import { getReview, getSlugs } from "../../../lib/reviews";

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
  // return [{ slug: "hellblade" }, { slug: "hollow-knight" }];
}

export async function generateMetadata({ params: { slug } }) {
  const review = await getReview(slug);
  return { title: review.title };
}

export default async function ReviewPage({ params: { slug } }) {
  const review = await getReview(slug);
  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="italic pb-2">{review.date}</p>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        {/* <ShareLinkButton /> */}
        <ShareButtons/>
      </div>
      <img
        src={review.image}
        alt="stardew-valley"
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <article dangerouslySetInnerHTML={{ __html: review.body }}></article>
    </>
  );
}

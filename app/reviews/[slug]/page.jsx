import Image from "next/image";
import Heading from "../../../components/Heading";
import ShareLinkButton from "../../../components/ShareLinkButton";
import ShareButtons from "../../../components/ShareButtons";
import { getReview, getSlugs } from "../../../lib/reviews";
import { notFound } from "next/navigation";

// export const dynamic = 'force-dynamic';
// export const revalidate = 30;

// export async function generateStaticParams() {
//   const slugs = await getSlugs();
//   // console.log("[ReviewPage] generateStaticParams",slugs);
//   return slugs.map((slug) => ({ slug }));
// }

export async function generateMetadata({ params: { slug } }) {
  const review = await getReview(slug);
  if(!review){
    notFound()
  }
  // console.log('[ReviewPage] review : ', review);
  return { title: review.title };
}

export default async function ReviewPage({ params: { slug } }) {
  const review = await getReview(slug);
  if(!review){
    notFound()
  }
  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="font-semibold pb-3">{review.subtitle}</p>

      {/* <p className="italic pb-2">{review.date}</p> */}
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareLinkButton />
        {/* <ShareButtons/> */}
      </div>
      <Image
        src={review.image}
        alt="stardew-valley"
        priority
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <article dangerouslySetInnerHTML={{ __html: review.body }}></article>
    </>
  );
}

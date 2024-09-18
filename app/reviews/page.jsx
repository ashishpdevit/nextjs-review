import Link from "next/link";
import Heading from "../../components/Heading";
import { getReviews, getSearchableReviews } from "../../lib/reviews";
import Image from "next/image";
import PaginationBar from "../../components/PaginationBar";
import SearchBox from "../../components/SearchBox";

// export const dynamic = 'force-dynamic';
// export const revalidate = 30; //seconds
const PAGE_SIZE = 6;
export const metadata = {
  title: "Reviews",
  description: "",
};
export default async function ReviewsPage({ searchParams }) {
  const page = parsePageParam(searchParams.page);
  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);
  const searchableReviews = await getSearchableReviews()
  // console.log("[Reviews page]: ", reviews.map((review) => review.slug).join(","));
  console.log(page);

  return (
    <>
      <Heading>Reviews Page</Heading>
      {/* <div className="flex gap-2 pb-3">
        <Link href={`/reviews?page=${page - 1}`}>&lt;</Link>
        <span>Page {page} of {pageCount}</span>
        <Link href={`/reviews?page=${page + 1}`}>&gt;</Link>
      </div> */}
      <div className="flex gap-3 mb-3">
        <PaginationBar href="/reviews" page={page} pageCount={pageCount} />
        <SearchBox reviews={searchableReviews}/>
      </div>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews?.map((review, index) => (
          <li
            key={review.slug}
            className="bg-white border rounded shadow w-80 hover:shadow-xl"
          >
            <Link href={`/reviews/${review.slug}`}>
              <Image
                src={review.image}
                alt={review.slug}
                priority={index === 0}
                width="320"
                height="180"
                className="rounded-t"
              />
              <h2 className="font-semibold font-orbitron text-center py-1">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
        {/* <li className="bg-white border rounded shadow w-80 hover:shadow-xl">
          <Link href="/reviews/stardew-valley">
            <img
              src="/images/stardew-valley.jpg"
              alt="stardew-valley"
              width="320"
              height="180"
              className="rounded-t"
            />
            <h2 className="font-semibold font-orbitron text-center py-1"> Stardew Valley</h2>
          </Link>
        </li>
        <li className="bg-white border rounded shadow w-80 hover:shadow-xl">
          <Link href="/reviews/hollow-knight">
            <img
              src="/images/hollow-knight.jpg"
              alt="hollow-knight"
              width="320"
              height="180"
              className="rounded-t"
            />
            <h2 className="font-semibold font-orbitron text-center py-1"> Hollow Knight</h2>
          </Link>
        </li> */}
      </ul>
    </>
  );
}

function parsePageParam(paramValue) {
  if (paramValue) {
    const page = parseInt(paramValue);
    if (isFinite(paramValue) && page > 0) {
      return page;
    }
  }
  return 1;
}

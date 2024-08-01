import Link from "next/link";
import Heading from "../../components/Heading";
import { getReviews } from "../../lib/reviews";

export const metadata = {
  title: "Reviews",
  description: "",
};
export default async function ReviewsPage() {
  const reviews = await getReviews();
  // console.log("Reviews : ", reviews);

  return (
    <>
      <Heading>Reviews Page</Heading>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review) => (
          <li key={review.slug} className="bg-white border rounded shadow w-80 hover:shadow-xl">
            <Link href={`/reviews/${review.slug}`}>
              <img
                src={review.image}
                alt={review.slug}
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

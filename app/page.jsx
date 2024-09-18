import React from "react";
import Heading from "../components/Heading";
import { getFeaturedReview, getReviews } from "../lib/reviews";
import Link from "next/link";
import Image from "next/image";

// export const dynamic = 'force-dynamic';
// export const revalidate = 30; //seconds

export const metadata = {
  title: "Indie Gamer",
  description: "Only the best Indie Games for you !",
};

export default async function HomePage() {
  // const review = await getFeaturedReview();
  const {reviews} = await getReviews(3);
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="pb-3">
        Only the best indie games, reviewed for you.
      </p>
      <ul className="flex flex-col gap-3">
        {reviews.map((review, index) => (
          <li key={review.slug}
            className="bg-white border rounded shadow w-80
                       hover:shadow-xl sm:w-full">
            <Link href={`/reviews/${review.slug}`}
              className="flex flex-col sm:flex-row">
              <Image src={review.image} alt="" priority={index === 0}
                width="320" height="180"
                className="rounded-t sm:rounded-l sm:rounded-r-none"
              />
              <div className="px-2 py-1 text-center sm:text-left">
                <h2 className="font-orbitron font-semibold">
                  {review.title}
                </h2>
                <p className="hidden pt-2 sm:block">
                  {review.subtitle}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

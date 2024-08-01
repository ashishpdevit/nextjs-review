import React from "react";
import Heading from "../components/Heading";
import { getFeaturedReview } from "../lib/reviews";
import Link from "next/link";

export const metadata = {
  title: "Indie Gamer",
  description: "Only the best Indie Games for you !",
};

export default async function HomePage() {
  const review = await getFeaturedReview();
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p>Only the best Indie Games for you !</p>
      <div
        key={review.slug}
        className="bg-white border rounded shadow w-80 hover:shadow-xl"
      >
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
      </div>
    </>
  );
}

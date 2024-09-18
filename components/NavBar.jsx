import NavLink from "./NavLink";

export default function NavBar() {
  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          {/* <Link href="/" className="font-bold font-orbitron text-orange-800 hover:underline">Indie Gamer</Link> */}
          <NavLink href="/">Indie Gamer</NavLink>
        </li>
        <li className="ml-auto">
          {/* <Link href="/reviews" className="text-orange-800 hover:underline">
            Reviews
          </Link> */}
          <NavLink href="/reviews">Reviews</NavLink>
        </li>
        <li>
          {/* <Link href="/about" className="text-orange-800 hover:underline">
            About
          </Link> */}
          <NavLink href="/about" prefetch={false}>About</NavLink>
        </li>
      </ul>
    </nav>
  );
}

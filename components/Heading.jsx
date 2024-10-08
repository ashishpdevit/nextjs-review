import React from "react";
import {orbitron} from "../app/font";

export default function Heading({ children }) {
  return <h1 className={`font-bold pb-3 text-2xl font-orbitron ${orbitron.className}`}>{children}</h1>;
}

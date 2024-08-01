import React from "react";

export default function ReviewLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      {/* <div style={{ border: "solid red 1px" }}>[menubar]</div> */}
      <div>{children}</div>
    </div>
  );
}

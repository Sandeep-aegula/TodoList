import React from "react";

const PageNotFound = () => (
  <div
    style={{
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#181818",
      color: "#fff"
    }}
  >
    <h1 style={{ fontSize: "4rem", fontWeight: "bold" }}>404</h1>
    <h2 style={{ marginTop: "2rem", fontWeight: 400, letterSpacing: 1 }}>
      Oops! Page Not Found
    </h2>
    <p>The page you’re looking for doesn’t exist.</p>
    <a
      href="/"
      style={{
        color: "#11b0f0",
        marginTop: "1.5rem",
        textDecoration: "underline",
        fontWeight: "bold"
      }}
    >
      Go Home
    </a>
  </div>
);

export default PageNotFound;

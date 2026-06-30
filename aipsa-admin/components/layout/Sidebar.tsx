"use client";

import Link from "next/link";

import { menuItems } from "../../lib/navigation/menu";

export default function Sidebar() {

  return (

    <aside
      style={{
        width: 240,
        background: "#1f2937",
        color: "white",
        padding: 24,
        minHeight: "100vh",
      }}
    >

      <h2
        style={{
          marginBottom: 30,
        }}
      >
        AIPSA Admin
      </h2>

      {menuItems.map((item) => (

        <div
          key={item.name}
          style={{
            marginBottom: 18,
          }}
        >

          <Link
            href={item.href}
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            {item.name}
          </Link>

        </div>

      ))}

    </aside>

  );

}
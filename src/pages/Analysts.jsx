import { useState } from "react";
import AnalystCard from "../components/AnalystCard";
import { analysts } from "../data/analysts";

export default function Analysts() {
  const [search, setSearch] = useState("");

  const filtered = analysts.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Top Analysts</h1>

      <input
        type="text"
        placeholder="Search analyst..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "20px",
          borderRadius: "10px",
          border: "1px solid #ddd"
        }}
      />

      {filtered.map(a => (
        <AnalystCard key={a.id} analyst={a} />
      ))}
    </div>
  );
}
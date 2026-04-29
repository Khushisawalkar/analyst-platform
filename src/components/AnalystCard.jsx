import { useNavigate } from "react-router-dom";

export default function AnalystCard({ analyst }) {
  const nav = useNavigate();

  return (
    <div
      onClick={() => nav(`/analyst/${analyst.id}`)}
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        margin: "10px",
        borderRadius: "10px",
        cursor: "pointer"
      }}
    >
      <h3>{analyst.name}</h3>
      <p>{analyst.niche}</p>
      <p>{analyst.description}</p>
    </div>
  );
}
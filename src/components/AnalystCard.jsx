import { useNavigate } from "react-router-dom";

function AnalystCard({ analyst }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/analyst/${analyst.id}`)}
      style={{
        padding: "15px",
        borderRadius: "12px",
        border: "1px solid #eee",
        marginBottom: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        cursor: "pointer",
        background: "#fff"
      }}
    >
      <h3>{analyst.name}</h3>

      <span style={{
        fontSize: "12px",
        background: "#eef",
        padding: "4px 8px",
        borderRadius: "6px"
      }}>
        {analyst.niche}
      </span>

      <p style={{ marginTop: "8px", color: "#555" }}>
        {analyst.description}
      </p>
    </div>
  );
}

export default AnalystCard;
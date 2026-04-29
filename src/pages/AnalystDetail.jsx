import { useParams } from "react-router-dom";
import { analysts } from "../data/analysts";
import { useState } from "react";

function AnalystDetail() {
  const { id } = useParams();
  const analyst = analysts.find(a => a.id === parseInt(id));

  const [follow, setFollow] = useState(false);

  return (
    <div style={{
      padding: "20px",
      maxWidth: "500px",
      margin: "auto"
    }}>
      <h2>{analyst.name}</h2>

      <span style={{
        background: "#e6f4ea",
        padding: "6px 10px",
        borderRadius: "8px",
        fontSize: "12px"
      }}>
        {analyst.niche}
      </span>

      <div style={{
        marginTop: "20px",
        padding: "15px",
        borderRadius: "12px",
        border: "1px solid #eee"
      }}>
        <h3>About</h3>
        <p>{analyst.details}</p>
      </div>

      <button
        onClick={() => setFollow(!follow)}
        style={{
          marginTop: "20px",
          padding: "12px",
          width: "100%",
          borderRadius: "10px",
          background: follow ? "#4caf50" : "#111",
          color: "#fff",
          border: "none"
        }}
      >
        {follow ? "Following" : "Follow"}
      </button>
    </div>
  );
}

export default AnalystDetail;
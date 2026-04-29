import { analysts } from "../data/analysts";
import AnalystCard from "../components/AnalystCard";

function Analysts() {
  return (
    <div style={{
      padding: "20px",
      maxWidth: "500px",
      margin: "auto"
    }}>
      <h2>Top Analysts</h2>

      <div style={{ marginTop: "15px" }}>
        {analysts.map((a) => (
          <AnalystCard key={a.id} analyst={a} />
        ))}
      </div>
    </div>
  );
}

export default Analysts;
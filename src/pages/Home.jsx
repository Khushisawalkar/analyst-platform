import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      padding: "40px",
      maxWidth: "500px",
      margin: "auto"
    }}>
      <h1 style={{ fontSize: "28px" }}>
        Discover Analysts
      </h1>

      <p style={{ color: "#555", marginTop: "10px" }}>
        Explore insights across stocks, crypto and more.
      </p>

      <input
        placeholder="Search analysts..."
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          borderRadius: "10px",
          border: "1px solid #ddd"
        }}
      />

      <button
        onClick={() => navigate("/analysts")}
        style={{
          width: "100%",
          marginTop: "15px",
          padding: "12px",
          borderRadius: "10px",
          background: "#111",
          color: "#fff",
          border: "none",
          cursor: "pointer"
        }}
      >
        Get Started
      </button>
    </div>
  );
}

export default Home;
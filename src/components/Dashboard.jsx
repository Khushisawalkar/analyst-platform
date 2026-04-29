import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";

const data = [
  { year: 2020, revenue: 2800, income: 200 },
  { year: 2021, revenue: 2500, income: 239 },
  { year: 2022, revenue: 3500, income: 400 },
  { year: 2023, revenue: 4200, income: 550 },
  { year: 2024, revenue: 5000, income: 650 },
  { year: 2025, revenue: 5164, income: 677 }
];

export default function Dashboard() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      
      <h1>TATA TECHNOLOGIES</h1>

      {/* Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={card}>Revenue ₹5164 Cr</div>
        <div style={card}>Expenses ₹703 Cr</div>
        <div style={card}>Profit ₹677 Cr</div>
      </div>

      {/* Line Chart */}
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" stroke="#00c49f" />
        <Line type="monotone" dataKey="income" stroke="#8884d8" />
      </LineChart>

      {/* Bar Chart */}
      <BarChart width={600} height={300} data={data} style={{ marginTop: "30px" }}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="income" fill="#00c49f" />
      </BarChart>

    </div>
  );
}

const card = {
  padding: "15px",
  background: "#f0f0f0",
  borderRadius: "10px",
  fontWeight: "bold"
};
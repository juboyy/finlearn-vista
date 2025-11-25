import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SlideChartProps {
  type: "bar" | "line" | "pie";
  data: any[];
  title?: string;
}

const COLORS = [
  "hsl(207, 35%, 65%)", // Pastel blue
  "hsl(142, 35%, 65%)", // Pastel green
  "hsl(350, 35%, 65%)", // Pastel pink
  "hsl(44, 35%, 65%)",  // Pastel yellow
  "hsl(280, 35%, 65%)", // Pastel purple
  "hsl(20, 35%, 65%)",  // Pastel orange
];

export function SlideChart({ type, data, title }: SlideChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-slate-50 border border-slate-200 rounded-lg">
        <p className="text-slate-500">Nenhum dado disponível</p>
      </div>
    );
  }

  let chartElement = null;

  if (type === "bar") {
    chartElement = (
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 85%)" />
        <XAxis 
          dataKey="name" 
          tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: "white", 
            border: "1px solid hsl(215, 20%, 85%)",
            borderRadius: "8px",
            fontSize: "12px"
          }}
        />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Bar dataKey="value" fill={COLORS[0]} radius={[8, 8, 0, 0]} />
      </BarChart>
    );
  } else if (type === "line") {
    chartElement = (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 85%)" />
        <XAxis 
          dataKey="name" 
          tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: "white", 
            border: "1px solid hsl(215, 20%, 85%)",
            borderRadius: "8px",
            fontSize: "12px"
          }}
        />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={COLORS[0]} 
          strokeWidth={3}
          dot={{ fill: COLORS[0], r: 5 }}
        />
      </LineChart>
    );
  } else if (type === "pie") {
    chartElement = (
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => 
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: "white", 
            border: "1px solid hsl(215, 20%, 85%)",
            borderRadius: "8px",
            fontSize: "12px"
          }}
        />
      </PieChart>
    );
  }

  return (
    <div className="space-y-3">
      {title && (
        <h4 className="text-sm font-medium text-slate-700">{title}</h4>
      )}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <ResponsiveContainer width="100%" height={300}>
          {chartElement}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

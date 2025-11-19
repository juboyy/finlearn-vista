import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Seg", hours: 1.5 },
  { day: "Ter", hours: 2.3 },
  { day: "Qua", hours: 1.8 },
  { day: "Qui", hours: 3.2 },
  { day: "Sex", hours: 2.7 },
  { day: "Sáb", hours: 1.2 },
  { day: "Dom", hours: 0.8 },
];

export const LearningProgressChart = () => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(206, 49%, 81%)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="hsl(206, 49%, 81%)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" vertical={false} />
        <XAxis 
          dataKey="day" 
          stroke="hsl(215, 16%, 47%)"
          tick={{ fill: "hsl(215, 16%, 47%)" }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="hsl(215, 16%, 47%)"
          tick={{ fill: "hsl(215, 16%, 47%)" }}
          tickLine={false}
          axisLine={false}
          label={{ value: "Horas", angle: -90, position: "insideLeft", fill: "hsl(215, 16%, 47%)" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(0, 0%, 100%)",
            border: "1px solid hsl(214, 32%, 91%)",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
          labelStyle={{ color: "hsl(220, 15%, 20%)", fontWeight: 600 }}
          itemStyle={{ color: "hsl(206, 49%, 60%)" }}
          cursor={{ stroke: "hsl(206, 49%, 81%)", strokeWidth: 2, strokeDasharray: "5 5" }}
          formatter={(value: number) => [`${value}h`, "Estudo"]}
        />
        <Area
          type="monotone"
          dataKey="hours"
          stroke="hsl(206, 49%, 70%)"
          strokeWidth={3}
          fill="url(#colorHours)"
          animationDuration={1500}
          animationBegin={0}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

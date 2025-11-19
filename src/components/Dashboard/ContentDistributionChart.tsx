import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Artigos", value: 40, color: "hsl(206, 49%, 81%)" },
  { name: "Podcasts", value: 25, color: "hsl(24, 46%, 83%)" },
  { name: "Vídeos", value: 20, color: "hsl(322, 42%, 83%)" },
  { name: "Cursos", value: 15, color: "hsl(152, 45%, 83%)" },
];

const RADIAN = Math.PI / 180;

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="hsl(220, 15%, 20%)"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="14"
      fontWeight="600"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const ContentDistributionChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          innerRadius={40}
          paddingAngle={3}
          dataKey="value"
          animationBegin={0}
          animationDuration={1000}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(0, 0%, 100%)",
            border: "1px solid hsl(214, 32%, 91%)",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
          itemStyle={{ color: "hsl(220, 15%, 20%)", fontWeight: 600 }}
          formatter={(value: number) => [`${value}%`, "Conteúdo"]}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          iconSize={10}
          wrapperStyle={{
            paddingTop: "20px",
            fontSize: "13px",
            color: "hsl(215, 16%, 47%)",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

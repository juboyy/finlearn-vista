import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from "recharts";

const data = [
  { name: "Artigos", value: 40, color: "hsl(206, 49%, 81%)" },
  { name: "Podcasts", value: 25, color: "hsl(24, 46%, 83%)" },
  { name: "Vídeos", value: 20, color: "hsl(322, 42%, 83%)" },
  { name: "Cursos", value: 15, color: "hsl(152, 45%, 83%)" },
];



const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{
          filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))",
          transition: "all 0.3s ease-in-out",
        }}
      />
    </g>
  );
};

export const ContentDistributionChart = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={40}
          paddingAngle={0}
          dataKey="value"
          animationBegin={0}
          animationDuration={800}
          animationEasing="ease-out"
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
          activeIndex={activeIndex ?? undefined}
          activeShape={renderActiveShape}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
              style={{
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
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

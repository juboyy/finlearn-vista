import { useRef } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";

interface ChatChartRendererProps {
  type: "bar" | "line" | "pie";
  data: any[];
  dataKey?: string;
  xKey?: string;
  colors?: string[];
}

export const ChatChartRenderer = ({ type, data, dataKey = "value", xKey = "name", colors }: ChatChartRendererProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const defaultColors = [
    "hsl(207, 45%, 70%)",
    "hsl(271, 45%, 70%)",
    "hsl(338, 45%, 70%)",
    "hsl(142, 45%, 70%)",
    "hsl(44, 45%, 70%)",
  ];

  const chartColors = colors || defaultColors;

  const handleDownload = async () => {
    if (!chartRef.current) return;
    
    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });
      
      canvas.toBlob((blob) => {
        if (!blob) return;
        
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `grafico-${type}-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        toast({
          title: "Download iniciado",
          description: "O gráfico está sendo baixado.",
        });
      });
    } catch (error) {
      console.error("Error downloading chart:", error);
      toast({
        title: "Erro ao baixar",
        description: "Não foi possível baixar o gráfico.",
        variant: "destructive",
      });
    }
  };

  if (type === "bar") {
    return (
      <div ref={chartRef} className="relative group my-3 bg-muted rounded-lg p-4 border-2 border-pastel-purple/30">
        <Button
          onClick={handleDownload}
          size="sm"
          className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm hover:bg-background"
          variant="secondary"
        >
          <Download size={16} className="mr-1" />
          Baixar
        </Button>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey={xKey} stroke="hsl(var(--foreground))" />
            <YAxis stroke="hsl(var(--foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Legend />
            <Bar dataKey={dataKey} fill={chartColors[0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === "line") {
    return (
      <div ref={chartRef} className="relative group my-3 bg-muted rounded-lg p-4 border-2 border-pastel-purple/30">
        <Button
          onClick={handleDownload}
          size="sm"
          className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm hover:bg-background"
          variant="secondary"
        >
          <Download size={16} className="mr-1" />
          Baixar
        </Button>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey={xKey} stroke="hsl(var(--foreground))" />
            <YAxis stroke="hsl(var(--foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Legend />
            <Line type="monotone" dataKey={dataKey} stroke={chartColors[0]} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === "pie") {
    return (
      <div ref={chartRef} className="relative group my-3 bg-muted rounded-lg p-4 border-2 border-pastel-purple/30">
        <Button
          onClick={handleDownload}
          size="sm"
          className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm hover:bg-background"
          variant="secondary"
        >
          <Download size={16} className="mr-1" />
          Baixar
        </Button>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={xKey}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return null;
};

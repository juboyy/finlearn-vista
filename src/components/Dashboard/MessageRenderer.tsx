import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Progress } from "@/components/ui/progress";
import { ChatImageRenderer } from "@/components/Dashboard/ChatImageRenderer";
import { ChatChartRenderer } from "@/components/Dashboard/ChatChartRenderer";
import { EbookCard } from "@/components/Dashboard/EbookCard";
import { Headphones, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageRendererProps {
  content: string;
}

export const MessageRenderer = ({ content }: MessageRendererProps) => {
  // Split content into segments with images
  const parseContentWithImages = (text: string) => {
    const imageRegex = /!\[([^\]]*)\]\(IMAGE_GENERATE:([^)]+)\)/g;
    const parts: Array<{ type: 'text' | 'image', content: string, alt?: string }> = [];
    let lastIndex = 0;
    let match;

    while ((match = imageRegex.exec(text)) !== null) {
      // Add text before image
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index)
        });
      }
      
      // Add image
      parts.push({
        type: 'image',
        content: `IMAGE_GENERATE:${match[2]}`,
        alt: match[1]
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex)
      });
    }
    
    return parts.length > 0 ? parts : [{ type: 'text', content: text }];
  };

  const parts = parseContentWithImages(content);

  return (
    <>
      {parts.map((part, index) => {
        if (part.type === 'image') {
          return (
            <ChatImageRenderer 
              key={index} 
              src={part.content} 
              alt={part.alt || "Generated image"} 
            />
          );
        }
        
        return (
          <ReactMarkdown
            key={index}
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 className="text-2xl font-bold text-foreground mb-4 mt-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-semibold text-foreground mb-3 mt-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-medium text-foreground mb-2 mt-2">{children}</h3>,
              p: ({ children }) => <p className="text-sm text-foreground mb-2 leading-relaxed">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
              strong: ({ children }) => <strong className="font-semibold text-pastel-blue">{children}</strong>,
              em: ({ children }) => <em className="italic text-slate-700">{children}</em>,
              a: ({ href, children }) => {
                if (href?.includes('podcast') || href?.includes('audio')) {
                  return (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 my-1 bg-pastel-pink rounded-lg hover:bg-pastel-purple transition-colors text-foreground no-underline">
                      <Headphones size={16} />
                      <span className="text-sm font-medium">{children}</span>
                      <ExternalLink size={14} />
                    </a>
                  );
                }
                return (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 underline inline-flex items-center gap-1">
                    {children}
                    <ExternalLink size={12} />
                  </a>
                );
              },
              code: ({ children, className }) => {
                const isBlock = className !== undefined;
                
                if (!isBlock) {
                  return <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{children}</code>;
                }

                const content = String(children).trim();
                
                if (className === 'language-progress') {
                  const value = parseInt(content.replace('%', ''));
                  return (
                    <div className="my-3 space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progresso da Meta</span>
                        <span>{value}%</span>
                      </div>
                      <Progress value={value} className="h-3" />
                    </div>
                  );
                }
                
                if (className === 'language-audio') {
                  return (
                    <div className="relative group my-3 bg-muted rounded-lg p-4 border-2 border-pastel-purple/30">
                      <audio controls className="w-full">
                        <source src={content} type="audio/mpeg" />
                        Seu navegador não suporta o elemento de áudio.
                      </audio>
                      <a
                        href={content}
                        download
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm hover:bg-background">
                          <Download size={16} className="mr-1" />
                          Baixar
                        </Button>
                      </a>
                    </div>
                  );
                }
                
                if (className === 'language-video') {
                  return (
                    <div className="relative group my-3 bg-muted rounded-lg overflow-hidden border-2 border-pastel-purple/30">
                      <video controls className="w-full">
                        <source src={content} type="video/mp4" />
                        Seu navegador não suporta o elemento de vídeo.
                      </video>
                      <a
                        href={content}
                        download
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      >
                        <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm hover:bg-background">
                          <Download size={16} className="mr-1" />
                          Baixar
                        </Button>
                      </a>
                    </div>
                  );
                }
                
                if (className?.startsWith('language-chart-')) {
                  try {
                    const chartType = className.replace('language-chart-', '') as "bar" | "line" | "pie";
                    const chartData = JSON.parse(content);
                    return (
                      <ChatChartRenderer 
                        type={chartType}
                        data={chartData.data}
                        dataKey={chartData.dataKey || "value"}
                        xKey={chartData.xKey || "name"}
                        colors={chartData.colors}
                      />
                    );
                  } catch (e) {
                    console.error("Error parsing chart data:", e);
                    return <code className="bg-muted px-1.5 py-0.5 rounded text-xs">Erro ao renderizar gráfico</code>;
                  }
                }
                
                if (className === 'language-ebook') {
                  try {
                    const ebookData = JSON.parse(content);
                    return (
                      <div className="my-4 flex gap-4 flex-wrap">
                        {ebookData.map((ebook: any, idx: number) => (
                          <EbookCard key={idx} {...ebook} />
                        ))}
                      </div>
                    );
                  } catch (e) {
                    console.error("Error parsing ebook data:", e);
                    return <code className="bg-muted px-1.5 py-0.5 rounded text-xs">Erro ao renderizar ebooks</code>;
                  }
                }
                
                return <code className="bg-muted px-1.5 py-0.5 rounded text-xs block">{children}</code>;
              },
            }}
          >
            {part.content}
          </ReactMarkdown>
        );
      })}
    </>
  );
};

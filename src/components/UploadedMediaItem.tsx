import { Play, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface UploadedMediaItemProps {
  file: File;
  type: "audio" | "video";
  color: string;
  icon: React.ReactNode;
  thumbnail?: string;
  onRemove: () => void;
}

export const UploadedMediaItem = ({
  file,
  type,
  color,
  icon,
  thumbnail,
  onRemove,
}: UploadedMediaItemProps) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState<string>("");

  useEffect(() => {
    // Simular upload com progresso
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Obter duração do arquivo de mídia
    const url = URL.createObjectURL(file);
    const media = type === "audio" ? new Audio(url) : document.createElement("video");
    media.src = url;
    
    media.addEventListener("loadedmetadata", () => {
      const minutes = Math.floor(media.duration / 60);
      const seconds = Math.floor(media.duration % 60);
      setDuration(`${minutes}:${seconds.toString().padStart(2, "0")} min`);
      URL.revokeObjectURL(url);
    });

    return () => {
      clearInterval(interval);
      URL.revokeObjectURL(url);
    };
  }, [file, type]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="bg-card rounded-xl border-2 border-border p-4 animate-fade-in">
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 bg-[hsl(var(${color}))] rounded-lg flex items-center justify-center border-2 border-border flex-shrink-0 overflow-hidden`}>
          {thumbnail && type === "video" ? (
            <img className="w-full h-full object-cover" src={thumbnail} alt={file.name} />
          ) : (
            <div className="text-[hsl(var(--pastel-gray-dark))] text-2xl">{icon}</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{file.name}</h4>
          <p className="text-xs text-muted-foreground">
            {formatFileSize(file.size)}
            {duration && ` • ${duration}`}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full bg-[hsl(var(${color}))] rounded-full transition-all duration-300 ease-out`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground font-medium w-10 text-right">
              {Math.round(Math.min(progress, 100))}%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {progress >= 100 && (
            <button 
              className="w-8 h-8 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition"
              onClick={() => {
                const url = URL.createObjectURL(file);
                const media = type === "audio" ? new Audio(url) : document.createElement("video");
                media.src = url;
                if (type === "video") {
                  const videoElement = media as HTMLVideoElement;
                  videoElement.controls = true;
                  const popup = window.open("", "_blank", "width=800,height=600");
                  popup?.document.write(`
                    <html>
                      <head><title>${file.name}</title></head>
                      <body style="margin:0;display:flex;align-items:center;justify-content:center;background:#000;">
                        <video controls autoplay style="max-width:100%;max-height:100vh;">
                          <source src="${url}" type="${file.type}">
                        </video>
                      </body>
                    </html>
                  `);
                } else {
                  media.play();
                }
              }}
            >
              <Play className="text-foreground w-4 h-4" />
            </button>
          )}
          <button 
            className="w-8 h-8 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition"
            onClick={onRemove}
          >
            <Trash2 className="text-foreground w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

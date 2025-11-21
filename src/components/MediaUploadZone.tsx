import { useState, useCallback } from "react";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaUploadZoneProps {
  type: "audio" | "video";
  accept: string;
  maxSize: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  onUpload: (file: File) => void;
}

export const MediaUploadZone = ({
  type,
  accept,
  maxSize,
  icon,
  title,
  subtitle,
  color,
  onUpload,
}: MediaUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = useCallback((file: File) => {
    const acceptedTypes = accept.split(",").map(t => t.trim());
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    const fileMimeType = file.type;

    const isValidType = acceptedTypes.some(
      type => type === fileExtension || type === fileMimeType
    );

    if (!isValidType) {
      toast({
        title: "Tipo de arquivo inválido",
        description: `Por favor, selecione um arquivo ${type === "audio" ? "de áudio" : "de vídeo"}.`,
        variant: "destructive",
      });
      return false;
    }

    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: `O arquivo deve ter no máximo ${maxSize}MB.`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  }, [accept, maxSize, type, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const file = files[0];

    if (file && validateFile(file)) {
      onUpload(file);
    }
  }, [onUpload, validateFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0] && validateFile(files[0])) {
      onUpload(files[0]);
    }
  }, [onUpload, validateFile]);

  return (
    <div className="bg-card rounded-xl border-2 border-border p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 bg-[hsl(var(${color}))] rounded-lg flex items-center justify-center border-2 border-border`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-all duration-200
          ${isDragging 
            ? `border-[hsl(var(${color}))] bg-[hsl(var(${color}))]/20` 
            : 'border-border hover:border-[hsl(var(${color}))] hover:bg-[hsl(var(${color}))]/20'
          }
        `}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
        <Upload className={`w-10 h-10 mx-auto mb-3 transition-colors ${isDragging ? 'text-foreground' : 'text-muted-foreground'}`} />
        <p className="text-sm font-medium text-foreground mb-1">
          {isDragging ? "Solte o arquivo aqui" : "Clique para fazer upload"}
        </p>
        <p className="text-xs text-muted-foreground">ou arraste e solte o arquivo aqui</p>
      </label>
    </div>
  );
};

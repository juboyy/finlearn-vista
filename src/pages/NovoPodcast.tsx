import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  Check,
  Info,
  Upload,
  Users,
  Calendar,
  Lock,
  Search,
  Mic,
  Image,
  Plus,
  X,
  Clock,
  Rocket,
  FileText,
  Globe,
  Crown,
  DollarSign,
  Eye,
  Headphones,
  TrendingUp,
  Lightbulb,
  Trash2,
  Loader2,
  Play,
  Pause,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";

const podcastSchema = z.object({
  title: z.string().min(1, "Titulo e obrigatorio").max(200),
  category: z.string().min(1, "Categoria e obrigatoria"),
  durationEstimate: z.string().min(1, "Duracao e obrigatoria"),
  description: z.string().min(1, "Descricao e obrigatoria").max(5000),
  publicationDate: z.string().min(1, "Data de publicacao e obrigatoria"),
  publicationTime: z.string().min(1, "Horario e obrigatorio"),
});

export default function NovoPodcast() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const { user } = useAuth();
  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoadingPodcast, setIsLoadingPodcast] = useState(false);
  const [existingAudioUrl, setExistingAudioUrl] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [durationEstimate, setDurationEstimate] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [publicationTime, setPublicationTime] = useState("");
  const [slug, setSlug] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [price, setPrice] = useState("");
  const [maxListeners, setMaxListeners] = useState("");

  // Settings state
  const [publicationType, setPublicationType] = useState<"schedule" | "now" | "draft">("schedule");
  const [accessType, setAccessType] = useState<"free" | "subscribers" | "paid">("free");
  const [allowDownload, setAllowDownload] = useState(false);
  const [allowComments, setAllowComments] = useState(false);
  const [notifyFollowers, setNotifyFollowers] = useState(false);
  const [limitParticipants, setLimitParticipants] = useState(false);

  // File state
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Loading state
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Participants state
  interface Participant {
    id: string;
    name: string;
    role: string;
    avatar: string;
    isMain?: boolean;
  }

  const [hosts, setHosts] = useState<Participant[]>([
    {
      id: crypto.randomUUID(),
      name: "Marina Santos",
      role: "Especialista em Pagamentos",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      isMain: true,
    },
  ]);

  const [guests, setGuests] = useState<Participant[]>([]);

  // Load podcast data for edit mode
  useEffect(() => {
    const loadPodcast = async () => {
      if (!editId) return;
      
      setIsLoadingPodcast(true);
      setIsEditMode(true);
      
      try {
        const { data, error } = await supabase
          .from("podcasts")
          .select("*")
          .eq("id", editId)
          .single();
        
        if (error) throw error;
        if (!data) {
          toast.error("Podcast nao encontrado");
          navigate("/meus-conteudos");
          return;
        }
        
        // Populate form fields
        setTitle(data.title || "");
        setCategory(data.category || "");
        setDurationEstimate(data.duration_estimate || "");
        setDescription(data.description || "");
        setTags(data.tags?.join(", ") || "");
        setPublicationDate(data.publication_date || "");
        setPublicationTime(data.publication_time || "");
        setSlug(data.slug || "");
        setMetaDescription(data.meta_description || "");
        setSeoKeywords(data.seo_keywords || "");
        setPrice(data.price?.toString() || "");
        setMaxListeners(data.max_listeners?.toString() || "");
        
        // Settings
        setPublicationType(data.publication_type as "schedule" | "now" | "draft" || "schedule");
        setAccessType(data.access_type as "free" | "subscribers" | "paid" || "free");
        setAllowDownload(data.allow_download || false);
        setAllowComments(data.allow_comments || false);
        setNotifyFollowers(data.notify_followers || false);
        setLimitParticipants(!!data.max_listeners);
        
        // Existing files
        if (data.audio_url) {
          setExistingAudioUrl(data.audio_url);
          setAudioPreviewUrl(data.audio_url);
        }
        if (data.cover_image_url) {
          setExistingImageUrl(data.cover_image_url);
          setImagePreviewUrl(data.cover_image_url);
        }
        
        // Participants
        const hostsData = data.hosts as { name: string; role: string; avatar: string; isMain?: boolean }[] | null;
        if (hostsData && hostsData.length > 0) {
          setHosts(hostsData.map(h => ({
            id: crypto.randomUUID(),
            name: h.name || "",
            role: h.role || "",
            avatar: h.avatar || "",
            isMain: h.isMain || false,
          })));
        }
        
        const guestsData = data.guests as { name: string; role: string; avatar: string }[] | null;
        if (guestsData && guestsData.length > 0) {
          setGuests(guestsData.map(g => ({
            id: crypto.randomUUID(),
            name: g.name || "",
            role: g.role || "",
            avatar: g.avatar || "",
          })));
        }
      } catch (error) {
        console.error("Error loading podcast:", error);
        toast.error("Erro ao carregar podcast");
      } finally {
        setIsLoadingPodcast(false);
      }
    };
    
    loadPodcast();
  }, [editId, navigate]);

  const addHost = () => {
    setHosts([
      ...hosts,
      {
        id: crypto.randomUUID(),
        name: "",
        role: "",
        avatar: "",
        isMain: false,
      },
    ]);
  };

  const removeHost = (id: string) => {
    if (hosts.length > 1) {
      setHosts(hosts.filter((h) => h.id !== id));
    } else {
      toast.error("E necessario pelo menos um host.");
    }
  };

  const updateHost = (id: string, field: keyof Participant, value: string | boolean) => {
    setHosts(hosts.map((h) => (h.id === id ? { ...h, [field]: value } : h)));
  };

  const setMainHost = (id: string) => {
    setHosts(hosts.map((h) => ({ ...h, isMain: h.id === id })));
  };

  const addGuest = () => {
    setGuests([
      ...guests,
      {
        id: crypto.randomUUID(),
        name: "",
        role: "",
        avatar: "",
      },
    ]);
  };

  const removeGuest = (id: string) => {
    setGuests(guests.filter((g) => g.id !== id));
  };

  const updateGuest = (id: string, field: keyof Participant, value: string) => {
    setGuests(guests.map((g) => (g.id === id ? { ...g, [field]: value } : g)));
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 500 * 1024 * 1024; // 500MB
      if (file.size > maxSize) {
        toast.error("Arquivo muito grande. Maximo 500MB.");
        return;
      }
      const allowedTypes = ["audio/mpeg", "audio/wav", "audio/x-m4a", "audio/mp4"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Formato invalido. Use MP3, WAV ou M4A.");
        return;
      }
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioPreviewUrl(url);
      setErrors((prev) => ({ ...prev, audio: "" }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast.error("Imagem muito grande. Maximo 10MB.");
        return;
      }
      const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Formato invalido. Use PNG, JPG ou WEBP.");
        return;
      }
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url);
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const toggleAudioPlayback = () => {
    if (audioPlayerRef.current) {
      if (isAudioPlaying) {
        audioPlayerRef.current.pause();
      } else {
        audioPlayerRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const removeAudio = () => {
    setAudioFile(null);
    if (audioPreviewUrl) {
      URL.revokeObjectURL(audioPreviewUrl);
      setAudioPreviewUrl(null);
    }
    setIsAudioPlaying(false);
  };

  const removeImage = () => {
    setImageFile(null);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    try {
      podcastSchema.parse({
        title,
        category,
        durationEstimate,
        description,
        publicationDate,
        publicationTime,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.errors.forEach((e) => {
          if (e.path[0]) {
            newErrors[e.path[0] as string] = e.message;
          }
        });
      }
    }

    // Only require new files if not in edit mode or if no existing files
    if (!audioFile && !existingAudioUrl) {
      newErrors.audio = "Arquivo de audio e obrigatorio";
    }

    if (!imageFile && !existingImageUrl) {
      newErrors.image = "Imagem de capa e obrigatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from("podcast-files")
      .upload(filePath, file);

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const { data } = supabase.storage
      .from("podcast-files")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const savePodcast = async (status: "draft" | "published") => {
    if (!user) {
      toast.error("Voce precisa estar logado para salvar.");
      return;
    }

    if (status === "published" && !validateForm()) {
      toast.error("Preencha todos os campos obrigatorios.");
      return;
    }

    const setLoading = status === "draft" ? setIsSaving : setIsPublishing;
    setLoading(true);

    try {
      let audioUrl = existingAudioUrl;
      let coverImageUrl = existingImageUrl;

      if (audioFile) {
        const newAudioUrl = await uploadFile(audioFile, "audio");
        if (newAudioUrl) {
          audioUrl = newAudioUrl;
        } else if (status === "published" && !existingAudioUrl) {
          throw new Error("Falha ao fazer upload do audio");
        }
      }

      if (imageFile) {
        const newCoverUrl = await uploadFile(imageFile, "covers");
        if (newCoverUrl) {
          coverImageUrl = newCoverUrl;
        } else if (status === "published" && !existingImageUrl) {
          throw new Error("Falha ao fazer upload da imagem");
        }
      }

      const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const podcastData = {
        user_id: user.id,
        title: title || "Podcast sem titulo",
        description,
        category,
        duration_estimate: durationEstimate,
        tags: tagsArray,
        audio_url: audioUrl,
        cover_image_url: coverImageUrl,
        hosts: hosts.filter((h) => h.name.trim()).map((h) => ({
          name: h.name,
          role: h.role,
          avatar: h.avatar,
          isMain: h.isMain,
        })),
        guests: guests.filter((g) => g.name.trim()).map((g) => ({
          name: g.name,
          role: g.role,
          avatar: g.avatar,
        })),
        publication_date: publicationDate || null,
        publication_time: publicationTime || null,
        publication_type: publicationType,
        allow_download: allowDownload,
        allow_comments: allowComments,
        notify_followers: notifyFollowers,
        access_type: accessType,
        price: accessType === "paid" ? parseFloat(price) || 0 : 0,
        max_listeners: limitParticipants ? parseInt(maxListeners) || null : null,
        slug: slug || null,
        meta_description: metaDescription || null,
        seo_keywords: seoKeywords || null,
        status,
      };

      if (isEditMode && editId) {
        // Update existing podcast
        const { error } = await supabase
          .from("podcasts")
          .update(podcastData)
          .eq("id", editId);

        if (error) throw error;

        toast.success(
          status === "draft" ? "Rascunho atualizado!" : "Podcast atualizado com sucesso!"
        );
      } else {
        // Insert new podcast
        const { error } = await supabase.from("podcasts").insert(podcastData);

        if (error) throw error;

        toast.success(
          status === "draft" ? "Rascunho salvo com sucesso!" : "Podcast publicado com sucesso!"
        );
      }

      if (status === "published") {
        navigate("/meus-conteudos");
      }
    } catch (error) {
      console.error("Error saving podcast:", error);
      toast.error("Erro ao salvar podcast. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => savePodcast("draft");
  const handlePublish = () => savePodcast("published");

  if (isLoadingPodcast) {
    return (
      <div className="flex min-h-screen w-full bg-background">
        <SidebarFix />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <SidebarFix />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
          <div className="px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to={isEditMode ? "/meus-conteudos" : "/criar-conteudo"}
                className="p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {isEditMode ? "Editar Podcast" : "Adicionar Novo Podcast"}
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {isEditMode
                    ? "Atualize as informacoes do seu podcast"
                    : "Preencha as informacoes para criar seu podcast"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="border-input"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Salvar Rascunho
              </Button>
              <Button
                onClick={handlePublish}
                disabled={isPublishing}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
              >
                {isPublishing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Check className="w-4 h-4 mr-2" />
                )}
                Publicar Podcast
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Left Column - Forms */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              {/* Basic Information */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(var(--pastel-blue))] text-[hsl(var(--pastel-gray-dark))] rounded-lg flex items-center justify-center">
                    <Info className="w-5 h-5" />
                  </div>
                  Informacoes Basicas
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Titulo do Podcast *
                    </label>
                    <Input
                      placeholder="Ex: Desvendando o Mercado Financeiro"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={errors.title ? "border-destructive" : ""}
                    />
                    {errors.title && (
                      <p className="text-xs text-destructive mt-1">{errors.title}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Categoria *
                      </label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="investimentos">Investimentos</SelectItem>
                          <SelectItem value="economia">Economia</SelectItem>
                          <SelectItem value="mercado">Mercado Financeiro</SelectItem>
                          <SelectItem value="educacao">Educacao Financeira</SelectItem>
                          <SelectItem value="cripto">Criptomoedas</SelectItem>
                          <SelectItem value="empreendedorismo">Empreendedorismo</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-xs text-destructive mt-1">{errors.category}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Duracao Estimada *
                      </label>
                      <Input
                        placeholder="Ex: 45 minutos"
                        value={durationEstimate}
                        onChange={(e) => setDurationEstimate(e.target.value)}
                        className={errors.durationEstimate ? "border-destructive" : ""}
                      />
                      {errors.durationEstimate && (
                        <p className="text-xs text-destructive mt-1">{errors.durationEstimate}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Descricao do Episodio *
                    </label>
                    <Textarea
                      rows={5}
                      placeholder="Descreva sobre o que sera o podcast, topicos abordados e o que os ouvintes podem esperar..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className={`resize-none ${errors.description ? "border-destructive" : ""}`}
                    />
                    {errors.description && (
                      <p className="text-xs text-destructive mt-1">{errors.description}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Tags (separadas por virgula)
                    </label>
                    <Input
                      placeholder="Ex: investimentos, bolsa de valores, analise tecnica"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>
                </div>
              </section>

              {/* Media Upload */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(var(--pastel-purple))] text-[hsl(var(--pastel-gray-dark))] rounded-lg flex items-center justify-center">
                    <Upload className="w-5 h-5" />
                  </div>
                  Midia do Podcast
                </h2>

                <div className="space-y-5">
                  {/* Audio Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Arquivo de Audio *
                    </label>
                    <input
                      ref={audioInputRef}
                      type="file"
                      accept="audio/mpeg,audio/wav,audio/x-m4a,audio/mp4"
                      className="hidden"
                      onChange={handleAudioUpload}
                    />
                    {audioFile ? (
                      <div className="border border-border rounded-lg p-4 bg-muted">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={toggleAudioPlayback}
                            className="w-12 h-12 bg-[hsl(var(--pastel-purple))] text-[hsl(var(--pastel-gray-dark))] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                          >
                            {isAudioPlaying ? (
                              <Pause className="w-5 h-5" />
                            ) : (
                              <Play className="w-5 h-5 ml-0.5" />
                            )}
                          </button>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-foreground truncate">
                              {audioFile.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            onClick={removeAudio}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        {audioPreviewUrl && (
                          <audio
                            ref={audioPlayerRef}
                            src={audioPreviewUrl}
                            onEnded={() => setIsAudioPlaying(false)}
                            className="hidden"
                          />
                        )}
                      </div>
                    ) : (
                      <div
                        onClick={() => audioInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer ${
                          errors.audio ? "border-destructive" : "border-input"
                        }`}
                      >
                        <Mic className="w-12 h-12 text-[hsl(var(--pastel-purple))] mx-auto mb-3" />
                        <p className="text-sm font-medium text-foreground mb-1">
                          Clique para fazer upload ou arraste o arquivo
                        </p>
                        <p className="text-xs text-muted-foreground">
                          MP3, WAV ou M4A (max. 500MB)
                        </p>
                      </div>
                    )}
                    {errors.audio && (
                      <p className="text-xs text-destructive mt-1">{errors.audio}</p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Imagem de Capa *
                    </label>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    {imageFile ? (
                      <div className="border border-border rounded-lg p-4 bg-muted">
                        <div className="flex items-start gap-4">
                          <img
                            src={imagePreviewUrl!}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm text-foreground truncate">
                              {imageFile.name}
                            </p>
                            <p className="text-xs text-muted-foreground mb-2">
                              {(imageFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            <button
                              onClick={() => imageInputRef.current?.click()}
                              className="text-sm text-primary hover:underline"
                            >
                              Alterar imagem
                            </button>
                          </div>
                          <button
                            onClick={removeImage}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => imageInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer ${
                          errors.image ? "border-destructive" : "border-input"
                        }`}
                      >
                        <Image className="w-12 h-12 text-[hsl(var(--pastel-blue))] mx-auto mb-3" />
                        <p className="text-sm font-medium text-foreground mb-1">
                          Clique para fazer upload ou arraste a imagem
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG ou WEBP (1400x1400px recomendado)
                        </p>
                      </div>
                    )}
                    {errors.image && (
                      <p className="text-xs text-destructive mt-1">{errors.image}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* Participants */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(var(--pastel-green))] text-[hsl(var(--pastel-gray-dark))] rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  Participantes
                </h2>

                <div className="space-y-6">
                  {/* Hosts Section */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-semibold text-foreground">
                        Apresentador(es) / Host(s) *
                      </label>
                      <button
                        type="button"
                        onClick={addHost}
                        className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Adicionar Host
                      </button>
                    </div>
                    <div className="space-y-3">
                      {hosts.map((host) => (
                        <div
                          key={host.id}
                          className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border"
                        >
                          <div className="w-12 h-12 rounded-full bg-[hsl(var(--pastel-blue))]/30 flex items-center justify-center overflow-hidden">
                            {host.avatar ? (
                              <img
                                src={host.avatar}
                                alt="Host"
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <Users className="w-6 h-6 text-[hsl(var(--pastel-gray-dark))]" />
                            )}
                          </div>
                          <div className="flex-1 space-y-1">
                            <Input
                              placeholder="Nome do host"
                              value={host.name}
                              onChange={(e) => updateHost(host.id, "name", e.target.value)}
                              className="h-8 text-sm font-semibold"
                            />
                            <Input
                              placeholder="Cargo/Especializacao"
                              value={host.role}
                              onChange={(e) => updateHost(host.id, "role", e.target.value)}
                              className="h-8 text-xs"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => setMainHost(host.id)}
                            className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                              host.isMain
                                ? "bg-[hsl(var(--pastel-blue))] text-[hsl(var(--pastel-gray-dark))]"
                                : "bg-muted-foreground/20 text-muted-foreground hover:bg-[hsl(var(--pastel-blue))]/50"
                            }`}
                          >
                            {host.isMain ? "Host Principal" : "Definir Principal"}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeHost(host.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Guests Section */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-semibold text-foreground">Convidados</label>
                      <button
                        type="button"
                        onClick={addGuest}
                        className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Adicionar Convidado
                      </button>
                    </div>
                    <div className="space-y-3">
                      {guests.map((guest) => (
                        <div
                          key={guest.id}
                          className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border"
                        >
                          <div className="w-12 h-12 rounded-full bg-[hsl(var(--pastel-purple))]/30 flex items-center justify-center overflow-hidden">
                            {guest.avatar ? (
                              <img
                                src={guest.avatar}
                                alt="Guest"
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <Users className="w-6 h-6 text-[hsl(var(--pastel-gray-dark))]" />
                            )}
                          </div>
                          <div className="flex-1 space-y-1">
                            <Input
                              placeholder="Nome do convidado"
                              value={guest.name}
                              onChange={(e) => updateGuest(guest.id, "name", e.target.value)}
                              className="h-8 text-sm font-semibold"
                            />
                            <Input
                              placeholder="Cargo/Especializacao"
                              value={guest.role}
                              onChange={(e) => updateGuest(guest.id, "role", e.target.value)}
                              className="h-8 text-xs"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeGuest(guest.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addGuest}
                        className="w-full py-3 border-2 border-dashed border-input rounded-lg text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                      >
                        <Plus className="w-4 h-4 inline mr-2" />
                        Adicionar Convidado
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Schedule Settings */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(var(--pastel-orange))] text-[hsl(var(--pastel-gray-dark))] rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  Agendamento e Configuracoes
                </h2>

                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Data de Publicacao *
                      </label>
                      <Input
                        type="date"
                        value={publicationDate}
                        onChange={(e) => setPublicationDate(e.target.value)}
                        className={errors.publicationDate ? "border-destructive" : ""}
                      />
                      {errors.publicationDate && (
                        <p className="text-xs text-destructive mt-1">{errors.publicationDate}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Horario *
                      </label>
                      <Input
                        type="time"
                        value={publicationTime}
                        onChange={(e) => setPublicationTime(e.target.value)}
                        className={errors.publicationTime ? "border-destructive" : ""}
                      />
                      {errors.publicationTime && (
                        <p className="text-xs text-destructive mt-1">{errors.publicationTime}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Tipo de Publicacao *
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <label className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="publication-type"
                          className="peer sr-only"
                          checked={publicationType === "schedule"}
                          onChange={() => setPublicationType("schedule")}
                        />
                        <div className="p-4 border-2 border-input rounded-lg text-center hover:border-primary transition-colors peer-checked:border-primary peer-checked:bg-primary/5">
                          <Clock className="w-8 h-8 text-[hsl(var(--pastel-orange))] mx-auto mb-2" />
                          <p className="text-sm font-semibold text-foreground">Agendar</p>
                        </div>
                      </label>
                      <label className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="publication-type"
                          className="peer sr-only"
                          checked={publicationType === "now"}
                          onChange={() => setPublicationType("now")}
                        />
                        <div className="p-4 border-2 border-input rounded-lg text-center hover:border-primary transition-colors peer-checked:border-primary peer-checked:bg-primary/5">
                          <Rocket className="w-8 h-8 text-[hsl(var(--pastel-green))] mx-auto mb-2" />
                          <p className="text-sm font-semibold text-foreground">Publicar Agora</p>
                        </div>
                      </label>
                      <label className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="publication-type"
                          className="peer sr-only"
                          checked={publicationType === "draft"}
                          onChange={() => setPublicationType("draft")}
                        />
                        <div className="p-4 border-2 border-input rounded-lg text-center hover:border-primary transition-colors peer-checked:border-primary peer-checked:bg-primary/5">
                          <FileText className="w-8 h-8 text-[hsl(var(--pastel-blue))] mx-auto mb-2" />
                          <p className="text-sm font-semibold text-foreground">Rascunho</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={allowDownload}
                        onCheckedChange={(checked) => setAllowDownload(checked as boolean)}
                        className="w-5 h-5"
                      />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Permitir download do episodio
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Os ouvintes poderao baixar o arquivo de audio
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={allowComments}
                        onCheckedChange={(checked) => setAllowComments(checked as boolean)}
                        className="w-5 h-5"
                      />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Permitir comentarios
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Os ouvintes poderao comentar e interagir
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={notifyFollowers}
                        onCheckedChange={(checked) => setNotifyFollowers(checked as boolean)}
                        className="w-5 h-5"
                      />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Notificar seguidores
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Enviar notificacao push e email para seus seguidores
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </section>

              {/* Access Control */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(var(--pastel-pink))] text-[hsl(var(--pastel-gray-dark))] rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  Controle de Acesso e Monetizacao
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Tipo de Acesso *
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 p-4 border-2 border-input rounded-lg cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <input
                          type="radio"
                          name="access-type"
                          className="mt-1"
                          checked={accessType === "free"}
                          onChange={() => setAccessType("free")}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Globe className="w-4 h-4 text-[hsl(var(--pastel-green))]" />
                            <p className="font-semibold text-sm text-foreground">
                              Gratuito (Publico)
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Qualquer pessoa pode ouvir este podcast
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-4 border-2 border-input rounded-lg cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <input
                          type="radio"
                          name="access-type"
                          className="mt-1"
                          checked={accessType === "subscribers"}
                          onChange={() => setAccessType("subscribers")}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Crown className="w-4 h-4 text-[hsl(var(--pastel-yellow))]" />
                            <p className="font-semibold text-sm text-foreground">
                              Apenas Assinantes
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Disponivel apenas para membros Premium e VIP
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-4 border-2 border-input rounded-lg cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <input
                          type="radio"
                          name="access-type"
                          className="mt-1"
                          checked={accessType === "paid"}
                          onChange={() => setAccessType("paid")}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="w-4 h-4 text-[hsl(var(--pastel-orange))]" />
                            <p className="font-semibold text-sm text-foreground">
                              Pagamento Individual
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Venda este episodio separadamente
                          </p>
                          {accessType === "paid" && (
                            <div className="mt-3 flex items-center gap-3">
                              <Input
                                type="number"
                                placeholder="0.00"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-32"
                              />
                              <span className="text-sm text-muted-foreground">BRL</span>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="limit-participants"
                        checked={limitParticipants}
                        onCheckedChange={(checked) => setLimitParticipants(checked as boolean)}
                        className="mt-1 w-5 h-5"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="limit-participants"
                          className="text-sm font-semibold text-foreground cursor-pointer"
                        >
                          Limitar numero de ouvintes ao vivo
                        </label>
                        <p className="text-xs text-muted-foreground mb-3">
                          Defina um limite maximo de participantes simultaneos
                        </p>
                        <div className="flex items-center gap-3">
                          <Input
                            type="number"
                            placeholder="100"
                            value={maxListeners}
                            onChange={(e) => setMaxListeners(e.target.value)}
                            className="w-32"
                            disabled={!limitParticipants}
                          />
                          <span className="text-sm text-muted-foreground">participantes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SEO Settings */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(var(--pastel-yellow))] text-[hsl(var(--pastel-gray-dark))] rounded-lg flex items-center justify-center">
                    <Search className="w-5 h-5" />
                  </div>
                  SEO e Metadados
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      URL Personalizada (Slug)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">finlearn.ai/podcast/</span>
                      <Input
                        placeholder="desvendando-mercado-financeiro"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Meta Descricao
                    </label>
                    <Textarea
                      rows={3}
                      placeholder="Descricao otimizada para mecanismos de busca (max. 160 caracteres)"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value.slice(0, 160))}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {metaDescription.length} / 160 caracteres
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Palavras-chave SEO
                    </label>
                    <Input
                      placeholder="Ex: investimentos, mercado financeiro, economia"
                      value={seoKeywords}
                      onChange={(e) => setSeoKeywords(e.target.value)}
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Preview Card */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6 sticky top-8">
                <h3 className="text-lg font-bold text-foreground mb-4">Pre-visualizacao</h3>
                <div className="bg-muted rounded-lg overflow-hidden border border-border">
                  <div className="h-48 bg-gradient-to-br from-[hsl(var(--pastel-blue))] to-[hsl(var(--pastel-purple))] flex items-center justify-center overflow-hidden">
                    {imagePreviewUrl ? (
                      <img
                        src={imagePreviewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image className="w-12 h-12 text-white/50" />
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold text-[hsl(var(--pastel-gray-dark))] bg-[hsl(var(--pastel-orange))] px-2.5 py-1 rounded-full">
                      Podcast
                    </span>
                    <h4 className="font-bold text-foreground mt-3 mb-2">
                      {title || "Titulo do Podcast"}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {description || "Descricao do episodio aparecera aqui..."}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {durationEstimate || "-- min"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {publicationDate || "-- /-- /----"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                        alt="Host"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-semibold text-foreground">Marina Santos</p>
                        <p className="text-xs text-muted-foreground">Host</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quick Tips */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[hsl(var(--pastel-yellow))]" />
                  Dicas Rapidas
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Use titulos claros e descritivos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Adicione tags relevantes para melhor descoberta
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Imagens de capa atraem mais ouvintes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Qualidade de audio e fundamental</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Agende para horarios de pico</span>
                  </li>
                </ul>
              </section>

              {/* Analytics Preview */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Estatisticas Esperadas</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[hsl(var(--pastel-blue))] text-[hsl(var(--pastel-gray-dark))] rounded-lg flex items-center justify-center">
                        <Eye className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Alcance Est.</p>
                        <p className="text-lg font-bold text-foreground">12.4K</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[hsl(var(--pastel-green))] text-[hsl(var(--pastel-gray-dark))] rounded-lg flex items-center justify-center">
                        <Headphones className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Ouvintes Est.</p>
                        <p className="text-lg font-bold text-foreground">8.9K</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[hsl(var(--pastel-purple))] text-[hsl(var(--pastel-gray-dark))] rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Engajamento</p>
                        <p className="text-lg font-bold text-foreground">Alto</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Baseado no seu historico de podcasts
                </p>
              </section>

              {/* Action Buttons */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <div className="space-y-3">
                  <Button
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                  >
                    {isPublishing ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Rocket className="w-4 h-4 mr-2" />
                    )}
                    Publicar Podcast
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleSaveDraft}
                    disabled={isSaving}
                    className="w-full"
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Salvar Rascunho
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    Pre-visualizar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/criar-conteudo")}
                    className="w-full text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Descartar
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

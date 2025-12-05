import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  ChevronLeft, 
  Search, 
  Bell, 
  Download, 
  Award, 
  CheckCircle, 
  Clock, 
  Trophy,
  Eye,
  Share2,
  Hash,
  Globe,
  Flag,
  RotateCw,
  GraduationCap,
  Shield,
  TrendingUp,
  Smartphone,
  X,
  Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";

interface Certificate {
  id: number;
  title: string;
  description: string;
  institution: string;
  level: string;
  issueDate: string;
  validity: string;
  validityColor: string;
  status: string;
  statusBg: string;
  accentColor: string;
  iconBg: string;
  icon: any;
  certId: string;
  hours: string;
  scope: string;
  scopeIcon: any;
  showRenew: boolean;
}

const MeusCertificados = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [selectedCategory, setSelectedCategory] = useState("Todas as Categorias");
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const verificationUrl = useMemo(() => {
    if (!selectedCertificate) return "";
    return `https://finlearn.app/verify/${selectedCertificate.certId}`;
  }, [selectedCertificate]);

  const handleDownloadPDF = async () => {
    if (!certificateRef.current || !selectedCertificate) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = (pdfHeight - imgHeight * ratio) / 2;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`certificado-${selectedCertificate.certId}.pdf`);
      
      toast({
        title: "PDF gerado com sucesso",
        description: "O certificado foi baixado para seu dispositivo."
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar PDF",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const filters = ["Todos", "Ativos", "Expirados", "A Expirar"];
  const categories = ["Todas as Categorias", "Pagamentos", "Regulação", "Open Finance", "Gestão de Riscos", "Compliance"];

  const certificates = [
    {
      id: 1,
      title: "Certified Payment Systems Professional (CPSP)",
      description: "Certificação Internacional em Sistemas de Pagamento",
      institution: "SWIFT Institute",
      level: "Avançado",
      issueDate: "15/03/2023",
      validity: "15/03/2026",
      validityColor: "text-slate-600",
      status: "Ativo",
      statusBg: "bg-pastel-green",
      accentColor: "bg-pastel-green",
      iconBg: "bg-pastel-green/30",
      icon: Award,
      certId: "CPSP-2023-45892",
      hours: "120h",
      scope: "Internacional",
      scopeIcon: Globe,
      showRenew: false
    },
    {
      id: 2,
      title: "Especialização em Open Finance",
      description: "Certificação em Open Banking e Open Finance pelo Banco Central",
      institution: "Banco Central do Brasil",
      level: "Especialização",
      issueDate: "22/08/2022",
      validity: "Vitalício",
      validityColor: "text-slate-600",
      status: "Ativo",
      statusBg: "bg-pastel-blue",
      accentColor: "bg-pastel-blue",
      iconBg: "bg-pastel-blue/30",
      icon: Award,
      certId: "BCB-OF-2022-1234",
      hours: "200h",
      scope: "Nacional",
      scopeIcon: Flag,
      showRenew: false
    },
    {
      id: 3,
      title: "Certified Anti-Money Laundering Specialist (CAMS)",
      description: "Certificação em Prevenção à Lavagem de Dinheiro e Financiamento ao Terrorismo",
      institution: "ACAMS",
      level: "Profissional",
      issueDate: "10/06/2021",
      validity: "10/06/2024",
      validityColor: "text-destructive",
      status: "Expira em 45 dias",
      statusBg: "bg-pastel-orange",
      accentColor: "bg-pastel-purple",
      iconBg: "bg-pastel-purple/30",
      icon: Shield,
      certId: "CAMS-2021-78965",
      hours: "80h",
      scope: "Internacional",
      scopeIcon: Globe,
      showRenew: true
    },
    {
      id: 4,
      title: "MBA em Gestão de Riscos Financeiros",
      description: "Pós-Graduação em Gestão de Riscos e Compliance",
      institution: "FGV - Fundação Getulio Vargas",
      level: "MBA",
      issueDate: "18/12/2020",
      validity: "Vitalício",
      validityColor: "text-slate-600",
      status: "Ativo",
      statusBg: "bg-pastel-green",
      accentColor: "bg-pastel-yellow",
      iconBg: "bg-pastel-yellow/30",
      icon: GraduationCap,
      certId: "FGV-MBA-2020-5678",
      hours: "360h",
      scope: "Nacional",
      scopeIcon: Flag,
      showRenew: false
    },
    {
      id: 5,
      title: "Financial Risk Manager (FRM)",
      description: "Certificação Internacional em Gestão de Riscos Financeiros",
      institution: "GARP",
      level: "Profissional",
      issueDate: "05/11/2019",
      validity: "Vitalício",
      validityColor: "text-slate-600",
      status: "Ativo",
      statusBg: "bg-pastel-green",
      accentColor: "bg-pastel-pink",
      iconBg: "bg-pastel-pink/30",
      icon: TrendingUp,
      certId: "FRM-2019-34521",
      hours: "150h",
      scope: "Internacional",
      scopeIcon: Globe,
      showRenew: false
    },
    {
      id: 6,
      title: "Especialista em PIX e Pagamentos Instantâneos",
      description: "Certificação em Sistema de Pagamentos Instantâneos Brasileiro",
      institution: "Banco Central do Brasil",
      level: "Especialista",
      issueDate: "16/11/2021",
      validity: "16/11/2025",
      validityColor: "text-slate-600",
      status: "Ativo",
      statusBg: "bg-pastel-green",
      accentColor: "bg-pastel-blue",
      iconBg: "bg-pastel-blue/30",
      icon: Smartphone,
      certId: "BCB-PIX-2021-9876",
      hours: "100h",
      scope: "Nacional",
      scopeIcon: Flag,
      showRenew: false
    }
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Certificados</h1>
                <p className="text-sm text-muted-foreground">Certificações e qualificações de Marina Santos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Buscar certificado..." 
                  className="w-72 pl-10 pr-4 py-2 bg-muted border border-input rounded-lg text-sm"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              </div>
              
              <button className="relative w-10 h-10 flex items-center justify-center text-muted-foreground hover:bg-accent rounded-lg transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
              </button>
              
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Download size={16} className="mr-2" />
                Baixar Todos
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8 flex-1">
          {/* Summary Cards */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center mx-auto mb-3">
                <Award className="text-slate-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-foreground">24</p>
              <p className="text-sm text-muted-foreground mt-1">Total de Certificados</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="text-slate-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-foreground">18</p>
              <p className="text-sm text-muted-foreground mt-1">Ativos</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-pastel-orange rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="text-slate-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-foreground">6</p>
              <p className="text-sm text-muted-foreground mt-1">Próximos a Expirar</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center mx-auto mb-3">
                <Trophy className="text-slate-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-foreground">5</p>
              <p className="text-sm text-muted-foreground mt-1">Certificações Premium</p>
            </div>
          </section>

          {/* Filters */}
          <section className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground">Filtrar por:</span>
                <div className="flex gap-2 p-1 bg-muted rounded-lg border border-border">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        selectedFilter === filter
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground">Categoria:</span>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-muted border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Certificates List */}
          <section className="space-y-6">
            {certificates.map((cert) => {
              const IconComponent = cert.icon;
              const ScopeIcon = cert.scopeIcon;
              
              return (
                <div key={cert.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="flex">
                    <div className={`w-2 ${cert.accentColor} flex-shrink-0`}></div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-16 h-16 ${cert.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className="text-slate-600" size={24} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-foreground">{cert.title}</h3>
                              <span className={`text-xs font-semibold text-slate-600 ${cert.statusBg} px-2.5 py-1 rounded-full border border-border`}>
                                {cert.status}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Instituição</p>
                                <p className="font-semibold text-foreground">{cert.institution}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Nível</p>
                                <p className="font-semibold text-foreground">{cert.level}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Data de Emissão</p>
                                <p className="font-semibold text-foreground">{cert.issueDate}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Validade</p>
                                <p className={`font-semibold ${cert.validityColor}`}>{cert.validity}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button 
                            onClick={() => setSelectedCertificate(cert)}
                            className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:bg-accent rounded-lg transition-colors"
                          >
                            <Eye size={18} />
                          </button>
                          <button className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:bg-accent rounded-lg transition-colors">
                            <Download size={18} />
                          </button>
                          <button className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:bg-accent rounded-lg transition-colors">
                            <Share2 size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 pt-4 border-t border-border text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Hash size={14} className="mr-2" />
                          ID: {cert.certId}
                        </span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-2" />
                          Carga Horária: {cert.hours}
                        </span>
                        <span className={`flex items-center ${cert.scope === "Internacional" ? "bg-pastel-purple/50 text-slate-700 px-2.5 py-1 rounded-full font-semibold border border-pastel-purple" : ""}`}>
                          <ScopeIcon size={14} className="mr-2" />
                          {cert.scope}
                        </span>
                        {cert.showRenew && (
                          <button className="text-primary hover:underline font-medium flex items-center">
                            <RotateCw size={14} className="mr-1.5" />
                            Renovar Certificado
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Load More Button */}
          <div className="flex justify-center mt-8">
            <button className="px-6 py-3 border border-input rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors">
              Carregar Mais Certificados
            </button>
          </div>
        </main>
      </div>

      {/* Certificate Modal */}
      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="max-w-xl p-0 overflow-hidden">
          <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <button 
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-slate-200 transition z-10"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>
            
            {/* Certificate Design */}
            <div ref={certificateRef} className="bg-white border-[3px] border-double border-slate-300 rounded-lg p-5 shadow-lg">
              {/* Header */}
              <div className="text-center border-b-2 border-slate-200 pb-4 mb-4">
                <div className="flex justify-center mb-3">
                  <div className={`w-12 h-12 ${selectedCertificate?.iconBg} rounded-full flex items-center justify-center`}>
                    <Award className="w-6 h-6 text-slate-600" />
                  </div>
                </div>
                <h2 className="text-lg font-serif font-bold text-slate-800 mb-1">Certificado de Conclusão</h2>
                <p className="text-slate-500 text-xs uppercase tracking-widest">FinLearn Platform</p>
              </div>

              {/* Body */}
              <div className="text-center py-4">
                <p className="text-slate-600 text-xs mb-2">Certificamos que</p>
                <h3 className="text-base font-bold text-slate-800 mb-2">Marina Santos</h3>
                <p className="text-slate-600 text-xs mb-3">concluiu com êxito o programa</p>
                <h4 className="text-sm font-semibold text-slate-800 mb-3 px-4">
                  {selectedCertificate?.title}
                </h4>
                <p className="text-slate-600 text-xs mb-1">
                  {selectedCertificate?.description}
                </p>
                <p className="text-slate-500 text-xs">
                  com carga horária de {selectedCertificate?.hours}, demonstrando aproveitamento satisfatório.
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-4 gap-3 py-4 border-y border-slate-200 my-4">
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 mb-0.5">Instituição</p>
                  <p className="text-xs font-semibold text-slate-700">{selectedCertificate?.institution}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 mb-0.5">Nível</p>
                  <p className="text-xs font-semibold text-slate-700">{selectedCertificate?.level}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 mb-0.5">Data de Emissão</p>
                  <p className="text-xs font-semibold text-slate-700">{selectedCertificate?.issueDate}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 mb-0.5">Validade</p>
                  <p className={`text-xs font-semibold ${selectedCertificate?.validityColor}`}>{selectedCertificate?.validity}</p>
                </div>
              </div>

              {/* Footer with QR Code */}
              <div className="flex justify-between items-end mt-4">
                <div className="text-center">
                  <div className="w-20 border-t border-slate-400 mb-1"></div>
                  <p className="text-[10px] text-slate-500">Escopo</p>
                  <p className="text-xs font-medium text-slate-700">{selectedCertificate?.scope}</p>
                </div>
                
                {/* QR Code for Verification */}
                <div className="text-center">
                  <div className="bg-white p-1.5 rounded-lg border border-slate-200 mb-1 flex items-center justify-center">
                    <QRCodeSVG 
                      value={verificationUrl} 
                      size={50}
                      level="M"
                      includeMargin={false}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">Escaneie para verificar</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 border-t border-slate-400 mb-1"></div>
                  <p className="text-[10px] text-slate-500">Assinatura</p>
                  <p className="text-xs font-medium text-slate-700 font-serif italic">Diretor Acadêmico</p>
                </div>
              </div>

              {/* Certificate ID */}
              <div className="mt-4 text-center">
                <p className="text-[10px] text-slate-400">
                  ID: {selectedCertificate?.certId}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4 mt-6">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleDownloadPDF}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {isDownloading ? "Gerando..." : "Baixar PDF"}
              </Button>
              <Button className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Share2 className="w-4 h-4" /> Compartilhar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeusCertificados;

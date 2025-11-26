import { useState, useEffect } from 'react';
import { Settings, DollarSign, Bookmark, FileText, TrendingUp } from 'lucide-react';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

const AVAILABLE_CATEGORIES = [
  'Open Finance',
  'Pagamentos Digitais',
  'Blockchain',
  'Compliance',
  'Risco de Crédito',
  'Análise Técnica',
  'ESG',
  'Banking as a Service',
  'Cibersegurança',
  'Regulação',
];

const AVAILABLE_CONTENT_TYPES = [
  'Podcast',
  'Cursos',
  'E-books',
  'Webinars',
  'Artigos',
  'Análises',
  'Relatórios',
  'Newspaper',
  'Estudos Acadêmicos',
  'Infográficos',
  'Whitepapers',
  'Apresentações',
];

const SKILL_LEVELS = [
  { value: 'iniciante', label: 'Iniciante' },
  { value: 'intermediario', label: 'Intermediário' },
  { value: 'avancado', label: 'Avançado' },
  { value: 'especialista', label: 'Especialista' },
];

export const UserPreferencesForm = () => {
  const { preferences, isLoading, isSaving, savePreferences } = useUserPreferences();
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [skillLevel, setSkillLevel] = useState('intermediario');

  useEffect(() => {
    if (preferences) {
      setSelectedCategories(preferences.preferred_categories || []);
      setSelectedContentTypes(preferences.preferred_content_types || []);
      setPriceRange([
        preferences.price_range_min || 0,
        preferences.price_range_max || 1000
      ]);
      setSkillLevel(preferences.skill_level || 'intermediario');
    }
  }, [preferences]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleContentType = (type: string) => {
    setSelectedContentTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSave = async () => {
    await savePreferences({
      preferred_categories: selectedCategories,
      preferred_content_types: selectedContentTypes,
      price_range_min: priceRange[0],
      price_range_max: priceRange[1],
      skill_level: skillLevel,
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Categorias Preferidas */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
            <Bookmark className="text-slate-700" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Categorias de Interesse</h3>
            <p className="text-sm text-slate-500">Selecione os temas que mais interessam você</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {AVAILABLE_CATEGORIES.map((category) => (
            <Badge
              key={category}
              onClick={() => toggleCategory(category)}
              className={`cursor-pointer px-4 py-2 transition-all ${
                selectedCategories.includes(category)
                  ? 'bg-[hsl(142,35%,50%)] hover:bg-[hsl(142,35%,45%)] text-slate-800'
                  : 'bg-[hsl(206,35%,75%)] hover:bg-[hsl(206,35%,65%)] text-slate-700'
              }`}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tipos de Conteúdo */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
            <FileText className="text-slate-700" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Tipos de Conteúdo</h3>
            <p className="text-sm text-slate-500">Escolha os formatos que você prefere consumir</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {AVAILABLE_CONTENT_TYPES.map((type) => (
            <Badge
              key={type}
              onClick={() => toggleContentType(type)}
              className={`cursor-pointer px-4 py-2 transition-all ${
                selectedContentTypes.includes(type)
                  ? 'bg-[hsl(142,35%,50%)] hover:bg-[hsl(142,35%,45%)] text-slate-800'
                  : 'bg-[hsl(206,35%,75%)] hover:bg-[hsl(206,35%,65%)] text-slate-700'
              }`}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      {/* Faixa de Preço */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
            <DollarSign className="text-slate-700" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Faixa de Preço</h3>
            <p className="text-sm text-slate-500">Defina o orçamento para conteúdos pagos</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              R$ {priceRange[0].toFixed(2)}
            </span>
            <span className="text-sm font-medium text-slate-700">
              R$ {priceRange[1].toFixed(2)}
            </span>
          </div>
          
          <Slider
            min={0}
            max={2000}
            step={10}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="w-full"
          />
          
          <p className="text-xs text-slate-500 text-center">
            Recomendações serão filtradas dentro desta faixa de preço
          </p>
        </div>
      </div>

      {/* Nível de Conhecimento */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
            <TrendingUp className="text-slate-700" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Nível de Conhecimento</h3>
            <p className="text-sm text-slate-500">Selecione seu nível de experiência no mercado financeiro</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {SKILL_LEVELS.map((level) => (
            <button
              key={level.value}
              onClick={() => setSkillLevel(level.value)}
              className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                skillLevel === level.value
                  ? 'border-[hsl(142,35%,50%)] bg-[hsl(142,35%,95%)] text-slate-800'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-[hsl(142,35%,50%)] hover:bg-[hsl(142,35%,45%)] text-slate-800 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Settings size={18} />
          {isSaving ? 'Salvando...' : 'Salvar Preferências'}
        </button>
      </div>
    </div>
  );
};

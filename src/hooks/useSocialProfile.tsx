import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface WorkExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startYear: string;
  endYear: string;
  current: boolean;
}

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  facebook?: string;
  github?: string;
  tiktok?: string;
  threads?: string;
  medium?: string;
  telegram?: string;
  whatsapp?: string;
  portfolio?: string;
}

export interface SocialProfile {
  id?: string;
  user_id?: string;
  display_name: string;
  professional_title: string;
  subtitle: string;
  bio: string;
  location: string;
  institution: string;
  member_since: string;
  avatar_url: string;
  cover_url: string;
  social_links: SocialLinks;
  work_experiences: WorkExperience[];
  contact_message: boolean;
  contact_audio: boolean;
  contact_video: boolean;
  contact_email_enabled: boolean;
  contact_email: string;
  contact_phone: string;
}

export interface ValidationErrors {
  display_name?: string;
  professional_title?: string;
  bio?: string;
}

const defaultProfile: SocialProfile = {
  display_name: '',
  professional_title: '',
  subtitle: '',
  bio: '',
  location: '',
  institution: '',
  member_since: '2024',
  avatar_url: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
  cover_url: '',
  social_links: {},
  work_experiences: [],
  contact_message: false,
  contact_audio: false,
  contact_video: false,
  contact_email_enabled: false,
  contact_email: '',
  contact_phone: '',
};

export const useSocialProfile = () => {
  const [profile, setProfile] = useState<SocialProfile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const { toast } = useToast();
  const { user } = useAuth();

  const validateProfile = (data: SocialProfile): ValidationErrors => {
    const errors: ValidationErrors = {};
    
    if (!data.display_name || data.display_name.trim() === '') {
      errors.display_name = 'Nome de exibição é obrigatório';
    }
    
    if (!data.professional_title || data.professional_title.trim() === '') {
      errors.professional_title = 'Título profissional é obrigatório';
    }
    
    if (!data.bio || data.bio.trim() === '') {
      errors.bio = 'Biografia é obrigatória';
    } else if (data.bio.length > 500) {
      errors.bio = 'Biografia deve ter no máximo 500 caracteres';
    }
    
    return errors;
  };

  const fetchProfile = async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('social_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        const socialLinks = data.social_links as unknown as SocialLinks || {};
        const workExperiences = Array.isArray(data.work_experiences) 
          ? data.work_experiences as unknown as WorkExperience[]
          : [];
        
        setProfile({
          ...defaultProfile,
          id: data.id,
          user_id: data.user_id,
          display_name: data.display_name || '',
          professional_title: data.professional_title || '',
          subtitle: data.subtitle || '',
          bio: data.bio || '',
          location: data.location || '',
          institution: data.institution || '',
          member_since: data.member_since || '2024',
          avatar_url: data.avatar_url || defaultProfile.avatar_url,
          cover_url: data.cover_url || '',
          social_links: socialLinks,
          work_experiences: workExperiences,
          contact_message: data.contact_message || false,
          contact_audio: data.contact_audio || false,
          contact_video: data.contact_video || false,
          contact_email_enabled: data.contact_email_enabled || false,
          contact_email: data.contact_email || '',
          contact_phone: data.contact_phone || '',
        });
      }
    } catch (error) {
      console.error('Error fetching social profile:', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar perfil',
        description: 'Não foi possível carregar seu perfil social.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveProfile = async (showValidation = true): Promise<boolean> => {
    if (!user?.id) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Você precisa estar logado para salvar o perfil.',
      });
      return false;
    }

    // Validate required fields
    const errors = validateProfile(profile);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0 && showValidation) {
      toast({
        variant: 'destructive',
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos obrigatórios marcados.',
      });
      return false;
    }

    setIsSaving(true);
    try {
      const profileData = {
        user_id: user.id,
        display_name: profile.display_name || null,
        professional_title: profile.professional_title || null,
        subtitle: profile.subtitle || null,
        bio: profile.bio || null,
        location: profile.location || null,
        institution: profile.institution || null,
        member_since: profile.member_since || null,
        avatar_url: profile.avatar_url || null,
        cover_url: profile.cover_url || null,
        social_links: profile.social_links as Record<string, unknown>,
        work_experiences: profile.work_experiences as unknown as Record<string, unknown>[],
        contact_message: profile.contact_message,
        contact_audio: profile.contact_audio,
        contact_video: profile.contact_video,
        contact_email_enabled: profile.contact_email_enabled,
        contact_email: profile.contact_email || null,
        contact_phone: profile.contact_phone || null,
      };

      const { error } = await supabase
        .from('social_profiles')
        .upsert(profileData as never, { onConflict: 'user_id' });

      if (error) throw error;

      toast({
        title: 'Perfil salvo',
        description: 'Suas informações foram salvas com sucesso.',
      });

      return true;
    } catch (error) {
      console.error('Error saving social profile:', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar seu perfil social.',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const updateProfile = (updates: Partial<SocialProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    
    // Clear validation errors for updated fields
    const updatedFields = Object.keys(updates);
    if (updatedFields.some(field => field in validationErrors)) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        updatedFields.forEach(field => {
          delete newErrors[field as keyof ValidationErrors];
        });
        return newErrors;
      });
    }
  };

  const updateSocialLink = (key: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      social_links: { ...prev.social_links, [key]: value }
    }));
  };

  const addWorkExperience = () => {
    setProfile(prev => ({
      ...prev,
      work_experiences: [
        ...prev.work_experiences,
        {
          id: Date.now().toString(),
          company: '',
          role: '',
          location: '',
          startYear: '',
          endYear: '',
          current: false
        }
      ]
    }));
  };

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: string | boolean) => {
    setProfile(prev => ({
      ...prev,
      work_experiences: prev.work_experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeWorkExperience = (id: string) => {
    setProfile(prev => ({
      ...prev,
      work_experiences: prev.work_experiences.filter(exp => exp.id !== id)
    }));
  };

  const getCompletionPercentage = (): number => {
    let filled = 0;
    const total = 6;

    if (profile.display_name) filled++;
    if (profile.professional_title) filled++;
    if (profile.bio) filled++;
    if (profile.location) filled++;
    if (profile.institution) filled++;
    if (profile.avatar_url && profile.avatar_url !== defaultProfile.avatar_url) filled++;

    return Math.round((filled / total) * 100);
  };

  useEffect(() => {
    fetchProfile();
  }, [user?.id]);

  return {
    profile,
    isLoading,
    isSaving,
    validationErrors,
    updateProfile,
    updateSocialLink,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    saveProfile,
    refreshProfile: fetchProfile,
    getCompletionPercentage,
  };
};

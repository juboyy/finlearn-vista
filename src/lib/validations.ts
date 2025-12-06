import { z } from "zod";

// Common validation patterns
const emailSchema = z.string()
  .trim()
  .email({ message: "Email invalido" })
  .max(255, { message: "Email deve ter menos de 255 caracteres" });

const nameSchema = z.string()
  .trim()
  .min(1, { message: "Nome e obrigatorio" })
  .max(100, { message: "Nome deve ter menos de 100 caracteres" });

const titleSchema = z.string()
  .trim()
  .min(1, { message: "Titulo e obrigatorio" })
  .max(200, { message: "Titulo deve ter menos de 200 caracteres" });

const descriptionSchema = z.string()
  .trim()
  .max(5000, { message: "Descricao deve ter menos de 5000 caracteres" })
  .optional();

const urlSchema = z.string()
  .url({ message: "URL invalida" })
  .optional()
  .or(z.literal(""));

// Event/Agenda validation
export const eventSchema = z.object({
  title: titleSchema,
  description: z.string().max(500, "Descricao muito longa").optional(),
  activity_type: z.string().min(1, "Tipo e obrigatorio"),
  start_time: z.string().min(1, "Data/hora inicial e obrigatoria"),
  end_time: z.string().min(1, "Data/hora final e obrigatoria"),
  location: z.string().max(200, "Local muito longo").optional(),
  color: z.string(),
});

export type EventFormData = z.infer<typeof eventSchema>;

// Community creation validation
export const communitySchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "Nome da comunidade e obrigatorio" })
    .max(100, { message: "Nome deve ter menos de 100 caracteres" }),
  description: z.string()
    .trim()
    .min(1, { message: "Descricao e obrigatoria" })
    .max(2000, { message: "Descricao deve ter menos de 2000 caracteres" }),
  category: z.string().min(1, { message: "Categoria e obrigatoria" }),
  privacy: z.enum(["public", "private", "invite_only"], {
    errorMap: () => ({ message: "Tipo de comunidade invalido" })
  }),
});

export type CommunityFormData = z.infer<typeof communitySchema>;

// Podcast creation validation
export const podcastSchema = z.object({
  title: titleSchema,
  category: z.string().min(1, { message: "Categoria e obrigatoria" }),
  durationEstimate: z.string().min(1, { message: "Duracao e obrigatoria" }),
  description: z.string()
    .trim()
    .min(1, { message: "Descricao e obrigatoria" })
    .max(5000, { message: "Descricao deve ter menos de 5000 caracteres" }),
  publicationDate: z.string().min(1, { message: "Data de publicacao e obrigatoria" }),
  publicationTime: z.string().min(1, { message: "Horario e obrigatorio" }),
});

export type PodcastFormData = z.infer<typeof podcastSchema>;

// Live poll creation validation
export const pollSchema = z.object({
  question: z.string()
    .trim()
    .min(1, { message: "Pergunta e obrigatoria" })
    .max(500, { message: "Pergunta deve ter menos de 500 caracteres" }),
  options: z.array(z.string().trim().min(1, { message: "Opcao nao pode estar vazia" }))
    .min(2, { message: "Adicione pelo menos 2 opcoes" })
    .max(6, { message: "Maximo de 6 opcoes" }),
});

export type PollFormData = z.infer<typeof pollSchema>;

// Live chat message validation
export const chatMessageSchema = z.object({
  message: z.string()
    .trim()
    .min(1, { message: "Mensagem nao pode estar vazia" })
    .max(1000, { message: "Mensagem deve ter menos de 1000 caracteres" }),
});

export type ChatMessageFormData = z.infer<typeof chatMessageSchema>;

// Moderation - Add moderator validation
export const moderatorSchema = z.object({
  name: nameSchema,
});

export type ModeratorFormData = z.infer<typeof moderatorSchema>;

// Moderation - Ban user validation
export const banUserSchema = z.object({
  userId: z.string().min(1, { message: "ID do usuario e obrigatorio" }),
  userName: nameSchema,
  reason: z.string().max(500, { message: "Motivo deve ter menos de 500 caracteres" }).optional(),
  banType: z.enum(["temporary", "permanent"]),
});

export type BanUserFormData = z.infer<typeof banUserSchema>;

// Chat filter validation
export const chatFilterSchema = z.object({
  filterType: z.enum(["word", "regex", "link"]),
  filterValue: z.string()
    .trim()
    .min(1, { message: "Valor do filtro e obrigatorio" })
    .max(200, { message: "Valor deve ter menos de 200 caracteres" }),
});

export type ChatFilterFormData = z.infer<typeof chatFilterSchema>;

// Bank account validation
export const bankAccountSchema = z.object({
  bank_name: z.string()
    .trim()
    .min(1, { message: "Nome do banco e obrigatorio" })
    .max(100, { message: "Nome do banco deve ter menos de 100 caracteres" }),
  agency: z.string()
    .trim()
    .min(1, { message: "Agencia e obrigatoria" })
    .max(10, { message: "Agencia deve ter menos de 10 caracteres" })
    .regex(/^\d+(-\d)?$/, { message: "Agencia invalida" }),
  account_number: z.string()
    .trim()
    .min(1, { message: "Numero da conta e obrigatorio" })
    .max(20, { message: "Numero da conta deve ter menos de 20 caracteres" }),
  holder_name: nameSchema,
  holder_document: z.string()
    .trim()
    .min(11, { message: "CPF/CNPJ invalido" })
    .max(18, { message: "CPF/CNPJ invalido" }),
  account_type: z.enum(["checking", "savings"]).optional(),
});

export type BankAccountFormData = z.infer<typeof bankAccountSchema>;

// Credit card validation
export const creditCardSchema = z.object({
  cardNumber: z.string()
    .trim()
    .min(13, { message: "Numero do cartao invalido" })
    .max(19, { message: "Numero do cartao invalido" }),
  cardHolderName: z.string()
    .trim()
    .min(1, { message: "Nome do titular e obrigatorio" })
    .max(100, { message: "Nome deve ter menos de 100 caracteres" }),
  expiryMonth: z.string()
    .min(1, { message: "Mes de validade e obrigatorio" })
    .regex(/^(0[1-9]|1[0-2])$/, { message: "Mes invalido" }),
  expiryYear: z.string()
    .min(2, { message: "Ano de validade e obrigatorio" })
    .max(4, { message: "Ano invalido" }),
  cvv: z.string()
    .min(3, { message: "CVV deve ter 3 ou 4 digitos" })
    .max(4, { message: "CVV deve ter 3 ou 4 digitos" })
    .regex(/^\d+$/, { message: "CVV deve conter apenas numeros" }),
  documentNumber: z.string()
    .trim()
    .min(11, { message: "CPF/CNPJ invalido" })
    .max(18, { message: "CPF/CNPJ invalido" }),
});

export type CreditCardFormData = z.infer<typeof creditCardSchema>;

// Newsletter creation validation
export const newsletterSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  frequency: z.string().optional(),
  monthlyPrice: z.number().min(0, { message: "Preco deve ser positivo" }).optional(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Alert preference validation
export const alertPreferenceSchema = z.object({
  content_type: z.string().min(1, { message: "Tipo de conteudo e obrigatorio" }),
  metric_name: z.string().min(1, { message: "Nome da metrica e obrigatorio" }),
  threshold_value: z.number().min(0, { message: "Valor deve ser positivo" }),
  threshold_type: z.enum(["percentage", "absolute"]),
  threshold_direction: z.enum(["increase", "decrease", "both"]),
  alert_frequency: z.enum(["realtime", "daily", "weekly"]),
});

export type AlertPreferenceFormData = z.infer<typeof alertPreferenceSchema>;

// Invitation validation
export const invitationSchema = z.object({
  email: emailSchema,
  name: z.string().trim().max(100, { message: "Nome deve ter menos de 100 caracteres" }).optional(),
});

export type InvitationFormData = z.infer<typeof invitationSchema>;

// Product/Ebook creation validation
export const productSchema = z.object({
  title: titleSchema,
  subtitle: z.string().max(200, { message: "Subtitulo deve ter menos de 200 caracteres" }).optional(),
  shortDescription: z.string()
    .trim()
    .min(1, { message: "Descricao curta e obrigatoria" })
    .max(500, { message: "Descricao curta deve ter menos de 500 caracteres" }),
  longDescription: z.string()
    .max(10000, { message: "Descricao longa deve ter menos de 10000 caracteres" })
    .optional(),
  category: z.string().min(1, { message: "Categoria e obrigatoria" }),
  authorName: nameSchema,
  credentials: z.string()
    .trim()
    .min(1, { message: "Credenciais sao obrigatorias" })
    .max(500, { message: "Credenciais devem ter menos de 500 caracteres" }),
  price: z.number().min(0, { message: "Preco deve ser positivo" }).optional(),
  language: z.string().min(1, { message: "Idioma e obrigatorio" }),
});

export type ProductFormData = z.infer<typeof productSchema>;

// Slide/Presentation creation validation
export const presentationSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  topic: z.string().max(200, { message: "Topico deve ter menos de 200 caracteres" }).optional(),
  targetAudience: z.string().max(200, { message: "Publico-alvo deve ter menos de 200 caracteres" }).optional(),
});

export type PresentationFormData = z.infer<typeof presentationSchema>;

// Agent creation validation
export const agentSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "Nome do agente e obrigatorio" })
    .max(50, { message: "Nome deve ter menos de 50 caracteres" }),
  description: z.string()
    .trim()
    .min(1, { message: "Descricao e obrigatoria" })
    .max(1000, { message: "Descricao deve ter menos de 1000 caracteres" }),
  specialty: z.string().min(1, { message: "Especialidade e obrigatoria" }),
  memoryType: z.enum(["short", "medium", "long"]),
  storageLimit: z.number().min(0).max(200),
});

export type AgentFormData = z.infer<typeof agentSchema>;

// Utility function to validate and get errors
export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: boolean; data?: T; errors: Record<string, string> } {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data, errors: {} };
  }
  
  const errors: Record<string, string> = {};
  result.error.errors.forEach((err) => {
    const path = err.path.join(".") || "general";
    if (!errors[path]) {
      errors[path] = err.message;
    }
  });
  
  return { success: false, errors };
}

// Helper to get first error message
export function getFirstError(errors: Record<string, string>): string {
  const keys = Object.keys(errors);
  return keys.length > 0 ? errors[keys[0]] : "Erro de validacao";
}

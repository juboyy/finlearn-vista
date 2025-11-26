# Sistema de Notificações de Promoções

Este documento explica como funciona o sistema de notificações automáticas quando produtos similares aos visualizados entram em promoção.

## Arquitetura

### 1. Tabelas do Banco de Dados

#### `product_promotions`
Armazena informações sobre promoções de produtos:
- `product_id`: ID do produto
- `product_type`: Tipo (ebook, curso, etc)
- `product_title`: Título do produto
- `product_category`: Categoria
- `product_tags`: Tags do produto
- `original_price`: Preço original
- `promotional_price`: Preço promocional
- `discount_percentage`: Porcentagem de desconto
- `starts_at`: Data de início
- `ends_at`: Data de término
- `is_active`: Status ativo/inativo

#### `user_notifications`
Armazena notificações dos usuários:
- `user_id`: ID do usuário
- `notification_type`: Tipo (promotion, recommendation, system)
- `title`: Título da notificação
- `message`: Mensagem
- `action_url`: URL de ação ao clicar
- `metadata`: Dados adicionais em JSON
- `is_read`: Status de leitura
- `created_at`: Data de criação

#### `user_browsing_history`
Armazena histórico de visualização (já existente):
- Usado para identificar quais usuários visualizaram produtos similares

### 2. Edge Function

**`notify-similar-promotions`**

Função que detecta usuários interessados e cria notificações quando uma promoção é criada.

**Como funciona:**
1. Recebe o ID de uma nova promoção
2. Busca usuários que visualizaram produtos similares (mesma categoria ou tags em comum)
3. Cria notificações personalizadas para cada usuário
4. As notificações aparecem automaticamente em tempo real

### 3. Frontend

**Componentes:**
- `NotificationsPanel`: Painel lateral de notificações
- `useNotifications`: Hook para gerenciar notificações

**Funcionalidades:**
- Exibição de notificações em tempo real
- Contador de não lidas
- Marcar como lida
- Marcar todas como lidas
- Excluir notificação
- Navegar para o produto ao clicar

## Como Usar

### 1. Criar uma Promoção

```typescript
// Exemplo: Criar promoção via Supabase
const { data, error } = await supabase
  .from('product_promotions')
  .insert({
    product_id: 'ebook-001',
    product_type: 'ebook',
    product_title: 'Gestão de Riscos Financeiros',
    product_category: 'Gestão de Riscos',
    product_tags: ['risco', 'gestão', 'financeiro'],
    original_price: 89,
    promotional_price: 44.50,
    discount_percentage: 50,
    ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 dias
  })
  .select()
  .single();
```

### 2. Notificar Usuários Interessados

Após criar a promoção, chame a edge function:

```typescript
const { data: result, error } = await supabase.functions.invoke(
  'notify-similar-promotions',
  {
    body: { promotionId: data.id }
  }
);

console.log(`Notificados ${result.notified_count} usuários`);
```

### 3. Adicionar Painel de Notificações em uma Página

```typescript
import { useState } from 'react';
import { NotificationsPanel } from '@/components/NotificationsPanel';
import { useNotifications } from '@/hooks/useNotifications';
import { Bell } from 'lucide-react';

function MyPage() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const userId = "user-123"; // Obter do contexto de autenticação
  const { unreadCount } = useNotifications(userId);

  return (
    <>
      <button onClick={() => setNotificationsOpen(true)} className="relative">
        <Bell />
        {unreadCount > 0 && (
          <span className="badge">{unreadCount}</span>
        )}
      </button>

      <NotificationsPanel 
        open={notificationsOpen}
        onOpenChange={setNotificationsOpen}
        userId={userId}
      />
    </>
  );
}
```

## Algoritmo de Similaridade

O sistema considera produtos similares quando:

1. **Mesma categoria**: Produto está na mesma categoria dos visualizados
2. **Tags em comum**: Compartilha pelo menos uma tag com produtos visualizados

**Exemplo:**
- Usuário visualizou: "Análise Técnica" (categoria: "Análise de Mercado", tags: ["análise", "trading"])
- Nova promoção: "Gestão de Riscos" (categoria: "Gestão de Riscos", tags: ["risco", "análise"])
- ✅ Usuário será notificado (tag "análise" em comum)

## Notificações em Tempo Real

O sistema usa Supabase Realtime para entregar notificações instantaneamente:

```typescript
// Automaticamente configurado no useNotifications hook
const channel = supabase
  .channel('user-notifications')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'user_notifications',
    filter: `user_id=eq.${userId}`
  }, (payload) => {
    // Nova notificação recebida!
    toast.show(payload.new.title, payload.new.message);
  })
  .subscribe();
```

## Exemplo de Fluxo Completo

```typescript
// 1. Criar promoção
const promotion = await createPromotion({
  product_id: 'curso-002',
  title: 'Open Finance na Prática',
  category: 'Tecnologia Financeira',
  tags: ['open finance', 'fintech'],
  discount: 40
});

// 2. Notificar usuários interessados
await notifyInterestedUsers(promotion.id);

// 3. Usuários recebem notificações automaticamente
// 4. Ao clicar, são direcionados para a página do produto
```

## Métricas e Monitoramento

Para acompanhar a efetividade do sistema:

```sql
-- Quantas notificações foram enviadas
SELECT COUNT(*) FROM user_notifications 
WHERE notification_type = 'promotion';

-- Taxa de conversão (cliques)
SELECT 
  COUNT(CASE WHEN is_read THEN 1 END) * 100.0 / COUNT(*) as read_rate
FROM user_notifications 
WHERE notification_type = 'promotion';

-- Promoções mais efetivas
SELECT 
  metadata->>'product_id' as product,
  COUNT(*) as notifications_sent,
  COUNT(CASE WHEN is_read THEN 1 END) as clicks
FROM user_notifications
WHERE notification_type = 'promotion'
GROUP BY metadata->>'product_id'
ORDER BY clicks DESC;
```

## Manutenção

### Limpar Notificações Antigas

```sql
-- Deletar notificações lidas com mais de 30 dias
DELETE FROM user_notifications
WHERE is_read = true 
AND created_at < NOW() - INTERVAL '30 days';
```

### Desativar Promoções Expiradas

```sql
-- Executar periodicamente (ou via cron job)
SELECT deactivate_expired_promotions();
```

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="account" className="flex-1">Minha Conta</TabsTrigger>
            <TabsTrigger value="subscription" className="flex-1">Assinatura</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" defaultValue="João Silva" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="joao.silva@email.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" defaultValue="+55 11 98765-4321" />
              </div>
              
              <Button>Salvar Alterações</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="subscription" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Plano Atual</h3>
                  <p className="text-sm text-muted-foreground">Premium - Mensal</p>
                </div>
                <Badge variant="secondary">Ativo</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Valor</span>
                  <span className="font-medium">R$ 49,90/mês</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Próxima cobrança</span>
                  <span className="font-medium">15/12/2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Método de pagamento</span>
                  <span className="font-medium">Cartão •••• 4321</span>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline">Alterar Plano</Button>
                <Button variant="outline">Cancelar Assinatura</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

# Gerar prompt completo do Planner de Estudos

## Objetivo
Criar um prompt de texto completo e bem estruturado, baseado nos arquivos atuais do projeto, para que o usuário possa copiar e colar e enviar a um colega de trabalho. O colega poderá usar o prompt para recriar ou entender a ferramenta de planner de estudos.

## O que será entregue
1. Um bloco de texto único em português, pronto para copiar e colar.
2. O prompt conterá:
   - Contexto e objetivo do planner.
   - Estrutura do curso: título, 6 módulos, tópicos, 189 aulas, duração e materiais.
   - Funcionalidades da interface: status de aula (pendente/em andamento/concluído), anotações por aula, busca, filtro de pendentes, expansão/recolhimento de módulos, barra de progresso, cálculo de dias restantes, horas restantes e estudo por dia.
   - Persistência: salvamento automático no navegador, data do último salvamento, exportar/importar backup JSON.
   - Tarefas avulsas com checkbox e remoção.
   - Instruções técnicas de implementação sugeridas (stack React + localStorage).
   - Sugestão de como o colega pode adaptar para outro curso.

## Como será feito
- Usar o conteúdo já lido de `src/lib/course-data.ts` e `src/routes/index.tsx`.
- Não alterar código do projeto nesta etapa; apenas gerar o texto do prompt.
- Entregar o prompt diretamente na resposta do chat, sem criar arquivo adicional no repositório.

# Prompt de comando do Planner de Estudos

## Objetivo
Gerar um prompt completo e detalhado que permita a um colega de trabalho recriar o "Planner de Estudos do Curso de Product Management" em outro ambiente (IA, ferramenta ou projeto próprio), mantendo todas as funcionalidades, regras e comportamentos atuais.

## Entregável
Um arquivo de texto (ou resposta no chat) contendo o prompt de comando pronto para copiar e colar, com:

1. **Contexto e propósito** — o que é o planner e para quem serve.
2. **Estrutura de dados** — curso, módulos, tópicos, aulas, metadados (duração, material, opcional/em breve).
3. **Funcionalidades obrigatórias** — status das aulas, datas de início/limite, cálculos de progresso, busca, filtros, anotações, tarefas, backup/exportação/importação.
4. **Regras de comportamento** — ciclo de status, persistência no navegador, cálculo de ritmo de estudo, tratamento de dados.
5. **Referência de dados** — instrução para usar o conteúdo de `src/lib/course-data.ts` como base de aulas (sem colar o arquivo inteiro no prompt, mas indicando que ele deve ser fornecido).
6. **Restrições técnicas** — usar React + TypeScript, Tailwind CSS, salvamento via localStorage, sem backend obrigatório.

## Abordagem
- Ler `src/routes/index.tsx` e `src/lib/course-data.ts` para extrair funcionalidades e regras reais.
- Redigir o prompt em português, na primeira pessoa do colega ("Crie um planner..."), de forma direta e executável.
- Incluir exemplos visuais das seções da interface para facilitar reprodução.
- Manter o tom prático, sem exigir design específico além do "layout simples e fácil de gerenciar".

## Fora do escopo
- Alterar o planner atual.
- Publicar o projeto.
- Criar backend ou autenticação.

# Duolingo Dev

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" height="30" alt="React Native"/>
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" height="30" alt="Expo"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" height="30" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" height="30" alt="Python Learning"/>
</p>

<p align="center">
  <strong>Um aplicativo mobile inspirado no Duolingo para aprender Python de forma interativa!</strong>
</p>

> Aplicativo React Native (Expo) com lições, perguntas de múltipla escolha, preenchimento de lacunas e predição de saída. Inclui dicas, realce de código, feedback com cores e sistema de XP.

## Índice

- [Principais Recursos](#-principais-recursos)
- [Requisitos](#-requisitos)
- [Instalação](#-instalação)
- [Executando](#-executando)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Modelo de Dados](#-modelo-de-dados)
- [Solução de Problemas](#-solução-de-problemas)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Licença](#-licença)

## Principais Recursos

- **Tipos de exercícios**: `mcq` (múltipla escolha), `fill` (preencher lacuna) e `output-prediction` (prever saída).
- **Dicas**: Botão “Hint” no rodapé abre um modal com dicas; se houver várias, é possível navegar com “Next”.
- **Starter code sempre visível**: Realce de sintaxe com `@wooorm/starry-night` e fallback em texto monoespaçado.
- **Feedback imediato**: Cores e explicações para acertos e erros.
- **Botão Next ao errar**: Permite avançar para a próxima questão mesmo após erro.
- **XP por questão**: Ganhe XP ao acertar e avance de nível!

## Requisitos

- Node.js 18+ e npm 9+
- Aplicativo Expo Go instalado no celular (Android/iOS)

## Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Keymiuz/Duolingo-Dev.git
    cd Duolingo-Dev
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```
    > Se encontrar conflitos (`ERESOLVE`), rode: `npm install --legacy-peer-deps`

## Executando

1.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm start
    ```
2.  Abra o app **Expo Go** no seu celular e escaneie o QR Code.

## Estrutura do Projeto

```
src/
  components/     # Componentes reutilizáveis (exercícios, etc)
  data/           # Dados estáticos (lições em JSON)
  screens/        # Telas principais do app
  services/       # Lógica de busca de dados
  theme/          # Configurações de tema (cores, fontes)
  types/          # Definições de tipos TypeScript
```

## Modelo de Dados

As lições e exercícios seguem uma estrutura JSON para facilitar a criação de conteúdo.

- **Tipos Principais**: `Lesson` e `Exercise` em `src/types/index.ts`.
- **Exemplo de Lição**: `src/data/lessons/sample-lesson-01.json`.

<details>
  <summary>Clique para ver um exemplo de lição em JSON</summary>

```json
{
  "id": "py-01-variables",
  "title": "Variables & Data Types",
  "xp": 50,
  "level": 1,
  "exercises": [
    {
      "type": "mcq",
      "prompt": "What is the type of `3.14` in Python?",
      "choices": ["int", "float", "str", "bool"],
      "answer": "float",
      "hints": ["Think about decimals."],
      "explanation": "3.14 is a floating-point number (float)."
    }
  ]
}
```

</details>

## Solução de Problemas

- **Conflito de dependências (ERESOLVE)**: Rode `npm install --legacy-peer-deps`.
- **Expo não recarrega**: Pare o servidor e rode `expo start -c` para limpar o cache.
- **Sem highlight no código**: O app mostra fallback monoespaçado automaticamente; verifique se `starterCode` existe na questão.

## Scripts Disponíveis

- `npm start` — Inicia o Metro/Expo.
- `npm run android` — Abre no Android.
- `npm run ios` — Abre no iOS (macOS necessário).
- `npm run web` — Abre no navegador.

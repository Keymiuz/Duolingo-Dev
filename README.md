## Duolingo Dev — Curso de Python

Aplicativo React Native (Expo) inspirado no Duolingo para aprender Python com lições, perguntas de múltipla escolha, preenchimento de lacunas e predição de saída. Inclui dicas, realce de código, feedback com cores e sistema de XP.

### Principais recursos

- **Tipos de exercícios**: `mcq` (múltipla escolha), `fill` (preencher lacuna) e `output-prediction` (prever saída).
- **Dicas**: botão “Hint” no rodapé abre um modal com dicas; se houver várias, é possível navegar com “Next”.
- **Starter code sempre visível**: realce de sintaxe com `@wooorm/starry-night` e fallback em texto monoespaçado.
- **Feedback imediato**:
  - **MCQ**: resposta correta em verde, alternativa selecionada errada em vermelho + explicação.
  - **Fill/Output**: ao errar, input em estado de erro + bloco mostrando sua resposta (vermelho), a correta (verde) e a explicação.
- **Botão Next ao errar**: permite avançar para a próxima questão mesmo após erro.
- **XP por questão**: o XP da lição é dividido igualmente entre as questões (arredondado). Ao acertar, aparece um pop-up com `+XP` e a lição avança; ao final, volta para a lista de lições.

## Requisitos

- Node.js 18+ e npm 9+
- Aplicativo Expo Go instalado no celular (Android/iOS)

## Instalação

- **Instalar dependências:**
  ```bash
  npm install
  ```

Se aparecer conflito de dependências (ERESOLVE), rode:

```bash
npm install --legacy-peer-deps
```

## Executando

- **Iniciar o servidor de desenvolvimento:**
  ```bash
  npm start
  ```
- Abra o app Expo Go no celular e escaneie o QR Code.
- Comandos úteis:
  - `npm run android`: abre em emulador/dispositivo Android
  - `npm run ios`: abre no simulador iOS (macOS)
  - `npm run web`: abre no navegador

## Estrutura do projeto

```
src/
  components/
    exercises/
      MCQExercise.tsx
      FillInTheBlankExercise.tsx
      OutputPredictionExercise.tsx
  data/
    lessons/
      sample-lesson-01.json
  screens/
    LessonListScreen.tsx
    LessonDetailScreen.tsx
    ExerciseScreen.tsx
  services/
    lessonService.ts
  theme/
    theme.ts
  types/
    index.ts
```

### Arquitetura e fluxo

- **`LessonListScreen`**: lista as lições disponíveis (`getLessons`).
- **`LessonDetailScreen`**: detalhes e botão para iniciar a lição.
- **`ExerciseScreen`**:
  - Controla o índice atual da questão e o progresso.
  - Exibe o botão **Hint** (modal com dicas e navegação entre elas).
  - Em caso de erro, exibe o botão **Next** para seguir.
  - Ao acertar: exibe `+XP` por questão e avança automaticamente; ao terminar, retorna à lista.

## Modelo de dados

### Tipos (`src/types/index.ts`)

```ts
export interface Exercise {
  type: "mcq" | "fill" | "output-prediction";
  prompt: string;
  choices?: string[]; // somente para mcq
  starterCode?: string; // opcional (fill / output-prediction)
  answer: string;
  hints?: string[];
  explanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  xp: number; // XP total da lição
  level: number;
  exercises: Exercise[];
}
```

### Exemplo de lição (`src/data/lessons/sample-lesson-01.json`)

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
    },
    {
      "type": "fill",
      "prompt": "Fill the blank to assign the value 10 to variable `x`.",
      "starterCode": "x = ___",
      "answer": "10",
      "hints": ["No quotes needed for numbers."],
      "explanation": "Numbers are assigned directly: x = 10"
    },
    {
      "type": "output-prediction",
      "prompt": "What does this print?",
      "starterCode": "a = 2\nb = '3'\nprint(a + int(b))",
      "answer": "5",
      "hints": ["`int()` converts string to integer."],
      "explanation": "int('3') is 3. 2 + 3 = 5."
    }
  ]
}
```

## Regras de XP

- **Cálculo**: `XP por questão = round(lesson.xp / número_de_questões)`.
- **Quando é atribuído**: ao responder corretamente uma questão.
- **UX**: aparece um pop-up `+XP` e a tela avança; ao final da última questão, retorna à lista de lições.

## Dicas (Hint)

- O botão **Hint** fica no centro inferior da `ExerciseScreen`.
- Ao tocar, abre um modal (`Dialog`).
- Se houver várias dicas, use **Next** para avançar. O índice atual é exibido (ex.: `1/2`).
- Se a questão não tiver dicas, o modal informa que não há dicas disponíveis.

## Feedback de respostas

- **MCQ**: após tocar em uma alternativa, se correta fica verde; se errada, a alternativa escolhida fica vermelha, a correta verde e é mostrada a explicação. Em caso de erro, surge o botão **Next** para prosseguir.
- **Fill / OutputPrediction**: se errar, o input fica em estado de erro e aparece um bloco com sua resposta (vermelho), a correta (verde) e a explicação. O botão **Next** aparece para avançar.

## Tema

- Arquivo: `src/theme/theme.ts`.
- Cores extras suportadas pelos componentes: `codeBackground` e `codeText` (usadas nos blocos de código). Se ausentes, há fallback para `background` e `#d4d4d4`.

## Dicas para criar novas lições

- Use os mesmos campos do exemplo acima.
- **mcq** requer `choices` + `answer`.
- **fill** e **output-prediction** podem ter `starterCode` para exibir o bloco de código.
- Adicione `hints` (array de strings) e uma `explanation` breve.

## Solução de problemas

- **Conflito de dependências (ERESOLVE)**: rode `npm install --legacy-peer-deps`.
- **Expo não recarrega**: pare o servidor e rode `expo start -c` para limpar o cache.
- **Sem highlight no código**: o app mostra fallback monoespaçado automaticamente; verifique se `starterCode` existe na questão.

## Scripts disponíveis

- `npm start` — inicia o Metro/Expo.
- `npm run android` — abre no Android.
- `npm run ios` — abre no iOS (macOS necessário).
- `npm run web` — abre no navegador.

## Licença

Uso educacional. Ajuste conforme a necessidade do seu projeto.
"# Duolingo-Dev" 

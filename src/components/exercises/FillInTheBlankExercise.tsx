import React, { useState, useEffect } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import {
  Button,
  Paragraph,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import { Exercise } from "../../types";
import RenderHtml from "react-native-render-html";
import { createStarryNight } from "@wooorm/starry-night";
import python from "@wooorm/starry-night/source.python";
import { toHtml } from "hast-util-to-html";

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
}

const FillInTheBlankExercise: React.FC<Props> = ({ exercise, onAnswer }) => {
  const [text, setText] = useState("");
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const [highlightedCode, setHighlightedCode] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState("");
  const codeBg = (colors as any).codeBackground ?? colors.background;
  const codeTextColor = (colors as any).codeText ?? "#d4d4d4";

  const escapeHtml = (value: string): string =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  useEffect(() => {
    const highlight = async () => {
      if (!exercise.starterCode) {
        setHighlightedCode("");
        return;
      }
      const starryNight = await createStarryNight([python]);
      const tree = starryNight.highlight(exercise.starterCode, "source.python");
      const html = toHtml(tree);
      setHighlightedCode(html);
    };
    highlight();
  }, [exercise.starterCode]);

  // Reset input when exercise changes
  useEffect(() => {
    setText("");
    setShowFeedback(false);
    setWrongAnswer("");
  }, [exercise]);

  const handleSubmit = () => {
    const isCorrect = text.trim() === exercise.answer;
    if (isCorrect) {
      setShowFeedback(false);
      onAnswer(true);
    } else {
      setWrongAnswer(text.trim());
      setShowFeedback(true);
      onAnswer(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>{exercise.prompt}</Title>
      {exercise.starterCode ? (
        <View style={[styles.codeBlock, { backgroundColor: codeBg }]}>
          <RenderHtml
            contentWidth={width}
            source={{
              html:
                highlightedCode && highlightedCode.trim().length > 0
                  ? highlightedCode
                  : `<pre><code>${escapeHtml(
                      exercise.starterCode
                    )}</code></pre>`,
            }}
            tagsStyles={{
              pre: {
                backgroundColor: codeBg,
                padding: 16,
                borderRadius: 8,
              },
              code: {
                color: codeTextColor,
                fontFamily: "monospace",
                fontSize: 16,
              },
            }}
          />
        </View>
      ) : null}
      <TextInput
        label="Your answer"
        value={text}
        onChangeText={setText}
        style={styles.input}
        autoCapitalize="none"
        error={showFeedback}
      />
      <Button mode="contained" onPress={handleSubmit}>
        Check
      </Button>
      {showFeedback && (
        <View style={{ marginTop: 12 }}>
          <Paragraph style={{ color: "#e74c3c" }}>
            Your answer: {wrongAnswer}
          </Paragraph>
          <Paragraph style={{ color: "#2ecc71" }}>
            Correct: {exercise.answer}
          </Paragraph>
          {exercise.explanation ? (
            <Paragraph style={{ marginTop: 8 }}>
              {exercise.explanation}
            </Paragraph>
          ) : null}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  codeBlock: {
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
});

export default FillInTheBlankExercise;

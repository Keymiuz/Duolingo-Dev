import React, { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Paragraph, Title, useTheme } from "react-native-paper";
import { Exercise } from "../../types";

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
}

const MCQExercise: React.FC<Props> = ({ exercise, onAnswer }) => {
  const { colors } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const correctIndex = useMemo(() => {
    return exercise.choices?.findIndex((c) => c === exercise.answer) ?? -1;
  }, [exercise]);

  const handlePress = (choice: string, index: number) => {
    if (selectedIndex !== null) return; // lock after first selection
    setSelectedIndex(index);
    const isCorrect = choice === exercise.answer;
    if (isCorrect) {
      setTimeout(() => onAnswer(true), 300);
    } else {
      setShowExplanation(true);
      // do not call onAnswer(false); the screen will keep on the same exercise
      onAnswer(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.prompt}>{exercise.prompt}</Title>
      {exercise.choices?.map((choice, index) => {
        const isSelected = selectedIndex === index;
        const isCorrect = correctIndex === index;
        const showResult = selectedIndex !== null;
        let buttonColor: string | undefined;
        let textColor: string | undefined;
        if (showResult && isCorrect) {
          buttonColor = "#2ecc71";
          textColor = "#ffffff";
        } else if (showResult && isSelected && !isCorrect) {
          buttonColor = "#e74c3c";
          textColor = "#ffffff";
        }
        return (
          <Button
            key={index}
            mode="contained"
            style={styles.choiceButton}
            buttonColor={buttonColor}
            textColor={textColor}
            disabled={selectedIndex !== null}
            onPress={() => handlePress(choice, index)}
          >
            {choice}
          </Button>
        );
      })}
      {showExplanation && (
        <View style={styles.explanationBox}>
          <Paragraph style={styles.incorrect}>
            Your answer:{" "}
            {selectedIndex !== null && exercise.choices
              ? exercise.choices[selectedIndex]
              : ""}
          </Paragraph>
          <Paragraph style={styles.correct}>
            Correct: {exercise.answer}
          </Paragraph>
          {exercise.explanation ? (
            <Paragraph style={styles.explanation}>
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
  prompt: {
    marginBottom: 24,
    textAlign: "center",
  },
  choiceButton: {
    marginBottom: 12,
  },
  explanationBox: {
    marginTop: 8,
  },
  correct: {
    color: "#2ecc71",
    marginTop: 4,
  },
  incorrect: {
    color: "#e74c3c",
  },
  explanation: {
    marginTop: 8,
  },
});

export default MCQExercise;

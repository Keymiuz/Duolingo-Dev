import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Title,
  useTheme,
  ProgressBar,
  Button,
  Portal,
  Dialog,
  Paragraph,
} from "react-native-paper";
import { getLessonById } from "../services/lessonService";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import MCQExercise from "../components/exercises/MCQExercise";
import FillInTheBlankExercise from "../components/exercises/FillInTheBlankExercise";
import OutputPredictionExercise from "../components/exercises/OutputPredictionExercise";
import { Exercise } from "../types";

type RootStackParamList = {
  LessonDetail: { lessonId: string };
  Exercise: { lessonId: string };
};

type ExerciseScreenRouteProp = RouteProp<RootStackParamList, "Exercise">;
type ExerciseScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Exercise"
>;

interface Props {
  route: ExerciseScreenRouteProp;
  navigation: ExerciseScreenNavigationProp;
}

const ExerciseScreen: React.FC<Props> = ({ route, navigation }) => {
  const { lessonId } = route.params;
  const lesson = getLessonById(lessonId);
  const { colors } = useTheme();

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [hintIndex, setHintIndex] = useState(0);
  const [hintVisible, setHintVisible] = useState(false);
  const [showNextAfterWrong, setShowNextAfterWrong] = useState(false);

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Title>Lesson not found!</Title>
      </View>
    );
  }

  const perQuestionXp = Math.round(lesson.xp / lesson.exercises.length);

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      alert(`+${perQuestionXp} XP`);
      if (currentExerciseIndex < lesson.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setShowNextAfterWrong(false);
      } else {
        navigation.popToTop();
      }
    } else {
      // Wrong answer: allow user to proceed manually
      setShowNextAfterWrong(true);
    }
  };

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const progress = (currentExerciseIndex + 1) / lesson.exercises.length;

  useEffect(() => {
    setHintIndex(0);
    setHintVisible(false);
    setShowNextAfterWrong(false);
  }, [currentExerciseIndex]);

  const hints = currentExercise.hints ?? [];
  const currentHint = useMemo(() => {
    if (hints.length === 0) return "No hints available for this question.";
    const index = Math.min(hintIndex, hints.length - 1);
    return `${hints[index]}${
      hints.length > 1 ? ` (${index + 1}/${hints.length})` : ""
    }`;
  }, [hints, hintIndex]);

  const handleOpenHint = () => {
    setHintIndex(0);
    setHintVisible(true);
  };

  const handleNextHint = () => {
    if (hints.length === 0) return;
    setHintIndex((prev) => (prev + 1 < hints.length ? prev + 1 : prev));
  };

  const renderExercise = (exercise: Exercise) => {
    switch (exercise.type) {
      case "mcq":
        return <MCQExercise exercise={exercise} onAnswer={handleAnswer} />;
      case "fill":
        return (
          <FillInTheBlankExercise exercise={exercise} onAnswer={handleAnswer} />
        );
      case "output-prediction":
        return (
          <OutputPredictionExercise
            exercise={exercise}
            onAnswer={handleAnswer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ProgressBar
        progress={progress}
        color={colors.primary}
        style={styles.progressBar}
      />
      {renderExercise(currentExercise)}
      {showNextAfterWrong && (
        <Button
          mode="outlined"
          style={styles.nextButton}
          onPress={() => {
            if (currentExerciseIndex < lesson.exercises.length - 1) {
              setCurrentExerciseIndex(currentExerciseIndex + 1);
              setShowNextAfterWrong(false);
            } else {
              navigation.popToTop();
            }
          }}
        >
          Next
        </Button>
      )}
      <Button
        mode="contained"
        style={styles.hintButton}
        onPress={handleOpenHint}
      >
        Hint
      </Button>
      <Portal>
        <Dialog visible={hintVisible} onDismiss={() => setHintVisible(false)}>
          <Dialog.Title>Hint</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{currentHint}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => setHintVisible(false)}
              accessibilityLabel="Close hint dialog"
            >
              Close
            </Button>
            <Button
              onPress={handleNextHint}
              disabled={hints.length === 0 || hintIndex >= hints.length - 1}
              accessibilityLabel="Next hint"
            >
              Next
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  progressBar: {
    height: 10,
  },
  hintButton: {
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
    borderRadius: 24,
    paddingHorizontal: 24,
  },
  nextButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    borderRadius: 24,
    paddingHorizontal: 24,
  },
  snackbar: {
    bottom: 96,
  },
});

export default ExerciseScreen;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Button, useTheme, Paragraph } from 'react-native-paper';
import { getLessonById } from '../services/lessonService';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  LessonList: undefined;
  LessonDetail: { lessonId: string };
  Exercise: { lessonId: string };
};

type LessonDetailScreenRouteProp = RouteProp<RootStackParamList, 'LessonDetail'>;
type LessonDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LessonDetail'>;

interface Props {
  route: LessonDetailScreenRouteProp;
  navigation: LessonDetailScreenNavigationProp;
}

const LessonDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { lessonId } = route.params;
  const lesson = getLessonById(lessonId);
  const { colors } = useTheme();

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Title>Lesson not found!</Title>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title style={styles.title}>{lesson.title}</Title>
      <Paragraph style={styles.details}>Level: {lesson.level} | XP: {lesson.xp}</Paragraph>
      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('Exercise', { lessonId: lesson.id })}
        style={styles.button}
      >
        Start Lesson
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  details: {
    marginBottom: 32,
  },
  button: {
    width: '80%',
  },
});

export default LessonDetailScreen;

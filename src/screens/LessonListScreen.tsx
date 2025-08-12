import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { getLessons } from '../services/lessonService';
import { Lesson } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  LessonList: undefined;
  LessonDetail: { lessonId: string };
};

type LessonListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LessonList'
>;

interface Props {
  navigation: LessonListScreenNavigationProp;
}

const LessonListScreen: React.FC<Props> = ({ navigation }) => {
  const lessons = getLessons();
  const { colors } = useTheme();

  const renderItem = ({ item }: { item: Lesson }) => (
    <Card 
      style={styles.card}
      onPress={() => navigation.navigate('LessonDetail', { lessonId: item.id })}
    >
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>Level: {item.level} | XP: {item.xp}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={lessons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
});

export default LessonListScreen;

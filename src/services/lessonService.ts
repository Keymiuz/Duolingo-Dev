import { Lesson } from "../types";
import sampleLesson from "../data/lessons/sample-lesson-01.json";

// In a real app, this would dynamically load all lessons from the directory.
// For now, we'll just use the sample lesson.
const lessons: Lesson[] = [sampleLesson as Lesson];

export const getLessons = (): Lesson[] => {
  return lessons;
};

export const getLessonById = (id: string): Lesson | undefined => {
  return lessons.find((lesson) => lesson.id === id);
};

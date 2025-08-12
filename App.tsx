import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { theme } from "./src/theme/theme";
import LessonListScreen from "./src/screens/LessonListScreen";
import LessonDetailScreen from "./src/screens/LessonDetailScreen";
import ExerciseScreen from "./src/screens/ExerciseScreen";

type RootStackParamList = {
  LessonList: undefined;
  LessonDetail: { lessonId: string };
  Exercise: { lessonId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LessonList"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="LessonList"
            component={LessonListScreen}
            options={{ title: "Python Lessons" }}
          />
          <Stack.Screen
            name="LessonDetail"
            component={LessonDetailScreen}
            options={{ title: "Lesson Details" }}
          />
          <Stack.Screen
            name="Exercise"
            component={ExerciseScreen}
            options={{ title: "Exercise" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

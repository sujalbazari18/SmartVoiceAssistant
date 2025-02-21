import React from "react";
import { View, Text, StyleSheet } from "react-native";
import VoiceRecorder from "./src/components/VoiceRecorder";

export default function App() {
  const handleRecordingComplete = (audioUri: string) => {
    console.log("Audio file saved at:", audioUri);
    // Later, we will send this audio file for transcription
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Voice Assistant</Text>
      <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

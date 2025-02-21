import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";

const VoiceRecorder = ({ onRecordingComplete }) => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUri, setAudioUri] = useState(null);

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, [recording]);

  // Function to start recording
  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access microphone is required!");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  // Function to stop recording
  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      setIsRecording(false);
      setRecording(null);

      // Pass audio file URI to parent component
      if (onRecordingComplete) {
        onRecordingComplete(uri);
      }
    } catch (error) {
      console.error("Failed to stop recording:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, isRecording ? styles.recording : styles.notRecording]}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={styles.text}>{isRecording ? "Stop Recording" : "Start Recording"}</Text>
      </TouchableOpacity>

      {audioUri && <Text style={styles.text}>Audio Recorded!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  recording: {
    backgroundColor: "red",
  },
  notRecording: {
    backgroundColor: "blue",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});

export default VoiceRecorder;

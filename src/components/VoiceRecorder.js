import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { Vosk } from 'react-native-vosk';

export default function VoiceRecorder() {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    // Load the Vosk model from assets
    Vosk.init().then(() => {
      console.log('Vosk initialized');
    }).catch((error) => {
      console.error('Vosk initialization error:', error);
    });
  }, []);

  const startListening = async () => {
    setIsListening(true);
    Vosk.start().catch(console.error);
  };

  const stopListening = async () => {
    setIsListening(false);
    const result = await Vosk.stop();
    setText(result.text); // Extracted text from speech
  };

  return (
    <View>
      <Button title={isListening ? "Stop Listening" : "Start Listening"} onPress={isListening ? stopListening : startListening} />
      <Text>Transcribed Text: {text}</Text>
    </View>
  );
}

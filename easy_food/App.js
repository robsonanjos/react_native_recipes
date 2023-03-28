import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import axios from "axios";

export default function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const scrollViewRef = React.useRef(null);

  const fetchResponse = async () => {
    try {
      const res = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: input,
          temperature: 0.3,
          max_tokens: 300,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(res.data.choices[0].text);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputFocus = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setInput(text)}
            value={input}
            placeholder="Digite algo..."
            onFocus={handleInputFocus}
          />
          <TouchableOpacity style={styles.button} onPress={fetchResponse}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>{response}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  inputContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0b84c9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  responseContainer: {
    marginHorizontal: 20,
  },
  responseText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

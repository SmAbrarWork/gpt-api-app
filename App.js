/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import {Configuration, OpenAIApi} from 'openai';
import axios from 'axios';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  TextInput,
  Button,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';




function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [result, setResult] = React.useState('');
  const [error, setError] = React.useState('');
  const [isrecording, setIsRecording] = React.useState(false);

  voice.onSpeechStart = () => setIsRecording(true);
  voice.onSpeechEnd = () => setIsRecording(false);
  voice.onSpeechError = err => setError(err.error);
  voice.onSpeechResults = result => setResult(result.value[0]);

  ////////////////////////////////////////////////////////////////////////
   
 const [inputMassage, setInputMassage] = useState('')
 const [outCum, setOutCum] = useState ('')

  const handlebuttonclick =()=>{
  console.log(inputMassage);
  fetch("https://api.openai.com/v1/completions", {
    method:"POST",
    headers:{
      "Content-Type" : "application/json",
      "Authorization" : "Bearer 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"
    },
    body:JSON.stringify({
      "prompt": result,
      "model": "text-davinci-003",
      "max_tokens": 1024,
    })
  }).then((response)=>response.json()).then((data)=>{
    console.log("answer>>>",data.choices[0].text);
    setOutCum(data.choices[0].text)
  })
  }
  
  const handleInputtaken =(text)=>{
     setInputMassage(text)
    }
    

  /////////////////////////////////////////////////////////////////////////

  const startRecording = async () => {
    try {
      await voice.start('en-US');
    } catch (error) {
      setError(err);
    }
  };

  const stopRecording = async () => {
    try {
      await voice.stop();
    } catch (error) {
      setError(err);
    }
  };

  const handlevoice = () => {
    Tts.setDefaultLanguage('ur');
    Tts.setDefaultRate(0.3);
    Tts.setDefaultPitch(1.6);
    Tts.speak(outCum);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <TouchableOpacity
          onPress={isrecording ? stopRecording : startRecording}
          style={{
            width: 300,
            height: 50,
            backgroundColor: 'blue',
            margin: 50,
            marginLeft: 50,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20, marginLeft: 80}}>
            {' '}
            {isrecording ? 'StopRecording' : 'StartRecording'}
          </Text>
        </TouchableOpacity>
        <Text style={{fontSize: 20, marginLeft: 80, color: 'white'}}>
          {' '}
          {result}
        </Text>
        <TouchableOpacity
          onPress={handlevoice}
          style={{
            width: 300,
            height: 50,
            backgroundColor: 'blue',
            margin: 50,
            marginLeft: 50,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20, marginLeft: 120}}>Speak</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 20, marginLeft: 80, color: 'white'}}>

          {error}
      </Text>

        {/* /////////////////////////////////////// */}
          
        <TouchableOpacity
           onPress={handlebuttonclick}
          style={{
            width: 300,
            height: 50,
            backgroundColor: 'blue',
            margin: 10,
            marginLeft: 50,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20, marginLeft: 80}}>Processes by AI</Text>
        </TouchableOpacity>
             
        <Text style={{fontSize: 20, margin: 20, color: 'white'}}>
         {outCum}
        </Text>

        {/* /////////////////////////////////////// */}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    width: '80%',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'blue',
  },
  selectorContainer: {
    flexDirection: 'row',
  },
  selector: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'gainsboro',
    margin: 5,
    padding: 16,
    borderRadius: 5,
    overflow: 'hidden',
  },
  button: {
    marginTop: "auto",
    backgroundColor: "#10a37f",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginVertical: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default App;

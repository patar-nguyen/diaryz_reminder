import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addStackContext } from '../../App'

const Create = () => {

  const navigation = useNavigation();
  const addStack = useContext(addStackContext);

  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [reminder, setReminder] = useState('');

  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };

  const onChange = (event, value) => {
    const currentDate = value || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let temp = new Date(currentDate);
    let tempDate = temp.getDate() + '/' + (temp.getMonth() + 1) + '/' + temp.getFullYear();
    let tempTime = (temp.getHours() < 10 ? '0':'') + temp.getHours() + ":" + (temp.getMinutes() < 10 ? '0':'') + temp.getMinutes();

    setNewDate(tempDate);
    setNewTime(tempTime);
    setShow(false);
  };

  const onSubmit = () => {
    let sentence = (`Reminder: ${reminder} \nDate: ${newDate} \nTime: ${newTime}`)
    
    let reminderObject = {sentence, completed: false}

    addStack(reminderObject);

    setReminder(null);
    setNewDate(null);
    setNewTime(null);

    navigation.navigate('Display')
  }

  return (
    <View style={styles.root}>
        <View style={styles.container}>

        <Text style={styles.text}>Enter a new reminder and set the date and time to be reminded</Text>
        <TextInput placeholder='Reminder' value={reminder} onChangeText={text => setReminder(text)} style={styles.input} />

          <TouchableOpacity style={styles.input} onPress={() => showMode('date')}>
            <View pointerEvents="none">
              <TextInput value={newDate} placeholder="Date" disabled/>
            </View>
          </ TouchableOpacity>

          <TouchableOpacity style={styles.input} onPress={() => showMode('time')}>
            <View pointerEvents="none">
              <TextInput value={newTime} placeholder="Time" disabled/>
            </View>
          </ TouchableOpacity>

        {
          show && (
            <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}/>
          )
        }
        </View>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>        
        <Text>Add Reminder</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Display')}>        
        <Text>Back</Text>
        </TouchableOpacity>
    </ View>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: 'white',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  container: {
    backgroundColor: 'white',
    marginTop: 100,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#808080',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,

  }, 
  button: {
    alignItems: "center",
    backgroundColor: '#0096FF',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
});

export default Create;
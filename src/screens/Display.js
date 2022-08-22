import React, { useContext } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { stackContext, completeStackContext } from '../../App'

const Display = () => {

  const navigation = useNavigation();

  const stack = useContext(stackContext);
  const completeStack = useContext(completeStackContext);

  return (
    <ScrollView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Reminders</Text>
        <ScrollView style={styles.reminder}>
          {
          stack.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeStack(index)}>
                <View style={[styles.item, {backgroundColor: item.completed ? 'green' : 'red'}]}>
                  <Text key={index} style={styles.text}>{item.sentence}</Text>
                </View>              
              </TouchableOpacity>
            )
          })
        } 
        </ScrollView>
      </View> 
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Create')}>        
        <Text>Add Reminder</Text>
        </TouchableOpacity>
    </ScrollView>
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
    marginTop: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',

  },
  reminder: {
    marginVertical: 20
  },
  button: {
    alignItems: "center",
    backgroundColor: '#0096FF',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  item: {
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default Display;
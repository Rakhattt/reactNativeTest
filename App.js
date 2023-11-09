import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import Svg, { Path } from "react-native-svg"
import Checkbox from 'expo-checkbox';


export default function App() {
  const mockData = Array.from({ length: 40 }, () => ({
    id: generateRandomId(),
    text: 'Some random action',
    isSelected: false,
  }));

  const [text, onChangeText] = useState('');
  const [blockItems, setBlockItems] = useState(mockData);
  // const [isChecked, setChecked] = useState(false);;
  
  let [fontsLoaded] = useFonts({
    'Serial': require('./assets/fonts/Serial/serial.otf')
  })

  function generateRandomId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
  const toggleBlockVisibility = () => {
    if (text) {
      const newBlock = { id: generateRandomId(), text, isSelected: false}; 
      setBlockItems([...blockItems, newBlock]);
      onChangeText('');  
    }
  };

  const handleItemPress = (item) => {
    setBlockItems(blockItems.filter((e) => e.id != item.id))
    console.log('This item was deleted:', item);
  };

  const handleCheckboxChange = (item) => {
    const updatedBlockItems = blockItems.map((block) => {
      if (block.id === item.id) {
        return { ...block, isSelected: !block.isSelected };
      }
      return block;
    });
    setBlockItems(updatedBlockItems);
  };

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To do App</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {blockItems.map((block, index) => (
          <View key={index} style={styles.todoItem}>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'center'}}>
              <Checkbox
                style={[styles.checkbox, { width: 30, height: 30 }]}
                value={block.isSelected}
                onValueChange={() => handleCheckboxChange(block)} // Используйте handleCheckboxChange для изменения isSelected
                color={block.isSelected ? 'green' : undefined}
              />
              <Text style={styles.todoTitle}>{block.text}</Text>
            </View>
            <TouchableOpacity onPress={() => handleItemPress(block)}>
              <View>
                <Svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                  <Path d="M7 4C6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688L4.2929688 6.2929688C3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312L11.585938 15L4.2929688 22.292969C3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031L6.2929688 25.707031C6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031L15 18.414062L22.292969 25.707031C22.682969 26.098031 23.317031 26.098031 23.707031 25.707031L25.707031 23.707031C26.098031 23.316031 26.098031 22.682969 25.707031 22.292969L18.414062 15L25.707031 7.7070312C26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688L23.707031 4.2929688C23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688L15 11.585938L7.7070312 4.2929688C7.5115312 4.0974687 7.255875 4 7 4z" fill="#000"/>
                </Svg>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.addContainer}>
        <SafeAreaView>
          <TextInput
            style={[styles.input, { fontFamily: 'Serial' }]}
            onChangeText={onChangeText}
            value={text}
            placeholder='Write something'
            placeholderTextColor="grey"
          />
        </SafeAreaView>

        <TouchableOpacity onPress={toggleBlockVisibility}>
          <View>
            <Svg width={50} height={50} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88">
            <Path d="M61.44,0A61.46,61.46,0,1,1,18,18,61.25,61.25,0,0,1,61.44,0ZM88.6,56.82v9.24a4,4,0,0,1-4,4H70V84.62a4,4,0,0,1-4,4H56.82a4,4,0,0,1-4-4V70H38.26a4,4,0,0,1-4-4V56.82a4,4,0,0,1,4-4H52.84V38.26a4,4,0,0,1,4-4h9.24a4,4,0,0,1,4,4V52.84H84.62a4,4,0,0,1,4,4Zm8.83-31.37a50.92,50.92,0,1,0,14.9,36,50.78,50.78,0,0,0-14.9-36Z"/>
            </Svg>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  addContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  input: {
    height: 50,
    width: 290,
    borderWidth: 3,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontFamily: 'Serial',
    // backgroundColor: 'black',
    color: 'grey'
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Serial',
    paddingTop: 60,
    paddingBottom: 20
  },
  scrollContainer: {
    flexGrow: 1, // Добавьте это свойство, чтобы разрешить прокрутку внутри ScrollView
  },
  todoItem: {
    borderWidth: 2,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  todoTitle: {
    fontSize: 24,
    fontFamily: 'Serial'
  },
  checkbox: {
    width: 20,
    height: 20
  }
});


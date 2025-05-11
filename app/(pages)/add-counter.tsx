import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addUserCounter } from '~/src/store/slices/habitCounterSlice'; // Adjust path
import { StatType } from '~/src/config/gameconfig';

const availableIcons = ['fire', 'bolt', 'dumbbell', 'book', 'medal', 'hand-fist', 'brain'];
const statOptions: StatType[] = ['stamina', 'intelligence', 'strength']; // Customize to your stat system

const CustomCounterCreator = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('fire');
  const [selectedStat, setSelectedStat] = useState<StatType>('stamina');

  const handleCreate = () => {
    if (!title) return;

    dispatch(addUserCounter({ title, statLinked: selectedStat }));
    setTitle('');
    setSelectedIcon('fire');
    setSelectedStat('stamina');
  };

  return (
    <View className="p-4 space-y-4">
      <Text className="text-lg font-bold text-white">Create Custom Counter</Text>

      <TextInput
        placeholder="Counter Name"
        placeholderTextColor="#ccc"
        value={title}
        onChangeText={setTitle}
        className="border border-gray-400 rounded-xl px-4 py-2 text-white"
      />

      <View>
        <Text className="text-white mb-2">Select Icon</Text>
        <FlatList
          horizontal
          data={availableIcons}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`p-3 m-1 rounded-full ${item === selectedIcon ? 'bg-blue-500' : 'bg-gray-700'}`}
              onPress={() => setSelectedIcon(item)}
            >
              <FontAwesome6 name={item as any} size={20} color="white" />
            </TouchableOpacity>
          )}
        />
      </View>

      <View>
        <Text className="text-white mb-2">Link to Stat</Text>
        <FlatList
          horizontal
          data={statOptions}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`px-4 py-2 m-1 rounded-full ${
                item === selectedStat ? 'bg-purple-500' : 'bg-gray-700'
              }`}
              onPress={() => setSelectedStat(item)}
            >
              <Text className="text-white capitalize">{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        onPress={handleCreate}
        className="bg-green-600 rounded-xl py-3 mt-4 items-center"
      >
        <Text className="text-white font-bold">Create Counter</Text>
      </TouchableOpacity>
    </View>
  );
};


export default CustomCounterCreator;
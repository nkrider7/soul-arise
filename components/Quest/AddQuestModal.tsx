import React, { useState } from 'react';
import {
  Modal, View, Text, TextInput, TouchableOpacity, FlatList,
} from 'react-native';
import { useAppDispatch } from '~/src/store/hook/hook';
import { addUserQuest } from '~/src/store/slices/questSlice';
import AppButton from '../universal/AppButton';
import uuid from 'react-native-uuid';
import { Book, Activity, BrainCircuit, PencilLine, Laptop } from 'lucide-react-native';

const iconOptions = [
  { name: 'Book', component: Book },
  { name: 'Activity', component: Activity },
  { name: 'BrainCircuit', component: BrainCircuit },
  { name: 'PencilLine', component: PencilLine },
  { name: 'Laptop', component: Laptop },
];

const AddQuestModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [icon, setIcon] = useState<string | undefined>(undefined);
  const [link, setLink] = useState('');

  const [checklistInput, setChecklistInput] = useState('');
  const [checklist, setChecklist] = useState<{ id: string; title: string; done: boolean }[]>([]);

  const handleAddChecklistItem = () => {
    if (!checklistInput.trim()) return;
    setChecklist(prev => [
      ...prev,
      { id: uuid.v4() as string, title: checklistInput.trim(), done: false },
    ]);
    setChecklistInput('');
  };

  const handleRemoveChecklistItem = (id: string) => {
    setChecklist(prev => prev.filter(item => item.id !== id));
  };

  const handleAdd = () => {
    if (!title || !goal) return;
    
    dispatch(addUserQuest({
      title,
      goal: parseInt(goal),
      progress: 0,
      status: 'pending',
      type: 'custom',
      link,
      icon, // icon is stored as string (e.g., "BrainCircuit")
      checklist,
      createdBy: 'user',
    }));

    // Reset state
    setTitle('');
    setGoal('');
    setIcon(undefined);
    setLink('');
    setChecklist([]);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-2xl p-5">
          <Text className="text-lg font-bold mb-4">Add New Quest</Text>

          <TextInput
            className="border p-2 mb-2 rounded"
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            className="border p-2 mb-2 rounded"
            placeholder="Goal (number)"
            value={goal}
            keyboardType="numeric"
            onChangeText={setGoal}
          />

          <TextInput
            className="border p-2 mb-2 rounded"
            placeholder="Link (optional)"
            value={link}
            onChangeText={setLink}
          />

          <Text className="mb-2 text-gray-700">Choose Icon</Text>
          <FlatList
            horizontal
            data={iconOptions}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => {
              const Icon = item.component;
              const isSelected = icon === item.name;
              return (
                <TouchableOpacity
                  onPress={() => setIcon(item.name)}
                  className={`p-3 rounded-full mx-1 ${isSelected ? 'bg-indigo-200' : 'bg-gray-100'}`}
                >
                  <Icon size={28} color={isSelected ? '#4f46e5' : '#6b7280'} />
                </TouchableOpacity>
              );
            }}
          />

          {/* Checklist Input */}
          <Text className="text-base mt-4 mb-2 font-semibold text-gray-800">Checklist</Text>
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 border p-2 rounded mr-2"
              placeholder="Add checklist item"
              value={checklistInput}
              onChangeText={setChecklistInput}
            />
            <TouchableOpacity
              onPress={handleAddChecklistItem}
              className="bg-indigo-500 px-4 py-2 rounded"
            >
              <Text className="text-white font-bold">+</Text>
            </TouchableOpacity>
          </View>

          {checklist.length > 0 && (
            <View className="mt-3">
              {checklist.map(item => (
                <View key={item.id} className="flex-row items-center justify-between mb-2">
                  <Text className="text-sm text-gray-700">• {item.title}</Text>
                  <TouchableOpacity onPress={() => handleRemoveChecklistItem(item.id)}>
                    <Text className="text-red-500 font-bold">X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <AppButton title="Add Quest" onPress={handleAdd} style={{ marginTop: 16 }} />
          <AppButton
            title="Cancel"
            onPress={onClose}
            style={{ marginTop: 8, backgroundColor: '#ccc' }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddQuestModal;

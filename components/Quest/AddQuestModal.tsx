import React, { useState, useRef, useMemo, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useAppDispatch } from '~/src/store/hook/hook';
import { addUserQuest } from '~/src/store/slices/questSlice';
import AppButton from '../universal/AppButton';
import uuid from 'react-native-uuid';
import { Book, Activity, BrainCircuit, PencilLine, Laptop, CirclePlus, Delete } from 'lucide-react-native';
import AppText from '../universal/AppText';

const iconOptions = [
  { name: 'Book', component: Book },
  { name: 'Activity', component: Activity },
  { name: 'BrainCircuit', component: BrainCircuit },
  { name: 'PencilLine', component: PencilLine },
  { name: 'Laptop', component: Laptop },
];

type AddQuestModalProps = {
  visible: boolean;
  onClose: () => void;
};

const AddQuestModal = ({ visible, onClose }: AddQuestModalProps) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [icon, setIcon] = useState<string | undefined>(undefined);
  const [link, setLink] = useState('');
  const [checklistInput, setChecklistInput] = useState('');
  const [checklist, setChecklist] = useState<{ id: string; title: string; done: boolean }[]>([]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['75%'], []);

  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [visible]);

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
      icon,
      checklist,
      createdBy: 'user',
    }));

    // Reset everything
    setTitle('');
    setGoal('');
    setIcon(undefined);
    setLink('');
    setChecklist([]);
    onClose();
  };

  return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        onDismiss={onClose}
        backgroundStyle={{ backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      >
        <View className="flex- p-5">
          <AppText variant="bold" className="text-lg mb-4">Add New Quest</AppText>

          {/* Title Input */}
          <TextInput
            className="border p-2 mb-2 rounded"
            placeholder="Title"
            style={{ fontFamily: 'Bold' }}
            value={title}
            onChangeText={setTitle}
          />

          {/* Goal Input */}
          <TextInput
            className="border p-2 mb-2 rounded"
            placeholder="Goal (Number)"
            style={{ fontFamily: 'Bold' }}
            keyboardType="numeric"
            value={goal}
            onChangeText={setGoal}
          />

          {/* Link Input */}
          <TextInput
            className="border p-2 mb-2 rounded"
            placeholder="Link (optional)"
            style={{ fontFamily: 'Bold' }}
            value={link}
            onChangeText={setLink}
          />

          {/* Icon Selection */}
          <AppText variant="bold" className="mb-2 text-gray-700">Choose Icon</AppText>
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
            showsHorizontalScrollIndicator={false}
          />

          {/* Checklist */}
          <AppText variant="bold" className="text-base mt-4 mb-2 text-gray-800">Checklist</AppText>
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 border p-2 rounded mr-2"
              placeholder="Add checklist item"
              style={{ fontFamily: 'Bold' }}
              value={checklistInput}
              onChangeText={setChecklistInput}
            />
            <TouchableOpacity
              onPress={handleAddChecklistItem}
              className="bg-indigo-500 px-4 py-2 rounded"
            >
              <CirclePlus color="white" />
            </TouchableOpacity>
          </View>

          {checklist.length > 0 && (
            <View className="mt-3">
              {checklist.map(item => (
                <View key={item.id} className="flex-row items-center justify-between mb-2">
                  <AppText variant="bold" className="text-sm text-gray-700">• {item.title}</AppText>
                  <TouchableOpacity onPress={() => handleRemoveChecklistItem(item.id)}>
                    <Delete color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Buttons */}
          <AppButton title="Add Quest" onPress={handleAdd} style={{ marginTop: 16 }} />
          <AppButton
            title="Cancel"
            onPress={onClose}
            style={{ marginTop: 8, backgroundColor: '#ccc' }}
          />
        </View>
      </BottomSheetModal>
  );
};

export default AddQuestModal;

import { useState } from 'react';
import { View, FlatList } from 'react-native';
import { useAppSelector } from '~/src/store/hook/hook';
import QuestList from './QuestList';
import AddQuestModal from './AddQuestModal';
import AppButton from '../universal/AppButton';
import AppText from '../universal/AppText';

const QuestMainScreen = () => {
  const { systemQuests, userQuests } = useAppSelector(state => state.quest);
  const [modalVisible, setModalVisible] = useState(false);

  // Combine lists with labels
  const combinedQuests = [
    ...(userQuests.length > 0
      ? [{ label: 'Your Custom Quests', data: userQuests }]
      : []),
    { label: 'System Quests', data: systemQuests },
  ];


  return (
    <View className="flex-1 p-4">
      <FlatList
        data={combinedQuests}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <View>
            <AppText variant='bold' className="text-lg font-semibold mb-2 text-white">{item.label}</AppText>
            <QuestList quests={item.data} />
          </View>
        )}
        ListFooterComponent={
          <AppButton
            title="Add Quest"
            onPress={() => setModalVisible(true)}
            style={{ marginTop: 16 }}
          />
        }
      />

     <View className='absolute bottom-0 right-0 p-4'>
     <AddQuestModal visible={modalVisible} onClose={() => setModalVisible(false)} />
     </View>
    </View>
  );
};

export default QuestMainScreen;

import { useState } from 'react';
import { View, FlatList } from 'react-native';
import { useAppSelector } from '~/src/store/hook/hook';
import QuestList from './QuestList';
import AddQuestModal from './AddQuestModal';
import AppButton from '../universal/AppButton';
import AppText from '../universal/AppText';
import { BookCheckIcon } from 'lucide-react-native';
import { lightTheme } from '~/theme/colors';

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
      <View className="flex-row items-center justify-between gap-2  mb-4">
      <View>
          <BookCheckIcon size={32} color="white" />
        </View>
        <View>
          <AppText variant='bold' className="text-2xl font-semibold text-white">Quests</AppText>
          {/* <AppText className="text-gray-400 text-xs">Complete quests to earn rewards and level up!</AppText> */}
        </View>
       
        <View>
          <AppButton title='Add Quest' style={{backgroundColor:lightTheme.mypurple}} onPress={() => setModalVisible(true)} />
        </View>
      </View>
      <FlatList
        data={combinedQuests}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <View>
            <AppText variant='bold' className="text-lg font-semibold mb-2 text-white">{item.label}</AppText>
            <QuestList quests={item.data} />
          </View>
        )}
       
      />

      <View className='absolute bottom-0 right-0 p-4'>
        <AddQuestModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      </View>
    </View>
  );
};

export default QuestMainScreen;

import { useState } from 'react';
import { View, FlatList , ProgressBarAndroidComponent, Pressable} from 'react-native';
import { useAppDispatch, useAppSelector } from '~/src/store/hook/hook';
import QuestList from './QuestList';
import AddQuestModal from './AddQuestModal';
import AppButton from '../universal/AppButton';
import AppText from '../universal/AppText';
import { BookCheckIcon, BowArrow } from 'lucide-react-native';
import { lightTheme } from '~/theme/colors';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { resetQuests } from '~/src/store/slices/questSlice';
import * as Progress from 'react-native-progress';
import { gainXP } from '~/src/store/slices/playerSlice';
const QuestMainScreen = () => {
  const { systemQuests, userQuests } = useAppSelector(state => state.quest);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  const { xp } = useAppSelector(state => state.player);
  const xpPercent = (xp / 100) * 100;

  const allQuests = [...userQuests, ...systemQuests]; // pass all to QuestList

  return (
    <BottomSheetModalProvider>
      <View className="flex-1 p-4">
        {/* Header */}
        <View className="flex-row items-center justify-between gap-2 mb-4">
          <Pressable onPress={() => dispatch(gainXP(10))}>
            <BowArrow size={32} color="white" />
          </Pressable>

          <View>
            <AppText variant="bold" className="text-2xl text-white">Quests</AppText>
            <Progress.Bar progress={xpPercent} width={100} />
          </View>

          <AppButton size="sm" variant="purple" title="Add Quest" onPress={() => setModalVisible(true)} />
        </View>

        {/* Quest List (tabs built inside this component) */}
        <QuestList quests={allQuests} />

        <AddQuestModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      </View>
    </BottomSheetModalProvider>
  );
};

export default QuestMainScreen;

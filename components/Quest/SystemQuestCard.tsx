import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  useColorScheme,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { SystemQuest } from '~/src/type';
import AppText from '../universal/AppText';
import CircularProgress from 'react-native-circular-progress-indicator';
import { getLucideIcon } from './IconsHelp';
import { useAppDispatch } from '~/src/store/hook/hook';
import { deleteUserQuest, updateProgress } from '~/src/store/slices/questSlice';
import AppButton from '../universal/AppButton';
import { lightTheme } from '~/theme/colors';
import { EllipsisVertical } from 'lucide-react-native';
import Animated, { Layout, FadeIn, FadeOut, PinwheelIn, PinwheelOut, SlideInUp, StretchOutY, StretchOutX, ZoomOutUp } from 'react-native-reanimated';
import { ANDROID_RIPPLE } from '../universal/RippleWrapper';

interface Props {
  quest: SystemQuest;
}

const SwipeableSystemQuestCard = ({ quest }: Props) => {
  const dispatch = useAppDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const progressRatio = quest.goal > 0 ? quest.progress / quest.goal : 0;
  const isComplete = quest.status === 'completed';
  const remaining = quest.goal - quest.progress;

  const toggleModal = () => setModalVisible(!isModalVisible);

  const renderRightActions = () => (
    <View className="flex flex-col justify-center items-center gap-y-2 mr-4 ml-4">
      <TouchableOpacity
        onPress={() => dispatch(updateProgress({ id: quest.id, amount: remaining }))}
        className="bg-green-500 rounded-lg p-2 w-16 items-center"
      >
        <AppText variant="bold" className="text-white text-xs">Finish</AppText>
      </TouchableOpacity>
    </View>
  );

  // const renderLeftActions = () => (
  //   <View className="flex flex-col justify-center items-center gap-y-2 ml-4 mr-4">
  //     <TouchableOpacity
  //       onPress={() => dispatch(deleteUserQuest(quest.id))}
  //       className="bg-red-500 rounded-lg p-2 w-16 items-center"
  //     >
  //       <AppText variant="bold" className="text-white text-xs">Delete</AppText>
  //     </TouchableOpacity>
  //   </View>
  // );

  return (
    <>
      <Swipeable
        renderRightActions={renderRightActions}
      // renderLeftActions={renderLeftActions}
      // overshootRight={false}
      // overshootLeft={false}
      >
        <Pressable onPress={toggleModal}
        >
          <Animated.View
            layout={Layout.springify()}
            entering={FadeIn}
            exiting={FadeOut}
            style={{ backgroundColor: lightTheme.background2 }}
            className="rounded-xl p-4 mb-4 shadow-sm"
          >

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-x-2">
                {getLucideIcon(null)}
                <AppText variant="bold" className="text-white text-lg">{quest.title}</AppText>
              </View>
            </View>

            <View className="flex-row justify-between mt-4">
              {!isComplete ? (
                <View className="flex-row items-center w-48 gap-x-2">
                  <EllipsisVertical color={'gray'} />
                  <AppButton
                    size="sm"
                    variant="secondary"
                    onPress={() => dispatch(updateProgress({ id: quest.id, amount: 1 }))}
                    title="+1 Progress"
                  />
                </View>
              ) : (
                <View className="gap-y-2">
                  <AppText variant="bold" className="text-lg text-lime-400">Quest Completed!</AppText>
                  <AppText variant="semibold" className="text-sm text-white">Reward: {quest.rewards?.coins} 🪙</AppText>
                </View>
              )}

              <View className="flex-col items-center gap-y-1">
                <CircularProgress
                  value={progressRatio * 100}
                  radius={32}
                  duration={1000}
                  activeStrokeColor="#5E0FD2"
                  activeStrokeSecondaryColor={'#AC27FC'}
                  inActiveStrokeColor="#e5e7eb"
                  inActiveStrokeWidth={12}
                  activeStrokeWidth={12}
                  title={`${quest.progress}/${quest.goal}`}
                  titleStyle={{ fontFamily: 'Bold', fontSize: 8, color: 'white' }}
                  progressValueStyle={{ fontFamily: 'Bold', fontSize: 14, color: 'white' }}
                  valueSuffix="%"
                />
                <AppText variant="bold" className="text-sm text-gray-200">{quest.status}</AppText>
              </View>
            </View>
          </Animated.View>
        </Pressable>
      </Swipeable>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View className="flex-1 bg-black/50 justify-end items-center">
            <TouchableWithoutFeedback>
              <Animated.View
                entering={PinwheelIn}
                exiting={ZoomOutUp}
                layout={Layout.springify()}
                className="w-[90%] bg-neutral-900 rounded-2xl p-5"
              >
                <AppText variant="bold" className="text-xl text-white mb-2">{quest.title}</AppText>
                <AppText variant="semibold" className="text-white mb-4">{quest.description || 'No description'}</AppText>
                <AppText variant="bold" className="text-lime-300 mb-1">Progress: {quest.progress}/{quest.goal}</AppText>
                <AppButton
                  title="+1 Progress"
                  onPress={() => {
                    dispatch(updateProgress({ id: quest.id, amount: 1 }));
                    toggleModal();
                  }}
                  size="md"
                />
                <AppButton
                  title="Mark as Complete"
                  onPress={() => {
                    dispatch(updateProgress({ id: quest.id, amount: remaining }));
                    toggleModal();
                  }}
                  size="md"
                  variant="primary"
                  className="mt-2"
                />
                <AppButton
                  title="Close"
                  onPress={toggleModal}
                  size="sm"
                  variant="secondary"
                  className="mt-4"
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default SwipeableSystemQuestCard;

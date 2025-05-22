import { View, TouchableOpacity } from 'react-native';
import { UserQuest } from '~/src/type';
import AppText from '../universal/AppText';
import { useAppDispatch } from '~/src/store/hook/hook';
import { deleteUserQuest, updateProgress } from '~/src/store/slices/questSlice';
import { getLucideIcon } from './IconsHelp';
import AppButton from '../universal/AppButton';
import CircularProgress from 'react-native-circular-progress-indicator';
import { lightTheme } from '~/theme/colors';

interface Props {
  quest: UserQuest;
}

const UserQuestCard = ({ quest }: Props) => {
  const dispatch = useAppDispatch();
  const progressRatio = quest.goal > 0 ? quest.progress / quest.goal : 0;
  const isComplete = quest.status === 'completed';
  const remaining = quest.goal - quest.progress;

  return (
    <View  style={{ backgroundColor: lightTheme.background2}} className="rounded-xl p-4 mb-4 shadow-sm ">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-x-2">
          {getLucideIcon(quest.icon)}
          <AppText variant="bold" className="text-white text-lg">{quest.title}</AppText>
        </View>

        <View className="flex-row items-center space-x-2">
          <AppText variant="bold" className="text-sm text-gray-200">{quest.status}</AppText>

          <TouchableOpacity
            onPress={() => dispatch(deleteUserQuest(quest.id))}
            className="ml-2 px-2 py-1 rounded bg-red-500"
          >
            <AppText variant="bold" className="text-white text-xs">Delete</AppText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Checklist */}
      {quest.checklist && quest.checklist.length > 0 && (
        <View className="mt-3">
          {quest.checklist.map((check, idx) => (
            <TouchableOpacity
              key={check.id}
              className="flex-row items-center mb-2"
              onPress={() => {
                // You can dispatch toggle action here
              }}
            >
              <View className={`w-5 h-5 mr-3 rounded border ${check.done ? 'bg-green-500 border-green-600' : 'border-gray-400'}`}>
                {check.done && <AppText className="text-white text-center">✓</AppText>}
              </View>
              <AppText
                variant="bold"
                className={`text-sm ${check.done ? 'text-green-400 line-through' : 'text-white'}`}
              >
                {check.title}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Actions */}
      <View className="flex-row justify-between mt-4">
        {!isComplete ? (
          <View className="flex-col w-48">
            <AppButton size="sm" variant="secondary" onPress={() => dispatch(updateProgress({ id: quest.id, amount: 1 }))} title="+1 Progress" />
            <AppButton size="sm" variant="success" onPress={() => dispatch(updateProgress({ id: quest.id, amount: remaining }))} title="Complete Now" />
          </View>
        ) : (
          <View className="gap-y-2">
            <AppText variant="bold" className="text-lg text-lime-400">Quest Completed!</AppText>
            <AppText variant="semibold" className="text-sm text-white">Reward: {quest.rewards?.coins} 🪙</AppText>
          </View>
        )}

        <CircularProgress
          value={progressRatio * 100}
          radius={45}
          duration={1000}
          activeStrokeColor="#5E0FD2"
          activeStrokeSecondaryColor={'#AC27FC'}
          inActiveStrokeColor="#e5e7eb"
          inActiveStrokeWidth={15}
          activeStrokeWidth={15}
          title={`${quest.progress}/${quest.goal}`}
          titleStyle={{ fontFamily: 'Bold', fontSize: 12, color: 'white' }}
          progressValueStyle={{ fontFamily: 'Bold', fontSize: 18, color: 'white' }}
          valueSuffix="%"
        />
      </View>
    </View>
  );
};

export default UserQuestCard;

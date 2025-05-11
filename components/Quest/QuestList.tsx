import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { UserQuest, SystemQuest } from '../../src/type';
import { useAppDispatch } from '~/src/store/hook/hook';
import { deleteUserQuest, updateProgress } from '~/src/store/slices/questSlice';
import { getLucideIcon } from './IconsHelp';
import AppText from '../universal/AppText';
import { lightTheme } from '~/theme/colors';
import CircularProgress from 'react-native-circular-progress-indicator';


interface Props {
    quests: (UserQuest | SystemQuest)[];
}

function isUserQuest(quest: UserQuest | SystemQuest): quest is UserQuest {
    return quest.createdBy === 'user';
}
function isSystemQuest(quest: UserQuest | SystemQuest): quest is SystemQuest {
    return quest.createdBy === 'system';
}
const getDynamicTextStyle = (text: string) => {
    if (text.length > 24) {
        return 'text-xs';
    }
    if (text.length > 19) {
        return 'text-sm';
    }
    if (text.length > 18) {
        return 'text-xl';
    }
};

const QuestList = ({ quests }: Props) => {
    const dispatch = useAppDispatch();
    console.log(quests)

    return (
        <FlatList
            data={quests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
                const progressRatio = item.goal > 0 ? item.progress / item.goal : 0;
                const isComplete = item.status === 'completed';
                const remaining = item.goal - item.progress;

                return (
                    <View style={{ backgroundColor: lightTheme.background2 }} className="rounded-xl p-4 mb-4 shadow-sm">
                        <View className="flex-row items-center justify-between mb-2">
                            <View className="flex-row items-center gap-x-2">
                                {getLucideIcon(isUserQuest(item) ? item.icon : null)}
                                <AppText
                                    variant="bold"
                                    className={`${getDynamicTextStyle(item.title)} text-white text-wrap w-44 font-semibold`}
                                >
                                    {item.title}
                                </AppText>
                            </View>

                            <View className="flex-row items-center space-x-2">
                                <AppText variant='bold' className="text-sm text-gray-200">{item.status}</AppText>

                                {/* Delete button only for user quests */}
                                {isUserQuest(item) && (
                                    <TouchableOpacity
                                        onPress={() => dispatch(deleteUserQuest(item.id))}
                                        className="ml-2 px-2 py-1 rounded bg-red-500"
                                    >
                                        <Text className="text-white text-xs font-semibold">Delete</Text>
                                    </TouchableOpacity>
                                )}

                            </View>
                        </View>
                        {/* Progress Bar */}
                        {/* <Progress.Bar
                            progress={progressRatio}
                            width={null}
                            color="#6366f1"
                            
                            unfilledColor="#e5e7eb"

                            borderWidth={0}
                            height={10}
                            borderRadius={6}
                        /> */}

                        {/* <Text className="text-sm mt-1 text-gray-500">
                            {`${item.progress}/${item.goal} completed`}
                        </Text> */}

                        {/* Checklist (if user quest) */}

                        {isUserQuest(item) && item.checklist && item.checklist.length > 0 && (
                            <View className="mt-3">
                                {item.checklist.map((check, index) => (
                                    <TouchableOpacity
                                        key={check.id}
                                        className="flex-row items-center mb-2"
                                        onPress={() => {
                                            const updatedChecklist = item.checklist?.map((c, i) =>
                                                i === index ? { ...c, done: !c.done } : c
                                            );

                                            // Optional: Dispatch a new action if you store checklist state
                                        
                                        }}
                                    >
                                        <View
                                            className={`w-5 h-5 mr-3 rounded border ${check.done ? 'bg-green-500 border-green-600' : 'border-gray-400'
                                                }`}
                                        >
                                            {check.done && <Text className="text-white text-center">✓</Text>}
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

                        <View className='flex-row justify-between'>{/* Progress Buttons */}
                            <View className=''>
                                {!isComplete && (
                                    <View className="mt-3 flex-col w-48 gap-y-2">
                                        <TouchableOpacity
                                            onPress={() =>
                                                dispatch(updateProgress({ id: item.id, amount: 1 }))
                                            }
                                            className="flex-1 py-2 rounded-lg items-center bg-indigo-500"
                                        >
                                            <Text className="text-white font-semibold">+1 Progress</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() =>
                                                dispatch(updateProgress({ id: item.id, amount: remaining }))
                                            }
                                            className="flex-1 py-2 rounded-lg items-center bg-green-600"
                                        >
                                            <Text className="text-white font-semibold">Complete Now</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                                {isComplete && (
                                    <View className='flex gap-y-2'>
                                        <AppText variant='bold' className="text-lg text-lime-400">Quest Completed!</AppText>
                                        <AppText variant='semibold' className="text-sm text-white">Reward: {item.rewards?.coins} 🪙</AppText>
                                        <AppText variant='semibold' className="text-sm text-white">{item.rewards?.statBoost?.stat} {item.rewards?.statBoost?.amount}+ </AppText>
                                    </View>
                                )}
                            </View>
                            <View>
                                <CircularProgress
                                    value={progressRatio * 100}
                                    radius={45}
                                    duration={1000}
                                    activeStrokeColor="#5E0FD2"
                                    activeStrokeSecondaryColor={'#AC27FC'}

                                    inActiveStrokeColor="#e5e7eb"
                                    inActiveStrokeWidth={15}
                                    activeStrokeWidth={15}
                                    title={`${item.progress}/${item.goal}`}
                                    titleColor="#111827"
                                    titleStyle={{ fontFamily: 'Bold', fontSize: 12, color: 'white' }}
                                    valueSuffixStyle={{ fontFamily: 'Bold', fontSize: 18, color: 'white' }}
                                    progressValueStyle={{ fontFamily: 'Bold', fontSize: 18, color: 'white' }}
                                    valueSuffix={`%`}
                                />
                            </View>
                        </View>

                    </View>
                );
            }}
        />
    );
};

export default QuestList;

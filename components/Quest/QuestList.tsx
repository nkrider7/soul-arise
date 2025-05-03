import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { UserQuest, SystemQuest } from '../../src/type';
import * as Progress from 'react-native-progress';
import { useAppDispatch } from '~/src/store/hook/hook';
import { deleteUserQuest, updateProgress } from '~/src/store/slices/questSlice';
import { getLucideIcon } from './IconsHelp';
import AppText from '../universal/AppText';
import { lightTheme } from '~/theme/colors';


interface Props {
    quests: (UserQuest | SystemQuest)[];
}

function isUserQuest(quest: UserQuest | SystemQuest): quest is UserQuest {
    return quest.createdBy === 'user';
}

const QuestList = ({ quests }: Props) => {
    const dispatch = useAppDispatch();

    return (
        <FlatList
            data={quests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
                const progressRatio = item.goal > 0 ? item.progress / item.goal : 0;
                const isComplete = item.status === 'completed';
                const remaining = item.goal - item.progress;

                return (
                    <View style={{backgroundColor:lightTheme.background2}} className="rounded-xl p-4 mb-4 shadow-sm">
                        <View className="flex-row items-center justify-between mb-2">
                            <View className="flex-row items-center gap-x-2">
                                {getLucideIcon(isUserQuest(item) ? item.icon : null)}
                                <AppText variant='bold' className="text-xl text-white font-semibold">{item.title}</AppText>
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
                        <Progress.Bar
                            progress={progressRatio}
                            width={null}
                            color="#6366f1"
                            unfilledColor="#e5e7eb"
                            borderWidth={0}
                            height={10}
                            borderRadius={6}
                        />
                        <Text className="text-sm mt-1 text-gray-500">
                            {item.progress}/{item.goal} completed
                        </Text>

                        {/* Checklist (if user quest) */}
                        {isUserQuest(item) && item.checklist && item.checklist.length > 0 && (
                            <View className="mt-3">
                                {item.checklist.map((check) => (
                                    <View key={check.id} className="flex-row items-center mb-1">
                                        <Text
                                            className={`mr-2 ${check.done ? 'text-green-600' : 'text-gray-500'}`}
                                        >
                                            {check.done ? '✓' : '○'}
                                        </Text>
                                        <Text className="text-sm text-gray-700">{check.title}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Progress Buttons */}
                        {!isComplete && (
                            <View className="mt-3 flex-row justify-between gap-x-4">
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
                            <Text className="mt-3 text-center text-green-600 font-bold">
                                ✅ Task Completed!
                            </Text>
                        )}
                    </View>
                );
            }}
        />
    );
};

export default QuestList;

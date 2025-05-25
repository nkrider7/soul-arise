import React, { useState } from 'react';
import { FlatList, Text, View, Pressable } from 'react-native';
import { UserQuest, SystemQuest } from '~/src/type';
import UserQuestCard from './UserQuestCard';
import SystemQuestCard from './SystemQuestCard';
import AppText from '../universal/AppText';
import { lightTheme } from '~/theme/colors';
import { Eye, Laptop, ScanEye, UserRound } from 'lucide-react-native';

interface Props {
  quests: (UserQuest | SystemQuest)[];
}

const QuestList = ({ quests }: Props) => {
  const [activeTab, setActiveTab] = useState<'user' | 'system'>('system');

  const isUserQuest = (quest: UserQuest | SystemQuest): quest is UserQuest =>
    quest.createdBy === 'user';

  const filteredQuests = quests.filter(q =>
    activeTab === 'user' ? isUserQuest(q) : !isUserQuest(q)
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Tabs */}


      {/* Quest Cards */}
      <FlatList
        data={filteredQuests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          isUserQuest(item) ? (
            <>
              <UserQuestCard quest={item} />
            </>
          ) : (
            <SystemQuestCard quest={item} />
          )
        }

      />
      <View className="flex-row justify-between mt-3 px-10">
        <Pressable
          onPress={() => setActiveTab('system')}
          className="flex-row items-center gap-x-1 border-b-2 pb-2"
          style={{ borderColor: activeTab === 'system' ? lightTheme.mypurple : 'transparent' }}
        >
          <Laptop color={activeTab === 'system' ? 'white' : '#999'} />
          <AppText variant="bold" style={{ color: activeTab === 'system' ? 'white' : '#999' }}>
            System Quests
          </AppText>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab('user')}
          className="flex-row items-center gap-x-1 border-b-2 pb-2"
          style={{ borderColor: activeTab === 'user' ? lightTheme.mypurple : 'transparent' }}
        >
          <UserRound color={activeTab === 'user' ? 'white' : '#999'} />
          <AppText variant="bold" style={{ color: activeTab === 'user' ? 'white' : '#999' }}>
            User Quests
          </AppText>
        </Pressable>
      </View>
    </View>
  );
};


export default QuestList;

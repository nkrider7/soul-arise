import { Compass, MessagesSquare } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import AppText from './AppText';
import { lightTheme } from '~/theme/colors';

type Props = {
  onclick: () => void;
};

export const ExploreHeader = ({ onclick }: Props) => {
  return (
    <View className="flex-row items-center elevation-lg justify-between w-full px-4 mb-4">
      <Pressable className="flex"  onPress={onclick}  hitSlop={10}>
        <Compass size={24} color="white" />
      </Pressable>

      <View>
        <AppText variant="bold" className="text-2xl text-white">
          Explore
        </AppText>
      </View>

      <Pressable>
        <MessagesSquare size={28} color={lightTheme.mypurple} />
      </Pressable>
    </View>
  );
};

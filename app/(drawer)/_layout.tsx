// app/(drawer)/_layout.tsx
import { createDrawerNavigator } from '@react-navigation/drawer';
import { withLayoutContext } from 'expo-router';
import CustomDrawer from '~/components/Habit/CustomDrawer';

const { Navigator } = createDrawerNavigator();
const Drawer = withLayoutContext(Navigator);

export default function DrawerLayout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawer {...props} />} screenOptions={{ headerShown: false }}>
      {/* Auto-registers screens inside (drawer) */}
    </Drawer>
  );
}

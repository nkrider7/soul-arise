import React, { useRef, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useAppDispatch, useAppSelector } from '~/src/store/hook/hook';
import { sellItem } from '~/src/store/slices/inventorySlice';
import AppText from '../universal/AppText';
import { CircleDollarSign, Gem } from 'lucide-react-native';
import { GemIcon } from '../nativewindui/Gem';
import { CoinIcon } from '../nativewindui/Coin';

type InventoryModalProps = {
    visible: boolean;
    onClose: () => void;
};

export default function InventoryModal({ visible, onClose }: InventoryModalProps) {
  const dispatch = useAppDispatch();
  const inventory = useAppSelector(state => state.inventory.items);
  const gems = useAppSelector(state => state.currency.gems);
  const coins = useAppSelector(state => state.currency.coins);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['60%', '85%'], []);

  React.useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [visible]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        onDismiss={onClose}
        backgroundStyle={{ backgroundColor: '#1F2937', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      >
        <View className="flex-1 p-4">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <AppText variant='bold' className="text-white text-xl ">Inventory</AppText>
            <View className="flex-row items-center">            
              <View  className="text-white flex-row items-center justify-center gap-x-1 "><GemIcon /><AppText variant='bold' className='text-white'>{gems}</AppText></View>
              <View  className="text-white flex-row items-center justify-center text-sm ml-2"><CoinIcon /> <AppText variant='bold' className='text-white'>{coins}</AppText></View>
            </View>
          </View>

          {/* Inventory List */}
          <FlatList
            data={inventory}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
            contentContainerStyle={{ paddingBottom: 16 }}
            renderItem={({ item }) => (
              <View className="bg-gray-700  rounded-xl p-2 w-[48%] flex-row justify-start items-start">
                <View className="w-12 h-12 bg-gray-600  rounded-md mr-2">
                  <Image source={item.icon} className="w-full h-full rounded-md" />
                  <TouchableOpacity onPress={() => dispatch(sellItem(item.id))} className='bg-red-500 flex  rounded-md p-1 mt-2 justify-center items-center '>
                    <AppText variant='bold' className="text-white text-xs">Sell</AppText>
                  </TouchableOpacity>
                </View>
                <View className="flex-1">
                  <AppText variant='bold' className="text-white leading-4 text-sm font-semibold">{item.name}</AppText>
                  <Text className="text-gray-300 text-xs">{item.description}</Text>
                  <Text className="text-gray-400 text-xs mt-1">Type: {item.type}</Text>
                  
                </View>
              </View>
            )}
          />
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

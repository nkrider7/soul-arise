import React, { useState } from 'react'
import { Alert, Button, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import InventoryModal from '~/components/Inventory/InventoryModel';
import AppText from '~/components/universal/AppText'
import { shopItems } from '~/src/constant/shopItems';
import { useAppDispatch, useAppSelector } from '~/src/store/hook/hook';
import { spendGems } from '~/src/store/slices/currencySlice';
import { addItem } from '~/src/store/slices/inventorySlice';
import { lightTheme } from '~/theme/colors'
import uuid from 'react-native-uuid';
import { GemIcon } from '~/components/nativewindui/Gem';
import AppButton from '~/components/universal/AppButton';
import { CoinIcon } from '~/components/nativewindui/Coin';

function Shop() {
    const dispatch = useAppDispatch()
    const [isInventoryOpen, setInventoryOpen] = useState(false);
    const gems = useAppSelector(state => state.currency.gems);
    const handlePurchase = (itemFromShop: any) => {
        if (gems >= itemFromShop.priceGems) {
            dispatch(spendGems(itemFromShop.priceGems));
            const newItem = {
                id: uuid.v4() as string,
                name: itemFromShop.name,
                description: itemFromShop.description,
                type: itemFromShop.type,
                icon: itemFromShop.icon,
                price: itemFromShop.priceGems, 
                currencyType: "gems" as "gems", 
              };
            
              dispatch(addItem(newItem));
            
            Alert.alert('Success!', `You purchased ${itemFromShop.name}`);
        } else {
            Alert.alert('Not enough gems!', `You need ${itemFromShop.priceGems - gems} more gems.`);
        }
    };
    const handleSell = (item: any) => {
        // dispatch(spendGems(-item.priceGems));
        Alert.alert('Success!', `You sold ${item.name}`);
    };
    return (
        <View style={{ backgroundColor: lightTheme.background2 }} className=' flex-1 px-4'>
            <View className='flex-row items-start w-full justify-between pl-2 pt-6 pb-3 rounded-t-2xl '>

                <View>
                    <AppText variant='bold' className="text-white text-2xl mt-4">Shop</AppText>
                    <View className="flex flex-row items-center gap-x-1 mt-1"><AppText variant='bold' className='text-white text-xs'>Gems: {gems} </AppText><GemIcon /> </View>
                    <View className="flex flex-row items-center "><AppText variant='bold' className='text-white text-xs'>Coins: {gems} </AppText><CoinIcon /> </View>
                </View>
                <View className="flex-row justify-between items-center mt-4">
                    <AppButton
                        size='sm'
                        variant='purple'
                        title='Inventory'
                        onPress={() => setInventoryOpen(true)}
                        className=""
                    />
                        
                </View>
            </View>
            <FlatList
                data={shopItems}
                keyExtractor={item => item.id}

                renderItem={({ item }) => (
                    <View className="flex-row bg-gray-800 rounded-2xl p-4 mb-5 items-center">

                        {/* Image Placeholder */}
                        <View className="w-16 h-16 bg-sky-300 rounded-md mr-4" >
                            <Image source={item.icon} className='h-16 w-16 '  />
                        </View>

                        {/* Item Info */}
                        <View className="flex-1">
                            <Text className="text-white text-lg font-semibold">{item.name}</Text>
                            <Text className="text-gray-300 text-sm">{item.description}</Text>
                            <Text className="text-gray-400 text-xs">Type: {item.type}</Text>
                            <Text className="text-gray-400 text-xs mt-1">{item.priceGems} Gems <GemIcon /></Text>
                        </View>

                        {/* Buttons */}
                        <View className="justify-between h-24 ml-2">
                            <TouchableOpacity
                                onPress={() => handlePurchase(item)}
                                className="bg-green-600 px-4 py-2 rounded-md mb-2"
                            >
                                <Text className="text-white font-bold text-sm">Buy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handleSell(item)}
                                className="bg-red-600 px-4 py-2 rounded-md"
                            >
                                <Text className="text-white font-bold text-sm">Sell</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                )}
            />
            {isInventoryOpen && (
                <InventoryModal
                visible={isInventoryOpen}
                onClose={() => setInventoryOpen(false)}
              />
            )}
        </View>
    )
}


export default Shop
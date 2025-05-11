import uuid from 'react-native-uuid';

export const shopItems = [
    {
      id: uuid.v4() as string,
      name: 'Sword of Courage',
      description: '+5 strength',
      priceGems: 50,
      type: 'weapon',
      effect: { stat: 'strength', amount: 5 },
    },
    {
      id: uuid.v4() as string,
      name: 'Helmet of Wisdom',
      description: '+3 intelligence',
      priceGems: 30,
      type: 'armor',
      effect: { stat: 'intelligence', amount: 3 },
    },
    {
      id: uuid.v4() as string,
      name: 'Stamina Elixir',
      description: 'Restore stamina by 10',
      priceGems: 20,
      type: 'consumable',
    },
  ];
  
const validateInput = (value) => {
  let isValid = true;

  if (!value) {
    isValid = false;
  } else if (typeof value !== 'string') {
    isValid = false;
    /**
     * The regular expression makes sure the string is in a certain format i.e.
     * 1. 200 -> valid
     * 2. 200.00 -> valid
     * 3. £200 -> valid
     * 4. £200.00 -> valid
     * 5. £ -> invalid
     * 6. £.2 -> invalid
     * 7. £0.2 -> valid
     * 8. £200.0 -> valid
     * 9. £200.402 -> invalid
     *  */
  } else if (!/^£?\d+(\.\d{1,2})?$/.test(value)) {
    isValid = false;
  }

  return isValid;
};

const convertValueToNumeric = (value) => {
  let newStringValue = value.startsWith('£') ? value.replace('£', '') : value;

  if (!newStringValue.includes('.')) {
    return parseFloat(newStringValue) / 100;
  }

  return parseFloat(newStringValue);
};

const getNearestCoin = (value, coins) => {
  const coin = coins
    .sort((a, b) => b.value - a.value)
    .find(({ value: coinValue }) => coinValue <= value);
  return coin;
};

const calculateCoinsNeeded = (value, coins = []) => {
  let newCoins = [...coins];
  const nearestCoin = getNearestCoin(value, newCoins);
  if (nearestCoin) {
    const { value: coinValue = 0, key: coinKey = '' } = nearestCoin;
    const newValue = value - coinValue;

    newCoins = newCoins.map((coin) => {
      const newCoin = { ...coin };

      if (coin.key === coinKey) {
        newCoin.quantity += 1;
      }
      return newCoin;
    });

    if (newValue > 0) {
      return calculateCoinsNeeded(newValue.toFixed(2), newCoins);
    }
  }

  return newCoins;
};

const getCoinsForInput = (value) => {
  if (!validateInput(value)) {
    throw new Error('Invalid input supplied');
  }

  let coins = [
    { key: '£2', value: 2, quantity: 0 },
    { key: '£1', value: 1, quantity: 0 },
    { key: '50p', value: 0.5, quantity: 0 },
    { key: '20p', value: 0.2, quantity: 0 },
    { key: '10p', value: 0.1, quantity: 0 },
    { key: '2p', value: 0.02, quantity: 0 },
    { key: '1p', value: 0.01, quantity: 0 },
  ];

  const numericValue = convertValueToNumeric(value, coins);
  return calculateCoinsNeeded(numericValue, coins);
};

export default getCoinsForInput;

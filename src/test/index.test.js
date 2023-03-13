import getCoinsForInput from '../index';

describe('getCoinsForInput', () => {
  it('error if passed a nothing', () => {
    try {
      getCoinsForInput(12);
    } catch (ex) {
      expect(ex.message).toBe('Invalid input supplied');
    }
  });
  it('error when if passed an empty string', () => {
    try {
      getCoinsForInput('');
    } catch (ex) {
      expect(ex.message).toBe('Invalid input supplied');
    }
  });

  it('error if passed a number', () => {
    try {
      getCoinsForInput(12);
    } catch (ex) {
      expect(ex.message).toBe('Invalid input supplied');
    }
  });

  it('error if no numeric string passed', () => {
    try {
      getCoinsForInput('£');
    } catch (ex) {
      expect(ex.message).toBe('Invalid input supplied');
    }
  });

  it('return 1  2p, 1 1p if passed £3', () => {
    let expectedResult = [
      { key: '£2', value: 2, quantity: 0 },
      { key: '£1', value: 1, quantity: 0 },
      { key: '50p', value: 0.5, quantity: 0 },
      { key: '20p', value: 0.2, quantity: 0 },
      { key: '10p', value: 0.1, quantity: 0 },
      { key: '2p', value: 0.02, quantity: 1 },
      { key: '1p', value: 0.01, quantity: 1 },
    ];
    const result = getCoinsForInput('£3');
    expect(result).toEqual(expectedResult);
  });

  it('return 1  50p, 1 1p if passed £12', () => {
    let expectedResult = [
      { key: '£2', value: 2, quantity: 0 },
      { key: '£1', value: 1, quantity: 0 },
      { key: '50p', value: 0.5, quantity: 0 },
      { key: '20p', value: 0.2, quantity: 0 },
      { key: '10p', value: 0.1, quantity: 1 },
      { key: '2p', value: 0.02, quantity: 1 },
      { key: '1p', value: 0.01, quantity: 0 },
    ];
    const result = getCoinsForInput('£12');
    expect(result).toEqual(expectedResult);
  });

  it('return 2 x £2, 1 x £1, 1 x 50p, 1 x 1p if passed £551', () => {
    let expectedResult = [
      { key: '£2', value: 2, quantity: 2 },
      { key: '£1', value: 1, quantity: 1 },
      { key: '50p', value: 0.5, quantity: 1 },
      { key: '20p', value: 0.2, quantity: 0 },
      { key: '10p', value: 0.1, quantity: 0 },
      { key: '2p', value: 0.02, quantity: 0 },
      { key: '1p', value: 0.01, quantity: 1 },
    ];
    const result = getCoinsForInput('£551');

    expect(result).toEqual(expectedResult);
  });

  it('return 2 x £2, 1 x £1, 1 x 20p, 1 x 2p, 1 x 1p if passed 523', () => {
    let expectedResult = [
      { key: '£2', value: 2, quantity: 2 },
      { key: '£1', value: 1, quantity: 1 },
      { key: '50p', value: 0.5, quantity: 0 },
      { key: '20p', value: 0.2, quantity: 1 },
      { key: '10p', value: 0.1, quantity: 0 },
      { key: '2p', value: 0.02, quantity: 1 },
      { key: '1p', value: 0.01, quantity: 1 },
    ];
    const result = getCoinsForInput('523');

    expect(result).toEqual(expectedResult);
  });

  it('return 3 x £2, 1 x £1, 1 x 50p, 1 x 10p, 1 x 2p, 1 x 1p if passed 7.63', () => {
    let expectedResult = [
      { key: '£2', value: 2, quantity: 3 },
      { key: '£1', value: 1, quantity: 1 },
      { key: '50p', value: 0.5, quantity: 1 },
      { key: '20p', value: 0.2, quantity: 0 },
      { key: '10p', value: 0.1, quantity: 1 },
      { key: '2p', value: 0.02, quantity: 1 },
      { key: '1p', value: 0.01, quantity: 1 },
    ];

    const result = getCoinsForInput('7.63');

    expect(result).toEqual(expectedResult);
  });
});

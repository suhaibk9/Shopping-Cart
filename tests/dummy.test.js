const { sum, multiply } = require('../src/services/dummy_service');
describe('Dummy Service', () => {
  test('sum', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(-1, 1)).toBe(0);
  });
  test('multiply', () => {
    expect(multiply(2, 3)).toBe(6);
  });
});

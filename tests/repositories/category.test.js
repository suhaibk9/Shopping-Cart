const { CategoryRepository } = require('../../src/repository/index');
const { Category } = require('../../src/models/index');
const mockedCategory = {
  id: 1,
  name: 'Clothing',
  description: 'Clothing Items',
  createdAt: '2021-08-09T14:57:50.000Z',
  updatedAt: '2021-08-09T14:57:50.000Z',
};
describe('Test for Category Repository', () => {
  test('Should Create Category', async () => {
    const repo = new CategoryRepository();
    jest.spyOn(Category, 'create').mockImplementation(() => {
      return mockedCategory;
    });
    const response = await repo.createCategory('Clothing', 'Clothing Items');
    expect(response.name).toBe('Clothing');
    expect(response.description).toBe('Clothing Items');
  });
});

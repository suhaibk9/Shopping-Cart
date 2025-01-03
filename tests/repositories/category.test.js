const { CategoryRepository } = require('../../src/repository/index');
const { Category } = require('../../src/models/index');
const mockedCategory = {
  id: 1,
  name: 'Clothing',
  description: 'Clothing Items',
  createdAt: '2021-08-09T14:57:50.000Z',
  updatedAt: '2021-08-09T14:57:50.000Z',
};
const mockError = { error: 'Sample error' };
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
describe('Tests for category repository getCategory', () => {
  test('Should get one category', async () => {
    // Prepare.
    const repository = new CategoryRepository();

    jest.spyOn(Category, 'findByPk').mockImplementation(() => mockedCategory);

    // Act.
    const response = await repository.getCategory(1);

    // Expect / Assert
    expect(response.name).toBe('Fashion');
    expect(response.description).toBe('Fashion related products');
  });

  test('Should not get a category and throws error', async () => {
    // Prepare.
    const repository = new CategoryRepository();

    jest.spyOn(Category, 'findByPk').mockImplementation(() => {
      throw mockError;
    });

    try {
      // Act.
      const response = await repository.getCategory(1);
      expect(response).toThrow();
    } catch (error) {
      // Expect / Assert
      expect(error).toBe(mockError);
    }
  });
});

describe('Tests for category repository getCategories', () => {
  test('Should get all categories', async () => {
    // Prepare.
    const repository = new CategoryRepository();

    jest.spyOn(Category, 'findAll').mockImplementation(() => [mockedCategory]);

    // Act.
    const response = await repository.getCategories();

    // Expect / Assert
    expect(response).toHaveLength(1);
    expect(response).toContain(mockedCategory);
  });

  test('Should not get all categories and throws error', async () => {
    // Prepare.
    const repository = new CategoryRepository();

    jest.spyOn(Category, 'findAll').mockImplementation(() => {
      throw mockError;
    });

    try {
      // Act.
      const response = await repository.getCategories();
      expect(response).toThrow();
    } catch (error) {
      // Expect / Assert
      expect(error).toBe(mockError);
    }
  });
});

describe('Tests for category repository destroyCategory', () => {
  test('Should delete one category', async () => {
    // Prepare.
    const repository = new CategoryRepository();

    jest.spyOn(Category, 'destroy').mockImplementation(() => true);

    // Act.
    const response = await repository.destroyCategory(1);

    // Expect / Assert
    expect(response).toBe(true);
  });

  test('Should not delete a category and throws error', async () => {
    // Prepare.
    const repository = new CategoryRepository();

    jest.spyOn(Category, 'destroy').mockImplementation(() => {
      throw mockError;
    });

    try {
      // Act.
      const response = await repository.destroyCategory(1);
      expect(response).toThrow();
    } catch (error) {
      // Expect / Assert
      expect(error).toBe(mockError);
    }
  });
});

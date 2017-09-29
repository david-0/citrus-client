import { SortByFruitNamePipe } from './sort-by-fruit-name.pipe';

describe('SortByFruitNamePipe', () => {
  it('create an instance', () => {
    const pipe = new SortByFruitNamePipe();
    expect(pipe).toBeTruthy();
  });
});

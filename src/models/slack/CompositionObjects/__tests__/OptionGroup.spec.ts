import { Option } from '../Option';
import { OptionsGroup } from '../OptionsGroup';

describe('OptionsGroup', () => {
  it('should create an instance of the option group class', () => {
    const option1 = new Option('Option 1', 'https://fakeurl.com/1');
    const option2 = new Option('Option 2', 'https://fakeurl.com/2');

    const optionGroup = new OptionsGroup([
      option1,
      option2,
    ]);

    expect(optionGroup.options.length).toBe(2);
    expect(optionGroup.label).toBe('plain_text');
  });

  describe('addOption()', () => {
    it('should add a new option to the group of options', () => {
      const optionGroup = new OptionsGroup([]);

      optionGroup.addOption(new Option('option'));

      expect(optionGroup.options.length).toBe(1);
    });
  });
});

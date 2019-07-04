import { Option } from '../Option';
import { OptionsGroup } from '../OptionsGroup';

describe('OptionsGroup', () => {
  const options: Option[] = [];

  for (let i = 1; i <= 100; i++) {
    options.push(new Option('option', 'value'));
  }

  it('should create an instance of the option group class', () => {
    const option1 = new Option('Option 1', 'one', 'https://fakeurl.com/1');
    const option2 = new Option('Option 2', 'two', 'https://fakeurl.com/2');

    const optionGroup = new OptionsGroup('option', [
      option1,
      option2
    ]);

    expect(optionGroup.options.length).toBe(2);
    expect(optionGroup.label).toEqual({
      emoji: false,
      text: 'option',
      type: 'plain_text'
    });
  });

  it('should should throw an error if label if beyond 75 characters', (done) => {
    try {
      const optionGroup = new OptionsGroup('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', []);
    } catch (error) {
      expect(error.message).toEqual('labelText cannot be more than 75 characters');
      done();
    }
  });

  it('should throw an error if the options are more than 100', (done) => {
    try {
      const opts = options.slice(0);
      opts.push(new Option('option', 'value'));

      const optionGroup = new OptionsGroup('label', opts);
    } catch (error) {
      expect(error.message).toEqual('options array cannot have more than 100 option items');
      done();
    }
  });

  describe('addOption()', () => {
    it('should add a new option to the group of options', () => {
      const optionGroup = new OptionsGroup('option', []);

      optionGroup.addOption(new Option('option', 'one'));

      expect(optionGroup.options.length).toBe(1);
    });

    it('should trow an error if trying to add more than 100 options to the array', (done) => {
      try {
        const optionGroup = new OptionsGroup('option', options);

        optionGroup.addOption(new Option('option', 'one'));
      } catch (error) {
        expect(error.message).toEqual('Options array cannot contain more than 100 options');
        done();
      }
    });
  });
});

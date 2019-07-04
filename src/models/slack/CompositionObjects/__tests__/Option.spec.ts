import { Option } from '../Option';

describe('Option', () => {
  it('should create a new instance of the option type', () => {
    const option = new Option(
      'First Option',
      'Option 1',
      'https://fakeurl.com',
    );

    expect(option.text.text).toBe('First Option');
    expect(option.value).toBe('Option 1');
    expect(option.url).toBe('https://fakeurl.com');
  });

  it('should throw a text value character error', (done) => {
    try {
      const option = new Option(
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        'value'
      );
    } catch (error) {
      expect(error.message).toBe('textText cannot be more that 75 characters');
      done();
    }
  });

  it('should throw a text value character error', (done) => {
    try {
      const option = new Option(
        'text',
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      );
    } catch (error) {
      expect(error.message).toBe('value cannot be more that 75 characters');
      done();
    }
  });

  it('should throw a text value character error', (done) => {
    try {
      const option = new Option(
        'text',
        'value',
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet commodo ligula. Nam ornare, nulla ac ultricies molestie, est velit elementum nulla, quis congue erat dui vestibulum mauris. Mauris in ex dignissim, pellentesque sem vitae, sagittis libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec malesuada ornare enim non venenatis. Mauris nec sapien non augue faucibus maximus. Pellentesque id massa eget nisi semper facilisis id eu odio. Etiam mi nunc, dictum et sapien eget, venenatis feugiat quam. Nullam non ante ante. Integer non neque efficitur odio vulputate cursus a nec turpis. Nunc dapibus eu ligula ac aliquet. Mauris aliquam magna sed lacus ullamcorper, eget tristique lorem tincidunt. Phasellus quis laoreet quam. Nunc placerat scelerisque dolor ut finibus. Praesent vulputate, metus et eleifend consectetur, eros turpis laoreet tellus, in sagittis felis tortor a elit. Morbi iaculis vitae dui a varius.
        Donec bibendum ante vitae orci dictum, eget euismod diam condimentum. In malesuada elit at enim ornare pharetra. In varius accumsan ullamcorper. Integer non dui massa. Nunc aliquet scelerisque massa, non scelerisque sapien aliquet at. Vestibulum arcu arcu, dictum vel pulvinar quis, rhoncus a diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer elementum diam id pulvinar sagittis. Mauris et sem ut velit fermentum viverra. Aenean a sagittis tellus, pellentesque mollis nisl. Duis varius vestibulum gravida. Integer fringilla tristique massa vel tempor. Nulla tristique lobortis lacus ut suscipit. Morbi varius odio id justo vehicula, tempor convallis nunc euismod.
        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus viverra in lorem nec rutrum. Phasellus ut magna tempus, sollicitudin ipsum at, tristique felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec convallis convallis odio, vitae sodales libero suscipit euismod. Mauris faucibus vitae ligula vel auctor. Morbi hendrerit ornare lectus, sit amet ornare magna. In nec ultrices urna. Suspendisse aliquet leo quis nisl ullamcorper maximus. Nullam condimentum tempus facilisis. Duis hendrerit eu ex non egestas. Nam at placerat nulla. Suspendisse at lacus in leo pretium rutrum. Nam facilisis consectetur eros eu pretium. In malesuada ornare arcu, vitae dictum mi gravida nec.
        Mauris a efficitur enim. Suspendisse vestibulum elit in tellus congue hendrerit. Etiam faucibus turpis id ante scelerisque malesuada. Donec imperdiet facilisis elit et varius. Nunc eget ullamcorper dolor, eget pretium lectus. Pellentesque condimentum vulputate pretium. Donec placerat ac erat nec varius. Etiam iaculis vehicula elit quis dictum. Mauris dignissim velit vel libero commodo convallis. Sed id pretium nibh, eget malesuada nibh. In a dignissim massa. Nullam eget gravida dui. Suspendisse tristique finibus diam, vitae faucibus elit vulputate sed.`
      );
    } catch (error) {
      expect(error.message).toBe('url cannot be more that 3000 characters');
      done();
    }
  });
});

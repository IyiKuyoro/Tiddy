import { BlockElement, BlockElementType } from "../BlockElement";

describe('BlockElement', () => {
  it('should create a new block element', () => {
    const blockEle = new BlockElement(BlockElementType.section);

    expect(blockEle.type).toEqual(BlockElementType.section);
  });
});

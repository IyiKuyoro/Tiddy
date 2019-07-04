export enum BlockElementType {
  image = 'image',
  button = 'button',
  selectMenu = 'static_select',
  overflowMenu = 'overflow',
  datePicker = 'datepicker',
}

export default abstract class BlockElement {
  public type: BlockElementType;

  constructor(type: BlockElementType) {
    this.type = type
  }
}

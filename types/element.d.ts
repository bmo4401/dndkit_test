export type ElementType =
  | 'Title'
  | 'Subtitle'
  | 'Separator'
  | 'Spacer'
  | 'Date'
  | 'Checkbox'
  | 'Text'
  | 'TextArea'
  | 'Select'
  | 'Number';
type DndElementType = {
  type: ElementType;
  icon: LucideIcon;
  designComponent: React.FC<>;
  propertyComponent: React.FC<>;
  formComponent: React.FC<>;
};

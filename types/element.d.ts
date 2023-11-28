type ElementType =
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
  modifyComponent: React.FC<PropertyProps>;
  formComponent: React.FC<>;
};

export interface PropertyProps {
  id: string;
  selectedElement: SetStateAction<string>;
}

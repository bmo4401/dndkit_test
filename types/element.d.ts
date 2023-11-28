type ElementType =
  | 'Title'
  | 'Subtitle'
  | 'Separator'
  | 'Spacer'
  | 'Date'
  | 'Checkbox'
  | 'Text'
  | 'Textarea'
  | 'Select'
  | 'Number';
type DndElementType = {
  type: ElementType;
  icon: LucideIcon;
  designComponent: React.FC<>;
  propertyComponent: React.FC<PropertyProps>;
  formComponent: React.FC<>;
};

export interface PropertyProps {
  id: string;
  selectedElement: SetStateAction<string>;
}

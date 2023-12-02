import { SelectedElementType } from "@/hooks/useForms";
import { LucideIcon } from "lucide-react";

export type ElementType =
  | "Title"
  | "Subtitle"
  | "Separator"
  | "Spacer"
  | "Date"
  | "Checkbox"
  | "Text"
  | "TextArea"
  | "Select"
  | "Number";

export type AttributeType = {
  type: ElementType;
  icon: LucideIcon;
  attribute?: {
    design?: Object<any>;
    form?: Object<any>;
  };
};
export type DndElementType = {
  type: ElementType;
  icon: LucideIcon;
  attribute?: {
    design?: Object<any>;
    form?: Object<any>;
  };
  getAttribute: () => AttributeType;
  designComponent: React.FC<{ element: SelectedElementType }>;
  designOverlay?: React.FC<>;
  propertyComponent: React.FC<>;
  formComponent: React.FC<{
    element: SelectedElementType;
    isSubmitted?: boolean;
  }>;
};

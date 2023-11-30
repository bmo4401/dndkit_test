import { SelectedElementType } from "@/hooks/useDesign";
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
type DndElementType = {
  type: ElementType;
  icon: LucideIcon;
  attribute?: any;
  designComponent: React.FC<{ element: SelectedElementType }>;
  designOverlay?: React.FC<>;
  propertyComponent: React.FC<>;
  formComponent: React.FC<{ element: SelectedElementType }>;
};

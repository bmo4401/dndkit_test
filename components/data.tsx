import Separator from "@/components/fields/Separator";
import Spacer from "@/components/fields/Spacer";
import Subtitle from "@/components/fields/Subtitle";
import Title from "@/components/fields/Title";
import Text from "@/components/fields/input/Text";
import TextArea from "@/components/fields/input/TextArea";
export const FormElements = {
  [Title.type]: Title,
  [Text.type]: Text,
  [TextArea.type]: TextArea,
  [Subtitle.type]: Subtitle,
  [Spacer.type]: Spacer,
  [Separator.type]: Separator,
};
export const TitleComponents = [Title, Subtitle, Spacer, Separator];

export const InputComponents = [Text, TextArea];

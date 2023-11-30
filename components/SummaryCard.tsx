import { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  icon: ReactNode;
  helperText: string;
  value: string;
  loading?: boolean;
  className: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  className,
  helperText,
  icon,
  loading,
  title,
  value,
}) => {
  return <div>SummaryCard</div>;
};
export default SummaryCard;

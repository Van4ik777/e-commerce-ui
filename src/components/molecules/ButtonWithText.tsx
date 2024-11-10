import { CustomButton } from "../atoms/buttons/CustomButton";
import { MyText } from "../atoms/text/MyText";


interface ButtonWithTextProps {
  label: string;
  content: string;
  onClick: () => void;
}

export const ButtonWithText: React.FC<ButtonWithTextProps> = ({ label, content, onClick }) => {
  return (
    <div>
      <MyText content={content} />
      <CustomButton label={label} onClick={onClick} />
    </div>
  );
};

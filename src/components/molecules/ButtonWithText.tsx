import { MyButton } from '../atoms/buttons/MyButton';
import { MyText } from '../atoms/text/MyText';

interface ButtonWithTextProps {
  label: string;
  content: string;
  onClick: () => void;
}

export const ButtonWithText: React.FC<ButtonWithTextProps> = ({ label, content, onClick }) => {
  return (
    <div>
      <MyText content={content} />
      <MyButton label={label} onClick={onClick} />
    </div>
  );
};

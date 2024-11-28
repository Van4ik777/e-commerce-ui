import { MyText } from '../atoms/text/MyText';

interface FiltercardProps {
  label: string;
  onClick: () => void;
}

export const Filtercard: React.FC<FiltercardProps> = ({ label, onClick }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid gray',
        padding: '8px',
        maxWidth: '300px', 
        margin: '5px', 
        justifyContent: 'space-between',
        backgroundColor: 'white', 
        borderRadius: '4px', 
      }}
    >
      <span
        onClick={onClick}
        style={{
          marginRight: '8px',
          fontSize: '22px',
          fontWeight: 'bold',
          cursor: 'pointer',
          color: 'gray',
        }}
      >
        ✕
      </span>
      
      <div
        style={{
          fontFamily: 'Roboto',
          fontSize: '18px',
          fontWeight: 250,
          color: 'gray',
        }}
      >
        {label}
      </div>
    </div>
  );
};
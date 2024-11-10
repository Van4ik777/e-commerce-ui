import { MyText } from '../atoms/text/MyText';

interface FiltercardProps {
  label: string;
  onClick: () => void;
}

export const Filtercard: React.FC<FiltercardProps> = ({ label, onClick }) => {
  return (
    <div
      style={{
        display: 'inline-flex', // Use inline-flex to allow wrapping around contents
        alignItems: 'center',
        border: '1px solid gray',
        padding: '8px',
        maxWidth: '200px', // Set a maximum width if needed
        margin: '5px', // Add margin for spacing between cards
        justifyContent: 'space-between',
        backgroundColor: 'white', // Optional background color
        borderRadius: '4px', // Optional: add some border radius for a nicer look
      }}
    >
      <span
        onClick={onClick}
        style={{
          marginRight: '8px',
          fontSize: '18px',
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
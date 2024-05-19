const TouchArea: React.FC<Props> = ({ value, onClick, disabled }) => {

    return (
        <button onClick={onClick} disabled={disabled} style={{ height: '75px', width: '75px', backgroundColor: '#1e1e1e', margin: '2px', borderRadius: '0', color: value === 'x' ? '#43a7c1' : '#d65236', border: '0' }}>
            <p style={{ fontSize: value === 'x' ? '45px' : '40px', margin: 0, fontFamily: "Poppins", fontWeight: 500 }}>
                {value}
            </p>
        </button>
    )
}

interface Props {
    value: 'x' | 'O' | null;
    onClick: () => void;
    disabled: boolean;
}

export default TouchArea;
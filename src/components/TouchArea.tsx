const TouchArea: React.FC<Props> = ({ value, onClick, disabled }) => {

    return (
        <button onClick={onClick} disabled={disabled} style={{ height: '75px', width: '75px', backgroundColor: '#1e1e1e', margin: '2px', borderRadius: '0', color: 'white' }}>
            <p style={{ fontSize: '35px', margin: 0 }}>
                {value}
            </p>
        </button>
    )
}

interface Props {
    value: 'X' | 'O' | null;
    onClick: () => void;
    disabled: boolean;
}

export default TouchArea;
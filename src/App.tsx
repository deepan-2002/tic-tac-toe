import './App.css'
import TouchArea from './components/TouchArea'
import { useDispatch, useSelector } from 'react-redux';
import { handleClick, restart } from './redux/actions';
import CustomizedMenu from './components/Menu';
import { Button } from '@mui/material';

function App() {

  const gameMatrix = useSelector((state: any) => state.game.matrix);
  const isWon = useSelector((state: any) => state.game.won);
  const XO = useSelector((state: any) => state.game.value);
  const isDraw = useSelector((state: any) => state.game.isDraw);

  const dispatch = useDispatch();

  return (
    <main style={{ width: '100%', minHeight: '100vh', backgroundColor: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', }}>
      <div style={{ position: 'absolute', top: 0, left: 0, display: 'flex', justifyContent: 'space-between', width: '100%', padding: '1rem', alignItems: 'center' }}>
        <CustomizedMenu /><Button variant='outlined' onClick={() => dispatch(restart())}>Restart</Button>
      </div>
      <div style={{ position: 'absolute', top: '25%', fontSize: '1.5rem' }}>
        {isWon ? <p style={{ margin: 0, color: '#fff' }}>{XO === 'x' ? 'O' : 'X'} Wins</p> :
          isDraw ? <p style={{ margin: 0, color: '#fff' }}>Draw</p> :
            <p style={{ margin: 0, color: '#fff' }}>Now {XO?.toUpperCase()} turn</p>
        }
      </div>
      <div>
        <div style={{ display: 'flex' }}>
          {gameMatrix[0].map((val: any, index: number) => (
            <TouchArea key={index} disabled={gameMatrix[0][index] || isWon} onClick={() => dispatch(handleClick(0 + String(index)))} value={val} />
          ))}
        </div>
        <div style={{ display: 'flex' }}>
          {gameMatrix[1].map((val: any, index: number) => (
            <TouchArea key={index} disabled={gameMatrix[1][index] || isWon} onClick={() => dispatch(handleClick(1 + String(index)))} value={val} />
          ))}
        </div>
        <div style={{ display: 'flex' }}>
          {gameMatrix[2].map((val: any, index: number) => (
            <TouchArea key={index} disabled={gameMatrix[2][index] || isWon} onClick={() => dispatch(handleClick(2 + String(index)))} value={val} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default App

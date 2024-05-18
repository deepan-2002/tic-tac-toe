import './App.css'
import TouchArea from './components/TouchArea'
import { useDispatch, useSelector } from 'react-redux';
import { handleCheckbox, handleClick } from './redux/actions';

function App() {

  const gameMatrix = useSelector((state: any) => state.game.matrix);
  const isWon = useSelector((state: any) => state.game.won);
  const XO = useSelector((state: any) => state.game.value);
  const newMode = useSelector((state: any) => state.game.newMode)

  const dispatch = useDispatch();

  return (
    <main style={{ width: '100%', minHeight: '100vh', backgroundColor: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {!isWon && <div style={{ display: 'flex' }}>
        <input type='checkbox' id='newMode' checked={newMode} onChange={() => dispatch(handleCheckbox())} /> <label htmlFor='newMode' style={{ color: '#fff' }}>New Mode</label>
      </div>}
      {isWon && <p style={{ margin: 0, color: '#fff' }}>{XO === 'X' ? 'O' : 'X'} Wins</p>}
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
      {!isWon && <p style={{ margin: 0, color: '#fff' }}>{XO} turn</p>}
    </main>
  )
}

export default App

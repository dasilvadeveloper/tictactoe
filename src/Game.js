import { useEffect, useState } from 'react';
import './Game.css';

function Game() {

  let [pieces, setPieces] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  let [winnerCombo, setWinnerCombo] = useState(null)
  let [turn, setTurn] = useState(1)


  let winningCombinations = [
    { indexes: [0, 1, 2], orientation: 'horizontal' },
    { indexes: [3, 4, 5], orientation: 'horizontal' },
    { indexes: [6, 7, 8], orientation: 'horizontal' },

    { indexes: [0, 3, 6], orientation: 'vertical' },
    { indexes: [1, 4, 7], orientation: 'vertical' },
    { indexes: [2, 5, 8], orientation: 'vertical' },

    { indexes: [0, 4, 8], orientation: 'diagonal-1' },
    { indexes: [2, 4, 6], orientation: 'diagonal-2' },
  ]

  const pieceClick = (pieceIndex) => {
    if (pieces[pieceIndex] !== 0) {
      return;
    }
    if (winnerCombo) {
      return;
    }

    setPieces((previous) => {
      const newPieces = [...previous]
      newPieces[pieceIndex] = (turn == 1) ? 1 : 2
      return newPieces;
    })

    setTurn(prevTurn => prevTurn === 1 ? 2 : 1)
  }

  useEffect(() => {
    hasWinner();
    checkGameEndedd()
  }, [pieces])

  const checkGameEndedd = () => {
    if (pieces.every(piece => piece !== 0)) {
      alert("winner player:", winnerCombo)
    };
  }

  const hasWinner = () => {
    let winner = null;
    for (let combination of winningCombinations) {
      const { indexes } = combination
      if (
        pieces[indexes[0]] === 1 &&
        pieces[indexes[1]] === 1 &&
        pieces[indexes[2]] === 1
      ) {
        winner = 1
      }

      if (
        pieces[indexes[0]] === 2 &&
        pieces[indexes[1]] === 2 &&
        pieces[indexes[2]] === 2
      ) {
        winner = 2
      }
      if (winner) {
        setWinnerCombo(combination)
        break
      }
    }
  }

  return (
    <div className='game'>
      <span className='turn'>
        TURN
        {turn == 1 && " ❌"}
        {turn == 2 && " ⭕️"}
        {turn == 0 && ""}
      </span>

      <div className="pieces">
        {
          pieces.map((piece, index) =>
            <div className='piece' key={index} onClick={() => pieceClick(index)} >
              <span className={
                winnerCombo && winnerCombo.indexes.includes(index) ? winnerCombo.orientation : undefined

              }>
                {piece == 1 && "❌"}
                {piece == 2 && "⭕️"}
                {piece == 0 && ""}
              </span>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Game;

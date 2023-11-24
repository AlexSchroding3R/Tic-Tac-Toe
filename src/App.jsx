import { useState } from "react";
import "./App.css";
import Square from "./components/Variable";

function App({ isnext, squares, onplay }) {
    const nexsquares = squares.slice();
    function handleClick(i) {
        if (squares[i] || Calculating_winner(squares)) {
            return;
        }
        if (isnext) {
            nexsquares[i] = "X";
        } else {
            nexsquares[i] = "O";
        }

        onplay(nexsquares);
    }

    function Calculating_winner(squares) {
        let match_val = false;
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                match_val=true;
                return squares[a];
            }
        }
        return null;
    }
    const check_filled = nexsquares.every((Element) => {
        return Element !== undefined && Element !== null && Element !== " ";
    });
    const winner = Calculating_winner(squares);
    let info;
    if (winner) {
        info = "Winner is Player " + winner;
    } else if (check_filled) {
        info = "Match is draw";
    } else {
        info = " Player " + (isnext ? "X" : "O") + "'s  Turn";
    }

    return (
        <>
            <div className="container">
                <div className="display_info">{info}</div>

                <div className="row_1">
                    <Square value={squares[0]} onhandleclick={() => handleClick(0)} />
                    <Square value={squares[1]} onhandleclick={() => handleClick(1)} />
                    <Square value={squares[2]} onhandleclick={() => handleClick(2)} />
                </div>
                <div className="row_2">
                    <Square value={squares[3]} onhandleclick={() => handleClick(3)} />
                    <Square value={squares[4]} onhandleclick={() => handleClick(4)} />
                    <Square value={squares[5]} onhandleclick={() => handleClick(5)} />
                </div>
                <div className="row_3">
                    <Square value={squares[6]} onhandleclick={() => handleClick(6)} />
                    <Square value={squares[7]} onhandleclick={() => handleClick(7)} />
                    <Square value={squares[8]} onhandleclick={() => handleClick(8)} />
                </div>
            </div>
        </>
    );
}
export default function Game() {
    const [history, sethistory] = useState([Array(9).fill(null)]);
    const [currentmove , setcurrentmove] = useState(0)
    const isnext = currentmove % 2 === 0;
    const currentsquare = history[currentmove];
    console.log(currentmove);

    function handleplay(nexsquares) {
        const nexhis = [...history.slice(0 , currentmove + 1), nexsquares]
        sethistory(nexhis);
        setcurrentmove(nexhis.length - 1)
    }

    function jumpto(nextmove){
        setcurrentmove(nextmove)


    }

    const moves_track = history.map((squares, move)=>{
        let status;
        if(move > 0){
            status = "GO to move " +move
        }else{
            status = "Go to game start"
        }
        return(
            <li key={move}>
                <button className="Status_button" onClick={() =>{jumpto(move)}} >{status}</button>
            </li>
        )
    })

    return (
        <div className="maingame">
            <div className="game_board">
                <App isnext={isnext} squares={currentsquare} onplay={handleplay} />
            </div>
            <div className="game_info">
                <ol>
                    {moves_track}
                </ol>
            </div>
        </div>
    );
}

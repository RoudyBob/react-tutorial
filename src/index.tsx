import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

export interface SquareProps {
    value: string | null,
    onClick: () => void;
}

export interface BoardProps {

}

export interface BoardState {
    squares: Array<string>,
    xIsNext: boolean
}

// In React, function components are a simpler way to write components that only contain a reder method
// and don't have their own state. 

function Square(props: SquareProps) {
    return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      );
}

class Board extends React.Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    };

    handleClick(i: number) {
        const squares: Array<string> = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i: number) {
      return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
    }
  
    render() {
        let status: string;
        const winner = calculateWinner(this.state.squares);

        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
            </div>
        );
    }
}
  
class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
// ========================================
// It???s not guaranteed that document.getElementById('root') returns something that is not null. 
// Since we???re in strictNullChecks mode, you need to be sure root is not null. We???ll deal with that 
// by testing whether we do have an element in play before invoking ReactDOM.createRoot

function calculateWinner(squares: Array<string>): string | null {
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
    for (let i: number = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root elemetn');
const root = ReactDOM.createRoot(rootElement);
root.render(<Game />);  
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var moveState;

// range : range to gerate random number.
// return value : If success, return random number. If failed, return -1. 
function getRandomNum(range) {
	if (range > 0 && range <= 16) {
		return (Math.floor(Math.random() * range));
	}
	return -1;
}

// return new array with value 0 from original array
function extractBlank(tiles) {
	let blanks = [];

	for (let i=0; i<tiles.length; i++) {
		if (tiles[i] === 0) {
			blanks.push(i);
		}
	}
	return blanks;
}

function isFull(tiles) {
	return tiles.every((value) => {return value !== 0;});
}

function Heading() {
	return (
		<div className="heading">
			<h1 className="title">
				<a href="#">
					<strong>2</strong><strong>0</strong><strong>4</strong><strong>8</strong>
				</a>
			</h1>
		</div>
	);
}

function ControlButtions(props) {
	return (
		<div className="control-buttons">
			<a className="restart-button control-button">New Game</a>
		</div>
	);
}

class GemaeMessage extends React.Component {
  render() {
		const gameOver = this.props.gameOver;
		let gameOverCSS = "game-message";

		if (gameOver) {
			gameOverCSS += " game-over";
		}

    return (
      <div className={gameOverCSS}>
		  <p>Game over!</p>
		  <div className="lower">
			  <a className="keep-playing-button">Keep going</a>
			  <a className="retry-button" onClick={this.props.onClick}>Try again</a>
		  </div>
	  </div>
    );
  }
}

class GridContainer extends React.Component {
	renderGridRow() {
		return (
			<div className="grid-row">
				<div className="grid-cell"></div>
				<div className="grid-cell"></div>
				<div className="grid-cell"></div>
				<div className="grid-cell"></div>
			</div>
		);
	}
	render() {
		return (
			<div className="grid-container">
				{this.renderGridRow()}
				{this.renderGridRow()}
				{this.renderGridRow()}
				{this.renderGridRow()}
			</div>
		);
	}
}

function Tile(props) {
	return (
		<div className={props.tileCSS}>
			<div className={props.tileInner}>{props.value}</div>
		</div>
	);
}

class TileContainer extends React.Component {
	// i : index, value : number to display.
	// style 0 : normal, style 1 : new tile, style 2 : merged tile.
	// return value : tile component to display.
	renderTile(i,value,style) {
		const x = parseInt(i/4) + 1;
		const y = i%4 + 1;
		let tileCSS = "tile tile-" + value + " tile-position-" + x + "-" + y;

		if (style === 1) {
			tileCSS += " tile-new"
		} else if (style === 2) {
			tileCSS += " tile-merged"
		}

		return (
			<Tile
				key={i}
				tileCSS={tileCSS}
				tileInner={"tile-inner"}
				value={value}
			/>
		);
	}

	render() {
		const gameBoard = this.props.tiles.map((value, index) => {
			if (value) {
				return (this.renderTile(index, value, this.props.styles[index]));
			}
			return null;
    });

		return (
			<div className="tile-container">
				{gameBoard}
			</div>
		);
	}
}

class GameContainer extends React.Component {
	constructor(props) {
		super(props);
		const newTiles = this.startTiles();
		this.state = { 
			tiles: newTiles[0],
			styles: newTiles[1],
			gameOver: false,
			gameScore: 0
		};
		moveState = false;

		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.tryAgain = this.tryAgain.bind(this);
	}

	clearStyles() {
		this.setState({
			tiles: this.state.tiles,
			styles: Array(16).fill(0),
			gameOver: this.state.gameOver,
			gameScore: this.state.gameScore
		});
	}

	startTiles() {
		const tiles = Array(16).fill(0);
		const styles = Array(16).fill(0);
	
		let index = this.findBlank(tiles);
		tiles[index] = 2;
		styles[index] = 1;
		index = this.findBlank(tiles);
		tiles[index] = 2;
		styles[index] = 1;

		return [tiles, styles];
	}

	rotateLeft(tiles, styles) {
		let newTiles = Array(16).fill(0);
		let newStyles = Array(16).fill(0);

		for (let i=0; i<4; i++) {
			for (let j=0; j<4; j++) {
				newTiles[i*4+3-j] = tiles[j*4+i];
				newStyles[i*4+3-j] = tiles[j*4+i];
			}
		}

		return [newTiles, newStyles];
	}

	rotateRight(tiles, styles) {
		let newTiles = Array(16).fill(0);
		let newStyles = Array(16).fill(0);

		for (let i=0; i<4; i++) {
			for (let j=0; j<4; j++) {
				newTiles[j*4+i] = tiles[i*4+3-j];
				newStyles[j*4+i] = tiles[i*4+3-j];
			}
		}

		return [newTiles, newStyles];
	}

	handleLeft(direction) {
		let rotated;
		let tiles = this.state.tiles;
		let styles = this.state.styles;

		for (let i=0; i<direction; ++i) {
			rotated = this.rotateLeft(tiles, styles);
			tiles = rotated[0];
			styles = rotated[1];
		}

		// Make adding tiles and move tiles left.
		for (let i=0; i<4; ++i) {
			for (let j=0; j<4; j++) {
				let index = (j*4) + i;
				if (tiles[index] !== 0) {
					for (let k=j+1; k<4; k++) {
						let jndex = (k*4) + i;
						if (tiles[jndex] !== 0) {
							if (tiles[index] === tiles[jndex]) {
								tiles[index] = tiles[index] * 2;
								styles[index] = 2;
								tiles[jndex] = 0;
								styles[jndex] = 0;
								moveState = true;
							}
							break;
						}
					}

					for (let k=0; k<j; k++) {
						let jndex = (k*4) + i;
						if (tiles[jndex] === 0) {
							tiles[jndex] = tiles[index];
							styles[jndex] = styles[index];
							tiles[index] = 0;
							styles[index] = 0;
							moveState = true;
							break;
						}
					}
				}
			}
		}

		for (let i=0; i<direction; ++i) {
			rotated = this.rotateRight(tiles, styles);
			tiles = rotated[0];
			styles = rotated[1];
		}

		this.setState({
			tiles: tiles,
			styles: styles,
			gameOver: this.state.gameOver,
			gameScore: this.state.gameScore
		});
	}

	handleKeyPress(event) {
		const	gameOver = this.state.gameOver;

		if (!gameOver && event.keyCode >= 37 && event.keyCode <= 40) {
			this.clearStyles();		// this have a little problem.
			this.handleLeft(event.keyCode-37);

			if (moveState) {
				this.createNewTile();
				moveState = false;
			}

			if (isFull(this.state.tiles)) {		// This is none-efficient.
				this.isGameOver();
			}
		}
	}

	componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
	}

	// return blank position in state.tiles array.
	findBlank(tiles) {
		const blanks = extractBlank(tiles);
		const random = getRandomNum(blanks.length);

		if (random === -1) {
			return random;
		}
		return blanks[random];
	}

	// find mergeable tiles.
	isMoveable() {
		const tiles = this.state.tiles;
		let index1, index2;

		for (let i=0; i<3; i++) {
			for (let j=0; j<4; j++) {
				index1 = i*4 + j;
				index2 = (i+1)*4 + j;
				if (tiles[index1] === tiles[index2]) {
					return true;
				}
				index1 = j*4 + i;
				index2 = j*4 + i + 1;
				if (tiles[index1] === tiles[index2]) {
					return true;
				}
			}
		}
		return false;
	}

	isGameOver() {
		// there is no movable tiles.
		if (!this.isMoveable()) {
			this.setState({
				tiles: this.state.tiles,
				styles: this.state.styles,
				gameOver: true,
				gameScore: this.state.gameScore
			});
		}
	}

	tryAgain() {
		const newTiles = this.startTiles();
		this.setState({
			tiles: newTiles[0],
			styles: newTiles[1],
			gameOver: false,
			gameScore: 0
		});
		moveState = false;
	}

	createNewTile() {
		const tiles = this.state.tiles;
		const styles = this.state.styles;
		let index = this.findBlank(tiles);

		if (index === -1) {		// There in no blanks.
			alert("No blank tiles");
		} else {
			tiles[index] = 2;
			styles[index] = 1;
		}

		this.setState({
			tiles: tiles,
			styles: styles,
			gameOver: this.state.gameOver,
			gameScore: this.state.gameScore
		});
	}

	render() {
		return (
			<div className="game-container">
        <GemaeMessage
          gameOver={this.state.gameOver}
					onClick={() => this.tryAgain()}
        />
				<GridContainer />
				<TileContainer
					tiles={this.state.tiles}
					styles={this.state.styles}
				/>
			</div>
		);
	}
}

class Container extends React.Component {
	render() {
		return (
			<div className="container">
				<Heading />
				<GameContainer />
				<ControlButtions />
			</div>
		);
	}
}

ReactDOM.render(
  <Container />,
	document.getElementById('root')
);
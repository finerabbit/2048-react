import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class GridContainer extends React.Component {
	render() {
		return (
			<div className="grid-container">
				<div className="grid-row">
					<div className="grid-cell"></div>
					<div className="grid-cell"></div>
					<div className="grid-cell"></div>
					<div className="grid-cell"></div>
				</div>
				<div className="grid-row">
					<div className="grid-cell"></div>
					<div className="grid-cell"></div>
					<div className="grid-cell"></div>
					<div className="grid-cell"></div>
				</div>
				<div className="grid-row">
					<div className="grid-cell"></div>
					<div className="grid-cell"></div>
					<div className="grid-cell"></div>
					<div className="grid-cell"></div>
				</div>
				<div className="grid-row">
					<div className="grid-cell"></div>
					<div className="grid-cell"></div>
					<div className="grid-cell"></div>
					<div className="grid-cell"></div>
				</div>
			</div>
		);
	}
}

class Tile extends React.Component {
	render() {
		return (
			<div className={this.props.tileCSS}>
				<div className={this.props.tileInner}>{this.props.value}</div>
			</div>
		);
	}
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
				tileCSS={tileCSS}
				tileInner={"tile-inner"}
				value={value}
			/>
		);
	}

	render() {
		const tiles = this.props.tiles;

		const gameBoard = tiles.map((value, index) => {
			if (value) {
				return (this.renderTile(index, value));
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
		this.state = { 
			tiles: Array(16).fill(0),
			gameScore: 0
		};

		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleKeyPress(event) {
		if (event.keyCode >= 37 && event.keyCode <= 40)
			this.createNewTile();
	}

	componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
	}
	
	createNewTile() {
		const tiles = this.state.tiles;
		const blanks = extractBlank(tiles);
		const random = getRandomNum(blanks.length);

		if (random === -1) {
			alert("Game over!");
			return;
		} else {
			tiles[blanks[random]] = 2;
			this.setState({
				tiles: tiles,
				gameScore: this.state.gameScore
			});
		}
	}

	render() {
		return (
			<div className="game-container">
				<GridContainer />
				<TileContainer
					tiles={this.state.tiles}
					onKeypress={this.handleKeypress}
				/>
			</div>
		);
	}
}

class Container extends React.Component {
	render() {
		return (
			<div className="container">
				<GameContainer />
			</div>
		);
	}
}

ReactDOM.render(
  <Container />,
	document.getElementById('root')
);

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
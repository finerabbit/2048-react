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
		const styles = this.props.styles;

		const gameBoard = tiles.map((value, index) => {
			if (value) {
				return (this.renderTile(index, value, styles[index]));
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
			styles: Array(16).fill(0),
			noBlank: false,
			gameScore: 0
		};
		moveState = false;

		this.createNewTile();
		this.createNewTile();
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	clearStyles() {
		this.setState({
			tiles: this.state.tiles,
			styles: Array(16).fill(0),
			noBlank: this.state.noBlank,
			gameScore: this.state.gameScore
		});
	}

	pressLeft() {
		let tiles = this.state.tiles;
		let styles = this.state.styles;

		// Make adding tiles and move tiles left.
		for (let i=0; i<4; i++) {
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

		this.setState({
			tiles: tiles,
			styles: styles,
			noBlank: this.state.noBlank,
			gameScore: this.state.gameScore
		});
	}

	pressRight() {
		let tiles = this.state.tiles;
		let styles = this.state.styles;

		// Make adding tiles and move tiles right.
		for (let i=0; i<4; i++) {
			for (let j=3; j>=0; j--) {
				let index = (j*4) + i;
				if (tiles[index] !== 0) {
					for (let k=j-1; k>=0; k--) {
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

					for (let k=3; k>j; k--) {
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

		this.setState({
			tiles: tiles,
			styles: styles,
			noBlank: this.state.noBlank,
			gameScore: this.state.gameScore
		});
	}

	pressUp() {
		let tiles = this.state.tiles;
		let styles = this.state.styles;

		// Make adding tiles and move tiles left.
		for (let i=0; i<4; i++) {
			for (let j=0; j<4; j++) {
				let index = (i*4) + j;
				if (tiles[index] !== 0) {
					for (let k=j+1; k<4; k++) {
						let jndex = (i*4) + k;
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
						let jndex = (i*4) + k;
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
		
		this.setState({
			tiles: tiles,
			styles: styles,
			noBlank: this.state.noBlank,
			gameScore: this.state.gameScore
		});
	}

	pressDown() {
		let tiles = this.state.tiles;
		let styles = this.state.styles;

		// Make adding tiles and move tiles right.
		for (let i=0; i<4; i++) {
			for (let j=3; j>=0; j--) {
				let index = (i*4) + j;
				if (tiles[index] !== 0) {
					for (let k=j-1; k>=0; k--) {
						let jndex = (i*4) + k;
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

					for (let k=3; k>j; k--) {
						let jndex = (i*4) + k;
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

		this.setState({
			tiles: tiles,
			styles: styles,
			noBlank: this.state.noBlank,
			gameScore: this.state.gameScore
		});
	}

	handleKeyPress(event) {
		if (event.keyCode >= 37 && event.keyCode <= 40) {
			this.clearStyles();		// this have a little problem.
			switch (event.keyCode) {
				case 37:	// press left arrow key.
					this.pressLeft();
					break;
				case 38:	// press up arrow key.
					this.pressUp();
					break;
				case 39:	// press right arrow key.
					this.pressRight();
					break;
				case 40:	// press down arrow key.
					this.pressDown();
					break;
				default:
					break;
			}

			if (moveState) {
				this.createNewTile();
				moveState = false;
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
	findBlank() {
		const tiles = this.state.tiles;
		const blanks = extractBlank(tiles);
		const random = getRandomNum(blanks.length);

		if (random === -1) {
			return random;
		}

		return blanks[random];
	}

	createNewTile() {
		if (!this.state.noBlank) {
			const tiles = this.state.tiles;
			const styles = this.state.styles;
			let index = this.findBlank();
			let noBlank = this.state.noBlank;

			if (index === -1) {		// There in no blanks.
				noBlank = true;
			} else {
				tiles[index] = 2;
				styles[index] = 1;
			}

			this.setState({
				tiles: tiles,
				styles: styles,
				noBlank: noBlank,
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
					styles={this.state.styles}
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
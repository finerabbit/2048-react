import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Grid extends React.Component {
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
	render () {
		return (
			<div className="tile-container">
				<div className="tile tile-2 tile-position-1-1">
					<div className="tile-inner">2</div>
				</div>
				<div className="tile tile-4 tile-position-1-2">
					<div className="tile-inner">4</div>
				</div>
				<div className="tile tile-8 tile-position-1-3">
					<div className="tile-inner">8</div>
				</div>
				<div className="tile tile-16 tile-position-1-4">
					<div className="tile-inner">16</div>
				</div>
				<div className="tile tile-32 tile-position-2-1">
					<div className="tile-inner">32</div>
				</div>
				<div className="tile tile-2048 tile-position-2-2">
					<div className="tile-inner">64</div>
				</div>
				<div className="tile tile-1024 tile-position-2-3">
					<div className="tile-inner">1024</div>
				</div>
				<div className="tile tile-256 tile-position-2-4">
					<div className="tile-inner">256</div>
				</div>
				<div className="tile tile-2 tile-position-3-1">
					<div className="tile-inner">2</div>
				</div>
				<div className="tile tile-4 tile-position-3-2">
					<div className="tile-inner">4</div>
				</div>
				<div className="tile tile-8 tile-position-3-3">
					<div className="tile-inner">8</div>
				</div>
				<div className="tile tile-16 tile-position-3-4">
					<div className="tile-inner">16</div>
				</div>
				<div className="tile tile-32 tile-position-4-1">
					<div className="tile-inner">32</div>
				</div>
				<div className="tile tile-64 tile-position-4-2">
					<div className="tile-inner">64</div>
				</div>
				<div className="tile tile-128 tile-position-4-3">
					<div className="tile-inner">128</div>
				</div>
				<div className="tile tile-512 tile-position-4-4">
					<div className="tile-inner">512</div>
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className="game-container">
				<Grid />
				<Tile />
			</div>
		);
	}
}

class Container extends React.Component {
	render() {
		return (
			<div className="container">
				<Game />
			</div>
		);
	}
}

ReactDOM.render(
  <Container />,
	document.getElementById('root')
);
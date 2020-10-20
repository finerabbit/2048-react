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
	renderTile(i,value,style) {		// style 0 : normal, style 1 : new tile, style 2 : merged tile
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
		return (
			<div className="tile-container">
				{this.renderTile(0,1024)}
				{this.renderTile(1,2,1)}
				{this.renderTile(2,4)}
				{this.renderTile(3,16)}
				{this.renderTile(4,32)}
				{this.renderTile(5,64)}
				{this.renderTile(6,1024)}
				{this.renderTile(7,256)}
				{this.renderTile(8,2)}
				{this.renderTile(9,4)}
				{this.renderTile(10,2048)}
				{this.renderTile(11,8)}
				{this.renderTile(12,128)}
				{this.renderTile(13,512)}
				{this.renderTile(14,4096,2)}
				{this.renderTile(15,32)}
			</div>
		);
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className="game-container">
				<GridContainer />
				<TileContainer />
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
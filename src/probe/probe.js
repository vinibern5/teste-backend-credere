class Probe {
  constructor() {
    this.reset();
    this._limit = 5;
  }

  move() {
    let [x, y] = this._coordinates;

    // 0 - upper; 1 - right; 2 - bottom; 3 - left
    const orientation = this._orientation / 90;

    const moves = {
      0: () => y++,
      1: () => x++,
      2: () => y--,
      3: () => x--,
    };

    moves[orientation]();

    if (x < 0 || y < 0 || x >= this._limit || y >= this._limit) {
      throw new Error(`exceeded probe limits, [${x}, ${y}]`);
    } else {
      this._coordinates = [x, y];
    }
  }

  getOrientation() {
    return this._orientation;
  }

  getCoordinates() {
    return Array.from(this._coordinates);
  }

  rotateLeft() {
    this._orientation -= 90;
    this._orientation = this._orientation == -90 ? 270 : this._orientation;
  }

  rotateRight() {
    this._orientation += 90;
    this._orientation = this._orientation == 360 ? 0 : this._orientation;
  }

  reset() {
    this._orientation = 90;
    this._coordinates = [0, 0];
  }

  execute(commands) {
    const possibleCommands = {
      'ge': () => this.rotateLeft(),
      'gd': () => this.rotateRight(),
      'm': () => this.move()
    };

    commands.forEach(command => {
      command = command.toLowerCase();
      if (possibleCommands.hasOwnProperty(command)) {
        possibleCommands[command]();
      } else {
        throw Error('unrecognized command');
      }
    });
  }
}

module.exports = Probe;

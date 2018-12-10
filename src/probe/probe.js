
/**
 * Represents a probe, which can perform movements on a 5x5 grid.
 * It has an orientation, which is an angle, which can be: 0, 90, 180 or 270.
 * 0 -> oriented towards top, 90 -> right, 180 -> bottom, 270 -> left.
 *
 * The coordinates represent the absolute position of the probe on the grid,
 * it is in the form (x, y). Where 0 >= x >= 4 and 0 >= y >= 4.
 *
 * @class Probe
 */
class Probe {
  constructor() {
    this.reset();
    this._limit = 5;
  }

  /**
   * Moves the probe one unit in the grid, it will make the movement depending on its
   * orientation.
   * It can throw an error if the movement results in a position outside the limits of the grid.
   * An position outside the grid is any x or y that is less than 0 or more than 4.
   * @memberof Probe
   */
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

  /**
   * Returns the current orientation of the probe. Which is an angle.
   * It can be 0, 90, 180 or 270.
   * @returns an angle representing the orientation of the probe.
   * @memberof Probe
   */
  getOrientation() {
    return this._orientation;
  }

  /**
   * Returns the coordinates pair representing the position of the probe.
   * The coordinates are in a (x, y) format.
   * @returns An array with the current (x, y) coordinates of the probe.
   * @memberof Probe
   */
  getCoordinates() {
    return Array.from(this._coordinates);
  }

  /**
   * Rotates the probe 90 degrees to the left.
   * In case the current orientation is equals 0, it will become 270.
   * @memberof Probe
   */
  rotateLeft() {
    this._orientation -= 90;
    this._orientation = this._orientation == -90 ? 270 : this._orientation;
  }

  /**
   * Rotates the probe 90 degrees to the right.
   * In case the current orientation is equals 270, it will become 0.
   * @memberof Probe
   */
  rotateRight() {
    this._orientation += 90;
    this._orientation = this._orientation == 360 ? 0 : this._orientation;
  }

  /**
   * Returns the probe to the original position and orientation.
   * @memberof Probe
   */
  reset() {
    this._orientation = 90;
    this._coordinates = [0, 0];
  }

  /**
   * Runs an list of commands on the probe.
   * This method may throw an error if the command isn't recognized, or
   * if the command leaves the probe on an invalid position.
   * @param {Array} commands
   * @memberof Probe
   */
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
        throw Error(`unrecognized command: ${command}`);
      }
    });
  }
}

module.exports = Probe;

/* eslint-disable no-undef */
const expect = require('chai').expect;
const Probe = require('../../src/probe/probe.js');

describe('Probe', () => {
  let probe;
  beforeEach(() => {
    probe = new Probe();
  });

  describe('Initialization tests', () => {
    it('should initialize the probe on coordinates(0, 0)', () => {
      expect(probe.getCoordinates()).to.be.an('array');
      expect(probe.getCoordinates().length).to.be.equal(2);
      expect(probe.getCoordinates()).to.be.eql([0, 0]);
    });

    it('should initialize the probe on orientation => 90', () => {
      expect(probe.getOrientation()).to.be.a('number');
      expect(probe.getOrientation()).to.be.equal(90);
    });
  });

  describe('Rotate tests', () => {
    function rotateProbeRight(times) {
      for (let i = 0; i < times; i++) {
        probe.rotateRight();
      }
    }

    function rotateProbeLeft(times) {
      for (let i = 0; i < times; i++) {
        probe.rotateLeft();
      }
    }

    it('should set orientation to 180 after one rotation to the right', () => {
      rotateProbeRight(1);

      expect(probe.getOrientation()).to.be.equal(180);
    });

    it('should set orientation to 270 after two right rotations', () => {
      rotateProbeRight(2);

      expect(probe.getOrientation()).to.be.equal(270);
    });

    it('should set orientation to 0 after three right rotations', () => {
      rotateProbeRight(3);

      expect(probe.getOrientation()).to.be.equal(0);
    });

    it('should set the orientation to 0 after one rotation to the left', () => {
      rotateProbeLeft(1);

      expect(probe.getOrientation()).to.be.equal(0);
    });

    it('should set the orientation to 270 after two rotations to the left', () => {
      rotateProbeLeft(2);

      expect(probe.getOrientation()).to.be.equal(270);
    });

    it('should set the orientation to 180 after three rotation to the left', () => {
      rotateProbeLeft(3);

      expect(probe.getOrientation()).to.be.equal(180);
    });

    it('should set the orientation to 90 after one left and one right rotation', () => {
      rotateProbeLeft(1);
      rotateProbeRight(1);

      expect(probe.getOrientation()).to.be.equal(90);
    });

    it('should return to the original orientation after calling reset', () => {
      rotateProbeLeft(1);
      expect(probe.getOrientation()).to.be.equal(0);
      probe.reset();

      expect(probe.getOrientation()).to.be.equal(90);
    });
  });

  describe('Move tests', () => {
    function move(times) {
      for (let i = 0; i < times; i++) {
        probe.move();
      }
    }

    it('should move to [1, 0] in the original orientation', () => {
      move(1);
      expect(probe.getCoordinates()).to.be.eql([1, 0]);
    });

    it('should move to [0, 1] if the orientation is top', () => {
      probe.rotateLeft();
      move(1);
      expect(probe.getCoordinates()).to.be.eql([0, 1]);
    });

    it('should go to [4, 0], then come back to [0, 0]', () => {
      move(4);

      expect(probe.getCoordinates()).to.be.eql([4, 0]);

      probe.rotateRight();
      probe.rotateRight();

      move(4);
      expect(probe.getCoordinates()).to.be.eql([0, 0]);
    });

    it('should go to [0, 4], then come back to [0, 0]', () => {
      probe.rotateLeft();

      move(4);

      expect(probe.getCoordinates()).to.be.eql([0, 4]);

      probe.rotateRight();
      probe.rotateRight();

      move(4);

      expect(probe.getCoordinates()).to.be.eql([0, 0]);
    });

    it('should go to [0, 3], then to [2, 3], then to [2, 0], and then, [0, 0]', () => {
      probe.rotateLeft();

      move(3);

      expect(probe.getCoordinates()).to.be.eql([0, 3]);

      probe.rotateRight();

      move(2);

      expect(probe.getCoordinates()).to.be.eql([2, 3]);

      probe.rotateRight();

      move(3);

      expect(probe.getCoordinates()).to.be.eql([2, 0]);

      probe.rotateRight();

      move(2);

      expect(probe.getCoordinates()).to.be.eql([0, 0]);
    });

    it('should go to [0, 4], then [4, 4], then [4, 0], and then [0, 0]', () => {
      probe.rotateLeft();

      move(4);

      expect(probe.getCoordinates()).to.be.eql([0, 4]);

      probe.rotateRight();

      move(4);

      expect(probe.getCoordinates()).to.be.eql([4, 4]);

      probe.rotateRight();

      move(4);

      expect(probe.getCoordinates()).to.be.eql([4, 0]);

      probe.rotateRight();

      move(4);

      expect(probe.getCoordinates()).to.be.eql([0, 0]);
    });

    it('should throw an error when exceeding the limits', () => {
      // the probe is headed bottom
      probe.rotateRight();
      expect(() => probe.move()).to.throw('exceeded probe limits, [0, -1]');
      expect(probe.getCoordinates()).to.be.eql([0, 0]);

      probe.rotateLeft();
      move(4);
      expect(probe.getCoordinates()).to.be.eql([4, 0]);

      expect(() => probe.move()).to.throw('exceeded probe limits, [5, 0]');
      expect(probe.getCoordinates()).to.be.eql([4, 0]);
    });

    it('should return to the original position and orientation when calling reset', () => {
      probe.move();
      probe.rotateLeft();
      probe.reset();
      expect(probe.getCoordinates()).to.be.eql([0, 0]);
      expect(probe.getOrientation()).to.be.equal(90);
    });
  });

  describe('Commands tests', () => {
    it('should rotate left', () => {
      probe.execute(['ge']);
      expect(probe.getOrientation()).to.be.equal(0);
      expect(probe.getCoordinates()).to.be.eql([0, 0]);
    });

    it('should rotate right', () => {
      probe.execute(['gd']);
      expect(probe.getOrientation()).to.be.equal(180);
      expect(probe.getCoordinates()).to.be.eql([0, 0]);
    });

    it('should go to [4, 0]', () => {
      probe.execute(['m', 'm', 'm', 'm']);
      expect(probe.getCoordinates()).to.be.eql([4, 0]);
    });

    it('should go to [0, 4]', () => {
      probe.execute(['ge', 'm', 'm', 'm', 'm']);
      expect(probe.getOrientation()).to.be.equal(0);
      expect(probe.getCoordinates()).to.be.eql([0, 4]);
    });

    it('should accept uppercase and lowercase commands', () => {
      probe.execute(['GE', 'ge', 'gd', 'GD', 'm', 'M']);
      expect(probe.getOrientation()).to.be.equal(90);
      expect(probe.getCoordinates()).to.be.eql([2, 0]);
    });

    it('should go to [2, 3]', () => {
      probe.execute(['GE', 'M', 'M', 'M', 'GD', 'M', 'M']);
      expect(probe.getCoordinates()).to.be.eql([2, 3]);
    });

    it('should go to [1, 0]', () => {
      const commands = ['ge', 'm', 'm', 'm', 'm', 'gd', 'm', 'm',
        'm', 'm', 'gd', 'm', 'm', 'm', 'm', 'gd', 'm', 'm', 'm'];

      probe.execute(commands);
      expect(probe.getCoordinates()).to.be.eql([1, 0]);
    });

    it('should throw an error when it exceeds the probe limits', () => {
      const errorThunk = () => probe.execute(['gd', 'm']);

      expect(errorThunk).to.throw('exceeded probe limits, [0, -1]');
    });

    it('should throw an error when it executes an inexistent command', () => {
      const errorThunk = () => probe.execute(['x', 'y', 'z']);

      expect(errorThunk).to.throw('unrecognized command: x');
    });
  });
});

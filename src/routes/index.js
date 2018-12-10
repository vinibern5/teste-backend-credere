const router = require('express').Router();
const Probe = require('../probe/probe');

const probeInstance = new Probe();
const orientation = {
  0: 'top',
  90: 'right',
  180: 'bottom',
  270: 'left',
};

router.get('/position', (req, res) => {
  const response = {
    face: orientation[probeInstance.getOrientation()]
  };

  [response.x, response.y] = probeInstance.getCoordinates();

  res.status(200);
  res.json(response);
});

router.get('/reset', (req, res) => {
  probeInstance.reset();

  const response = {
    status: 'Success'
  };

  res.status(200);
  res.json(response);
});

router.post('/commands', (req, res) => {
  const commands = req.body.movements;
  const response = {};

  try {
    if (Array.isArray(commands)) {
      probeInstance.execute(commands);

      [response.x, response.y] = probeInstance.getCoordinates();

      res.status(200);
    } else {
      throw new Error('invalid request! Movements should be an array!');
    }
  } catch (err) {
    res.status(400);
    response.error = err.message;
  } finally {
    res.json(response);
  }
});

module.exports = router;

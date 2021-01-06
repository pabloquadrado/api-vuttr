const express = require('express');
const router = express.Router();

const ToolHandler = require('./Tool/Handler');

router.post('/tools', ToolHandler.create);
router.get('/tools', ToolHandler.get);
router.put('/tools/:id', ToolHandler.update);
router.delete('/tools/:id', ToolHandler.delete),

module.exports = router;
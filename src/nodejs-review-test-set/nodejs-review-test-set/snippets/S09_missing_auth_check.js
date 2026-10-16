const express = require('express');
const { requireRole } = require('../middleware/auth');

function buildAdminUserRouter(userService) {
  const router = express.Router();

  router.get('/:id', requireRole('ADMIN'), async (req, res) => {
    const user = await userService.findById(req.params.id);
    res.json(user);
  });

  router.delete('/:id', async (req, res) => {
    await userService.deleteById(req.params.id);
    res.status(204).end();
  });

  return router;
}

module.exports = buildAdminUserRouter;

/**
 * Sales Routes
 * GET /api/sales
 * GET /api/sales/:id
 * POST /api/sales
 * PUT /api/sales/:id
 * DELETE /api/sales/:id
 * GET /api/sales/metrics
 */

const express = require('express');
const salesController = require('../controllers/salesController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

/**
 * GET /api/sales/metrics
 * Get sales summary (must be before /:id)
 */
router.get('/metrics', salesController.getMetrics);

/**
 * GET /api/sales
 * Get all sales
 */
router.get('/', salesController.getSales);

/**
 * POST /api/sales
 * Create new sale
 */
router.post('/', salesController.createSale);

/**
 * GET /api/sales/:id
 * Get single sale
 */
router.get('/:id', salesController.getSaleById);

/**
 * PUT /api/sales/:id
 * Update sale
 */
router.put('/:id', salesController.updateSale);

/**
 * DELETE /api/sales/:id
 * Delete sale
 */
router.delete('/:id', salesController.deleteSale);

module.exports = router;

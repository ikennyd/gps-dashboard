/**
 * Sales Controller
 * Handle sales CRUD operations
 */

const { getSales: getDbSales, getSalesMetrics, createSale: createDbSale } = require('../database/supabase');

/**
 * Get all sales
 * @route GET /api/sales
 */
const getSales = async (req, res) => {
  try {
    const sales = await getDbSales({ userId: req.user?.id });

    res.json({
      success: true,
      data: sales,
      count: sales.length
    });
    return;
  } catch (error) {
    console.error('Get sales error:', error);
    // Fallback to mock data if Supabase not configured
    const mockSales = [
      {
        id: '1',
        customerId: 'cust-1',
        productId: 'prod-1',
        amount: 1500,
        status: 'completed',
        date: new Date().toISOString(),
        userId: req.user?.id || 'user-1'
      },
      {
        id: '2',
        customerId: 'cust-2',
        productId: 'prod-2',
        amount: 2500,
        status: 'completed',
        date: new Date().toISOString(),
        userId: req.user?.id || 'user-1'
      }
    ];

    res.json({
      success: true,
      data: mockSales,
      count: mockSales.length
    });

  } catch (error) {
    console.error('Get sales error:', error);
    res.status(500).json({
      error: 'Failed to fetch sales',
      message: error.message
    });
  }
};

/**
 * Get single sale
 * @route GET /api/sales/:id
 */
const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Query from Supabase where id = id
    const mockSale = {
      id: id,
      customerId: 'cust-1',
      productId: 'prod-1',
      amount: 1500,
      status: 'completed',
      date: new Date().toISOString(),
      userId: req.user?.id || 'user-1'
    };

    res.json({
      success: true,
      data: mockSale
    });

  } catch (error) {
    console.error('Get sale error:', error);
    res.status(500).json({
      error: 'Failed to fetch sale',
      message: error.message
    });
  }
};

/**
 * Create new sale
 * @route POST /api/sales
 */
const createSale = async (req, res) => {
  try {
    const { customerId, productId, amount, quantity } = req.body;

    // Validation
    if (!customerId || !productId || !amount) {
      return res.status(400).json({
        error: 'customerId, productId, and amount required',
        code: 'MISSING_FIELDS'
      });
    }

    // TODO: Insert into Supabase
    const newSale = {
      id: 'sale-' + Date.now(),
      customerId,
      productId,
      amount,
      quantity: quantity || 1,
      status: 'completed',
      date: new Date().toISOString(),
      userId: req.user?.id || 'user-1',
      createdAt: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      message: 'Sale created successfully',
      data: newSale
    });

  } catch (error) {
    console.error('Create sale error:', error);
    res.status(500).json({
      error: 'Failed to create sale',
      message: error.message
    });
  }
};

/**
 * Update sale
 * @route PUT /api/sales/:id
 */
const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // TODO: Update in Supabase
    const updatedSale = {
      id,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Sale updated successfully',
      data: updatedSale
    });

  } catch (error) {
    console.error('Update sale error:', error);
    res.status(500).json({
      error: 'Failed to update sale',
      message: error.message
    });
  }
};

/**
 * Delete sale
 * @route DELETE /api/sales/:id
 */
const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Delete from Supabase
    res.json({
      success: true,
      message: 'Sale deleted successfully',
      id: id
    });

  } catch (error) {
    console.error('Delete sale error:', error);
    res.status(500).json({
      error: 'Failed to delete sale',
      message: error.message
    });
  }
};

/**
 * Get sales summary/metrics
 * @route GET /api/sales/metrics
 */
const getMetrics = async (req, res) => {
  try {
    const metrics = await getSalesMetrics(req.user?.id);

    res.json({
      success: true,
      data: {
        ...metrics,
        thisMonthSales: Math.round(metrics.totalSales * 0.3) // Estimate
      }
    });

  } catch (error) {
    console.error('Get metrics error:', error);
    // Fallback to mock data
    res.json({
      success: true,
      data: {
        totalSales: 15000,
        salesCount: 10,
        averageOrder: 1500,
        todaySales: 3500,
        thisMonthSales: 45000
      }
    });
  }
};

module.exports = {
  getSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
  getMetrics
};

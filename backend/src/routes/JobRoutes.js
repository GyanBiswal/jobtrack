const express = require('express');
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getStats,
} = require('../controllers/JobController.js');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // every route below requires auth

router.get('/stats/summary', getStats);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;
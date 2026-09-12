const mongoose = require('mongoose');

const Job = require('../models/Job');

// GET /api/jobs?status=Applied&search=google
const getJobs = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const filter = { userId: req.userId };

    if (status && Job.STATUS_VALUES.includes(status)) {
      filter.status = status;
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [{ company: regex }, { role: regex }];
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ jobs });
  } catch (err) {
    next(err);
  }
};

// GET /api/jobs/:id
const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.userId });
    if (!job) {
      res.status(404);
      throw new Error('Job application not found');
    }
    res.status(200).json({ job });
  } catch (err) {
    next(err);
  }
};

// POST /api/jobs
const createJob = async (req, res, next) => {
  try {
    const { company, role, location, status, appliedDate, jobUrl, notes } = req.body;

    if (!company || !role) {
      res.status(400);
      throw new Error('Company and role are required');
    }

    const job = await Job.create({
      userId: req.userId,
      company,
      role,
      location,
      status,
      appliedDate,
      jobUrl,
      notes,
    });

    res.status(201).json({ job });
  } catch (err) {
    next(err);
  }
};

// PUT /api/jobs/:id
const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.userId });
    if (!job) {
      res.status(404);
      throw new Error('Job application not found');
    }

    const fields = ['company', 'role', 'location', 'status', 'appliedDate', 'jobUrl', 'notes'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        job[field] = req.body[field];
      }
    });

    await job.save();
    res.status(200).json({ job });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/jobs/:id
const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!job) {
      res.status(404);
      throw new Error('Job application not found');
    }
    res.status(200).json({ message: 'Job application deleted', id: req.params.id });
  } catch (err) {
    next(err);
  }
};

// GET /api/jobs/stats/summary
const getStats = async (req, res, next) => {
  try {
    const counts = await Job.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(req.userId) } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const summary = Job.STATUS_VALUES.reduce((acc, status) => {
      acc[status] = 0;
      return acc;
    }, {});

    counts.forEach(({ _id, count }) => {
      summary[_id] = count;
    });

    const total = Object.values(summary).reduce((sum, c) => sum + c, 0);

    res.status(200).json({ total, byStatus: summary });
  } catch (err) {
    next(err);
  }
};

module.exports = { getJobs, getJobById, createJob, updateJob, deleteJob, getStats };
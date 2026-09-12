const mongoose = require('mongoose');

const STATUS_VALUES = ['Wishlist', 'Applied', 'OA', 'Interview', 'Offer', 'Rejected'];

const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    company: {
      type: String,
      required: [true, 'Company is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: STATUS_VALUES,
      default: 'Wishlist',
    },
    appliedDate: {
      type: Date,
      default: null,
    },
    jobUrl: {
      type: String,
      trim: true,
      default: '',
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

jobSchema.statics.STATUS_VALUES = STATUS_VALUES;

module.exports = mongoose.model('Job', jobSchema);
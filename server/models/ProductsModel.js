import mongoose from 'mongoose'

const productsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  waste: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  concentration: {
    type: Number,
    required: true,
  },
  normative: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  gas_dust_flow_rate: {
    type: Number,
    required: true,
  },
  language: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  calculateA: {
    result: {
      type: Number,
      default: null,
    },
  },
  calculateB: {
    result: {
      type: Number,
      default: null,
    },
  },
  calculateC: {
    result: {
      type: Number,
      default: null,
    },
  },
  calculateD: {
    result: {
      type: Number,
      default: null,
    },
  },
  calculateE: {
    result: {
      type: Number,
      default: null,
    },
  },
},
  {
    timestamps: true,
  }
);
export default mongoose.model("Products", productsSchema);


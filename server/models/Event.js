const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    seats: {
      type: Number,
      default: 100,
    },

    registeredCount: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1511578314322-379afb476865",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
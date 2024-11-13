import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const profileModel = new Schema(
  {
    platformCharge: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

export default models.AdminProfile ?? model("AdminProfile", profileModel);

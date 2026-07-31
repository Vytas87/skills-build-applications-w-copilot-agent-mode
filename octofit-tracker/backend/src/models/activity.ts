import { InferSchemaType, Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    type: {
      type: String,
      enum: ['run', 'cycle', 'swim', 'strength', 'yoga', 'walk', 'hiit'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 5 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0, default: 0 },
    performedAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

const Activity = model('Activity', activitySchema);

export default Activity;
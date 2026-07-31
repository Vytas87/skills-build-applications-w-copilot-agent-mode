import { InferSchemaType, Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const leaderboardSchema = new Schema(
  {
    period: { type: String, enum: ['weekly', 'monthly'], required: true },
    metric: { type: String, enum: ['calories', 'minutes', 'distance'], required: true },
    entries: { type: [leaderboardEntrySchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;
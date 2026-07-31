import { InferSchemaType, Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    title: { type: String, required: true, trim: true },
    category: { type: String, enum: ['strength', 'cardio', 'mobility', 'recovery'], required: true },
    intensity: { type: String, enum: ['low', 'medium', 'high'], required: true },
    durationMinutes: { type: Number, required: true, min: 10 },
    equipment: [{ type: String, trim: true }],
    focusAreas: [{ type: String, trim: true }],
    recommendedForFitnessLevels: [
      {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
      },
    ],
    isTemplate: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

const Workout = model('Workout', workoutSchema);

export default Workout;
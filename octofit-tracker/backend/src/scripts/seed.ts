import mongoose from 'mongoose';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Team from '../models/team';
import User from '../models/user';
import Workout from '../models/workout';

const connectionString = 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Martinez',
        email: 'ava.martinez@octofit.dev',
        age: 29,
        fitnessLevel: 'intermediate',
        goals: ['Improve 10K pace', 'Build lower body strength'],
      },
      {
        name: 'Noah Kim',
        email: 'noah.kim@octofit.dev',
        age: 34,
        fitnessLevel: 'advanced',
        goals: ['Complete a sprint triathlon', 'Maintain weekly consistency'],
      },
      {
        name: 'Mia Johnson',
        email: 'mia.johnson@octofit.dev',
        age: 26,
        fitnessLevel: 'beginner',
        goals: ['Lose 5kg', 'Build a sustainable routine'],
      },
      {
        name: 'Liam Patel',
        email: 'liam.patel@octofit.dev',
        age: 31,
        fitnessLevel: 'intermediate',
        goals: ['Increase VO2 max', 'Hit 8,000 weekly activity points'],
      },
    ]);

    const [ava, noah, mia, liam] = users;

    const teams = await Team.insertMany([
      {
        name: 'Sunrise Striders',
        city: 'Austin',
        weeklyGoalMinutes: 320,
        members: [ava._id, mia._id],
      },
      {
        name: 'Iron Pulse',
        city: 'Seattle',
        weeklyGoalMinutes: 420,
        members: [noah._id, liam._id],
      },
    ]);

    const [sunriseStriders, ironPulse] = teams;

    await User.updateMany(
      { _id: { $in: [ava._id, mia._id] } },
      { $set: { team: sunriseStriders._id } }
    );

    await User.updateMany(
      { _id: { $in: [noah._id, liam._id] } },
      { $set: { team: ironPulse._id } }
    );

    const now = new Date();
    const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    await Activity.insertMany([
      {
        user: ava._id,
        team: sunriseStriders._id,
        type: 'run',
        durationMinutes: 48,
        caloriesBurned: 430,
        distanceKm: 8.7,
        performedAt: daysAgo(1),
      },
      {
        user: ava._id,
        team: sunriseStriders._id,
        type: 'strength',
        durationMinutes: 42,
        caloriesBurned: 300,
        distanceKm: 0,
        performedAt: daysAgo(3),
      },
      {
        user: noah._id,
        team: ironPulse._id,
        type: 'cycle',
        durationMinutes: 65,
        caloriesBurned: 690,
        distanceKm: 23.4,
        performedAt: daysAgo(2),
      },
      {
        user: mia._id,
        team: sunriseStriders._id,
        type: 'walk',
        durationMinutes: 36,
        caloriesBurned: 180,
        distanceKm: 3.1,
        performedAt: daysAgo(1),
      },
      {
        user: liam._id,
        team: ironPulse._id,
        type: 'hiit',
        durationMinutes: 30,
        caloriesBurned: 360,
        distanceKm: 0,
        performedAt: daysAgo(4),
      },
      {
        user: noah._id,
        team: ironPulse._id,
        type: 'swim',
        durationMinutes: 40,
        caloriesBurned: 410,
        distanceKm: 1.5,
        performedAt: daysAgo(5),
      },
    ]);

    await Leaderboard.insertMany([
      {
        period: 'weekly',
        metric: 'calories',
        entries: [
          { user: noah._id, score: 1100, rank: 1 },
          { user: ava._id, score: 930, rank: 2 },
          { user: liam._id, score: 810, rank: 3 },
          { user: mia._id, score: 560, rank: 4 },
        ],
      },
      {
        period: 'monthly',
        metric: 'distance',
        entries: [
          { user: noah._id, score: 92, rank: 1 },
          { user: ava._id, score: 74, rank: 2 },
          { user: liam._id, score: 58, rank: 3 },
          { user: mia._id, score: 31, rank: 4 },
        ],
      },
    ]);

    await Workout.insertMany([
      {
        user: ava._id,
        title: 'Tempo Run + Core Finisher',
        category: 'cardio',
        intensity: 'high',
        durationMinutes: 50,
        equipment: ['Running shoes', 'Yoga mat'],
        focusAreas: ['Endurance', 'Core'],
        recommendedForFitnessLevels: ['intermediate', 'advanced'],
        isTemplate: false,
      },
      {
        user: mia._id,
        title: 'Beginner Mobility Reset',
        category: 'mobility',
        intensity: 'low',
        durationMinutes: 25,
        equipment: ['Resistance band'],
        focusAreas: ['Hips', 'Thoracic spine'],
        recommendedForFitnessLevels: ['beginner'],
        isTemplate: false,
      },
      {
        title: 'Full Body Strength Circuit',
        category: 'strength',
        intensity: 'medium',
        durationMinutes: 40,
        equipment: ['Dumbbells', 'Bench'],
        focusAreas: ['Legs', 'Back', 'Shoulders'],
        recommendedForFitnessLevels: ['beginner', 'intermediate'],
        isTemplate: true,
      },
      {
        title: 'Zone 2 Endurance Ride',
        category: 'cardio',
        intensity: 'medium',
        durationMinutes: 60,
        equipment: ['Bike', 'Heart rate monitor'],
        focusAreas: ['Aerobic base'],
        recommendedForFitnessLevels: ['intermediate', 'advanced'],
        isTemplate: true,
      },
      {
        title: 'Recovery Flow',
        category: 'recovery',
        intensity: 'low',
        durationMinutes: 20,
        equipment: ['Yoga mat', 'Foam roller'],
        focusAreas: ['Mobility', 'Breathing'],
        recommendedForFitnessLevels: ['beginner', 'intermediate', 'advanced'],
        isTemplate: true,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

"use strict";
/**
 * Seed script for octofit_db database
 * Seed the octofit_db database with test data
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Workout_1 = require("../models/Workout");
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function seedDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose_1.default.connect(MONGO_URI);
        console.log('Connected to octofit_db');
        // Clear existing data
        console.log('Clearing existing data...');
        await User_1.User.deleteMany({});
        await Team_1.Team.deleteMany({});
        await Activity_1.Activity.deleteMany({});
        await Leaderboard_1.Leaderboard.deleteMany({});
        await Workout_1.Workout.deleteMany({});
        // Create sample users
        console.log('Creating sample users...');
        const users = await User_1.User.create([
            {
                username: 'alice_fitness',
                email: 'alice@example.com',
                name: 'Alice Johnson',
                profilePicture: 'https://api.example.com/avatars/alice.jpg',
            },
            {
                username: 'bob_runner',
                email: 'bob@example.com',
                name: 'Bob Smith',
                profilePicture: 'https://api.example.com/avatars/bob.jpg',
            },
            {
                username: 'charlie_trainer',
                email: 'charlie@example.com',
                name: 'Charlie Brown',
                profilePicture: 'https://api.example.com/avatars/charlie.jpg',
            },
            {
                username: 'diana_yogi',
                email: 'diana@example.com',
                name: 'Diana Prince',
                profilePicture: 'https://api.example.com/avatars/diana.jpg',
            },
            {
                username: 'evan_cyclist',
                email: 'evan@example.com',
                name: 'Evan Davis',
                profilePicture: 'https://api.example.com/avatars/evan.jpg',
            },
        ]);
        // Create sample teams
        console.log('Creating sample teams...');
        const teams = await Team_1.Team.create([
            {
                name: 'Morning Warriors',
                description: 'Team for early morning fitness enthusiasts',
                members: [users[0]._id, users[1]._id],
                totalPoints: 0,
            },
            {
                name: 'Evening Marathoners',
                description: 'Team for evening runners and cyclists',
                members: [users[2]._id, users[3]._id, users[4]._id],
                totalPoints: 0,
            },
        ]);
        // Create sample activities
        console.log('Creating sample activities...');
        const activities = await Activity_1.Activity.create([
            {
                userId: users[0]._id,
                type: 'running',
                duration: 30,
                distance: 5.2,
                calories: 350,
                date: new Date('2026-08-15T07:00:00'),
                points: 100,
            },
            {
                userId: users[0]._id,
                type: 'yoga',
                duration: 45,
                calories: 200,
                date: new Date('2026-08-14T07:00:00'),
                points: 75,
            },
            {
                userId: users[1]._id,
                type: 'cycling',
                duration: 60,
                distance: 25,
                calories: 500,
                date: new Date('2026-08-15T18:00:00'),
                points: 150,
            },
            {
                userId: users[2]._id,
                type: 'weight_training',
                duration: 50,
                calories: 400,
                date: new Date('2026-08-15T17:00:00'),
                points: 120,
            },
            {
                userId: users[3]._id,
                type: 'yoga',
                duration: 60,
                calories: 250,
                date: new Date('2026-08-15T18:30:00'),
                points: 90,
            },
            {
                userId: users[4]._id,
                type: 'cycling',
                duration: 90,
                distance: 40,
                calories: 700,
                date: new Date('2026-08-15T19:00:00'),
                points: 200,
            },
        ]);
        // Create leaderboard entries
        console.log('Creating leaderboard entries...');
        const leaderboardEntries = await Leaderboard_1.Leaderboard.create([
            {
                userId: users[4]._id,
                teamId: teams[1]._id,
                rank: 1,
                totalPoints: 200,
                activityCount: 1,
            },
            {
                userId: users[1]._id,
                teamId: teams[0]._id,
                rank: 2,
                totalPoints: 150,
                activityCount: 1,
            },
            {
                userId: users[2]._id,
                teamId: teams[1]._id,
                rank: 3,
                totalPoints: 120,
                activityCount: 1,
            },
            {
                userId: users[0]._id,
                teamId: teams[0]._id,
                rank: 4,
                totalPoints: 175,
                activityCount: 2,
            },
            {
                userId: users[3]._id,
                teamId: teams[1]._id,
                rank: 5,
                totalPoints: 90,
                activityCount: 1,
            },
        ]);
        // Create sample workouts
        console.log('Creating sample workouts...');
        const workouts = await Workout_1.Workout.create([
            {
                userId: users[0]._id,
                title: 'Morning Run Routine',
                description: 'A refreshing morning run to start the day',
                type: 'running',
                duration: 30,
                difficulty: 'medium',
                exercises: ['warm-up', 'steady-pace running', 'cool-down stretching'],
            },
            {
                userId: users[2]._id,
                title: 'Full Body Strength',
                description: 'Complete strength training session',
                type: 'weight_training',
                duration: 60,
                difficulty: 'hard',
                exercises: ['squats', 'bench press', 'deadlifts', 'rows'],
            },
            {
                userId: users[3]._id,
                title: 'Relaxing Yoga Flow',
                description: 'Gentle yoga for flexibility and relaxation',
                type: 'yoga',
                duration: 45,
                difficulty: 'easy',
                exercises: ['sun salutation', 'warrior poses', 'child pose', 'savasana'],
            },
            {
                userId: users[1]._id,
                title: 'Mountain Bike Adventure',
                description: 'Outdoor cycling through scenic trails',
                type: 'cycling',
                duration: 90,
                difficulty: 'hard',
                exercises: ['hill climbs', 'technical descents', 'endurance riding'],
            },
        ]);
        // Update team total points
        await Team_1.Team.updateOne({ _id: teams[0]._id }, { totalPoints: 325 });
        await Team_1.Team.updateOne({ _id: teams[1]._id }, { totalPoints: 560 });
        console.log('✅ Database seeded successfully!');
        console.log(`  - Created ${users.length} users`);
        console.log(`  - Created ${teams.length} teams`);
        console.log(`  - Created ${activities.length} activities`);
        console.log(`  - Created ${leaderboardEntries.length} leaderboard entries`);
        console.log(`  - Created ${workouts.length} workouts`);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
//# sourceMappingURL=seed.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const api_1 = require("./config/api");
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
const PORT = 8000;
// MongoDB Connection URI
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Connect to MongoDB
mongoose_1.default.connect(MONGO_URI, {
    retryWrites: true,
    w: 'majority',
})
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'Server is running',
        port: PORT,
        apiUrl: (0, api_1.getApiUrl)(),
        config: (0, api_1.getApiConfig)(),
    });
});
// Route handlers
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
// Start server
app.listen(PORT, () => {
    const apiUrl = (0, api_1.getApiUrl)();
    const config = (0, api_1.getApiConfig)();
    console.log(`\n🚀 OctoFit Tracker API Server`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`Environment: ${config.environment}`);
    console.log(`API URL: ${apiUrl}`);
    console.log(`Port: ${PORT}`);
    if (config.isCodespaces) {
        console.log(`Codespace: ${config.codespaceName}`);
    }
    console.log(`MongoDB: ${MONGO_URI}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});
//# sourceMappingURL=index.js.map
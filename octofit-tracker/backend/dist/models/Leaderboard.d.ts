import mongoose, { Document } from 'mongoose';
export interface ILeaderboard extends Document {
    userId: mongoose.Types.ObjectId;
    teamId?: mongoose.Types.ObjectId;
    rank: number;
    totalPoints: number;
    activityCount: number;
    lastUpdated: Date;
}
export declare const Leaderboard: mongoose.Model<ILeaderboard, {}, {}, {}, Document<unknown, {}, ILeaderboard, {}, mongoose.DefaultSchemaOptions> & ILeaderboard & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILeaderboard>;
//# sourceMappingURL=Leaderboard.d.ts.map
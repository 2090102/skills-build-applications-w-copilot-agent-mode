import mongoose, { Document } from 'mongoose';
export interface IActivity extends Document {
    userId: mongoose.Types.ObjectId;
    type: string;
    duration: number;
    distance?: number;
    calories: number;
    date: Date;
    points: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Activity: mongoose.Model<IActivity, {}, {}, {}, Document<unknown, {}, IActivity, {}, mongoose.DefaultSchemaOptions> & IActivity & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IActivity>;
//# sourceMappingURL=Activity.d.ts.map
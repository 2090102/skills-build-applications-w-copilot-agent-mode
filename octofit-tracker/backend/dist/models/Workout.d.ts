import mongoose, { Document } from 'mongoose';
export interface IWorkout extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    type: string;
    duration: number;
    difficulty: string;
    exercises: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const Workout: mongoose.Model<IWorkout, {}, {}, {}, Document<unknown, {}, IWorkout, {}, mongoose.DefaultSchemaOptions> & IWorkout & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWorkout>;
//# sourceMappingURL=Workout.d.ts.map
import mongoose, { Schema, Document } from 'mongoose';

export interface ISalesRecord extends Document {
  id: string;
  date: Date;
  region: string;
  category: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  customerName: string;
  status: string;
}

const salesSchema = new Schema<ISalesRecord>({
  id: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  region: {
    type: String,
    enum: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa'],
    required: true,
  },
  category: {
    type: String,
    enum: ['Electronics', 'Clothing', 'Food & Beverage', 'Home & Garden', 'Sports'],
    required: true,
  },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  totalAmount: { type: Number, required: true, min: 0 },
  customerName: { type: String, required: true },
  status: {
    type: String,
    enum: ['Completed', 'Pending', 'Cancelled'],
    default: 'Completed',
  },
});

export const Sales = mongoose.model<ISalesRecord>('Sales', salesSchema);

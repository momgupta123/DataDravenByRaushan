import { Response } from 'express';
import { Sales } from '../models/Sales.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

// Store mock data in memory to avoid regenerating each time
let mockSalesData: any[] | null = null;

export const getSales = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    // Simulate 800ms delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulate ~10% failure rate
    if (Math.random() < 0.1) {
      res.status(500).json({ message: 'Temporary server error. Please try again.' });
      return;
    }

    // Return mock data
    if (!mockSalesData) {
      // Get mock data from database or generate if empty
      let salesRecords = await Sales.find().limit(1000);
      
      if (salesRecords.length === 0) {
        // Database is empty, return empty array
        mockSalesData = [];
      } else {
        mockSalesData = salesRecords;
      }
    }

    res.status(200).json({
      message: 'Sales data retrieved successfully',
      data: mockSalesData,
      total: mockSalesData.length,
    });
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ message: 'Error fetching sales data', error });
  }
};

export const seedSalesData = async (): Promise<void> => {
  try {
    const existingCount = await Sales.countDocuments();
    if (existingCount > 0) {
      console.log(`Sales database already has ${existingCount} records`);
      mockSalesData = await Sales.find().limit(1000);
      return;
    }

    console.log('Seeding sales data...');
    const { faker } = await import('@faker-js/faker');
    
    const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa'];
    const categories = ['Electronics', 'Clothing', 'Food & Beverage', 'Home & Garden', 'Sports'];
    const statuses = ['Completed', 'Pending', 'Cancelled'];
    
    const salesRecords = Array.from({ length: 1000 }, (_, index) => ({
      id: `SALE-${String(index + 1).padStart(6, '0')}`,
      date: faker.date.past({ years: 1 }),
      region: faker.helpers.arrayElement(regions),
      category: faker.helpers.arrayElement(categories),
      productName: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 50 }),
      unitPrice: parseFloat(faker.commerce.price()),
      totalAmount: 0, // Will be calculated
      customerName: faker.person.fullName(),
      status: faker.helpers.arrayElement(statuses),
    }));

    // Calculate total amounts
    salesRecords.forEach((record: any) => {
      record.totalAmount = record.quantity * record.unitPrice;
    });

    await Sales.insertMany(salesRecords);
    mockSalesData = salesRecords;
    console.log('Sales data seeded successfully');
  } catch (error) {
    console.error('Error seeding sales data:', error);
  }
};

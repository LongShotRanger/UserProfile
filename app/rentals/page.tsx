'use client';

import { rentalHistory as rawRentalHistory } from '../../lib/mockData';
import { z } from 'zod';


// Define Zod schemas for the data
const itemSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  price_per_unit: z.number(),
});

const rentalSchema = z.object({
  order_id: z.string(),
  items: z.array(itemSchema),
  rental_start_date: z.string().refine(date => !isNaN(Date.parse(date)), { message: 'Invalid date' }),
  rental_end_date: z.string().refine(date => !isNaN(Date.parse(date)), { message: 'Invalid date' }),
  total_price: z.number(),
  status: z.enum(['Confirmed', 'Completed', 'Cancelled']),
});

// Validate the whole rental history array
const rentalHistorySchema = z.array(rentalSchema);

const parseResult = rentalHistorySchema.safeParse(rawRentalHistory);

if (!parseResult.success) {
  // If validation fails, log the error and render an error UI or fallback
  console.error('Rental history validation error:', parseResult.error);
}

const rentalHistory = parseResult.success ? parseResult.data : [];

export default function RentalHistoryPage() {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white dark:bg-gray-900 shadow rounded text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">Rental History</h1>

      {rentalHistory.length === 0 ? (
        <p>No past rentals found.</p>
      ) : (
        <div className="space-y-4">
          {rentalHistory.map((rental) => (
            <div key={rental.order_id} className="border rounded p-4 bg-gray-50 dark:bg-gray-800">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg">Order ID: {rental.order_id}</h2>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    rental.status === 'Completed'
                      ? 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100'
                      : rental.status === 'Confirmed'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100'
                      : 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100'
                  }`}
                >
                  {rental.status}
                </span>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>
                  {formatDate(rental.rental_start_date)} – {formatDate(rental.rental_end_date)}
                </span>
              </div>

              <ul className="list-disc ml-5 mb-2">
                {rental.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.quantity} — ₹{item.price_per_unit} each
                  </li>
                ))}
              </ul>

              <div className="font-semibold">Total: ₹{rental.total_price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

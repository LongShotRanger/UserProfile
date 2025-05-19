'use client';

import { rentalHistory as rawRentalHistory } from '../../lib/mockData';
import { z } from 'zod';

const itemSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  price_per_unit: z.number(),
  image: z.string().optional(),
});

const rentalSchema = z.object({
  order_id: z.string(),
  items: z.array(itemSchema),
  rental_start_date: z.string().refine(date => !isNaN(Date.parse(date)), { message: 'Invalid date' }),
  rental_end_date: z.string().refine(date => !isNaN(Date.parse(date)), { message: 'Invalid date' }),
  total_price: z.number(),
  status: z.enum(['Confirmed', 'Completed', 'Cancelled']),
});

const rentalHistorySchema = z.array(rentalSchema);
const parseResult = rentalHistorySchema.safeParse(rawRentalHistory);
if (!parseResult.success) {
  console.error('Rental history validation error:', parseResult.error);
}
const rentalHistory = parseResult.success ? parseResult.data : [];

export default function RentalHistoryPage() {
  return (
    <div className="max-w-5xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 py-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">Rental History</h1>

      {rentalHistory.length === 0 ? (
        <p>No past rentals found.</p>
      ) : (
        <div className="space-y-8">
          {rentalHistory.map((rental) => (
            <div
              key={rental.order_id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 border border-gray-200 dark:border-gray-700"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <div>
                  <h2 className="text-lg font-semibold">Order ID: <span className="font-mono">{rental.order_id}</span></h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    🗓 {formatDate(rental.rental_start_date)} – {formatDate(rental.rental_end_date)}
                  </p>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${
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

              {/* Items Table (Responsive) */}
              <div>
                {/* Table visible on sm+ */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-sm border-collapse min-w-[600px]">
                    <thead>
                      <tr className="text-left bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-600">
                        <th className="py-2 px-3">S. No.</th>
                        <th className="py-2 px-3">Image</th>
                        <th className="py-2 px-3">Item</th>
                        <th className="py-2 px-3">Qty</th>
                        <th className="py-2 px-3">Unit Price</th>
                        <th className="py-2 px-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rental.items.map((item, idx) => (
                        <tr key={idx} className="border-b dark:border-gray-700">
                          <td className="py-2 px-3">{idx + 1}</td>
                          <td className="py-2 px-3">
                            <img
                              src={item.image || 'https://via.placeholder.com/40'}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          </td>
                          <td className="py-2 px-3">{item.name}</td>
                          <td className="py-2 px-3">{item.quantity}</td>
                          <td className="py-2 px-3">₹{item.price_per_unit}</td>
                          <td className="py-2 px-3">₹{item.quantity * item.price_per_unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile list view */}
                <div className="sm:hidden space-y-4">
                  {rental.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-3 shadow"
                    >
                      <div className="flex-shrink-0 mr-3">
                        <img
                          src={item.image || 'https://via.placeholder.com/40'}
                          alt={item.name}
                          className="w-14 h-14 rounded object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Qty: <span className="font-medium">{item.quantity}</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Unit Price: <span className="font-medium">₹{item.price_per_unit}</span>
                        </p>
                        <p className="text-sm font-semibold mt-1">
                          Total: ₹{item.quantity * item.price_per_unit}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="mt-4 font-semibold text-left sm:text-right">
                Grand Total: ₹{rental.total_price}
              </div>
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

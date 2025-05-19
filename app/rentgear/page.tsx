'use client';

import { trekDetails } from '../../lib/mockData';
import { rentalGears } from '../../lib/rentalGear';

export default function RentGearPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Trek Details</h1>
        <h2 className="text-xl font-semibold mb-2">Upcoming Trek</h2>
        <p className="text-2xl font-semibold mb-4">{trekDetails.name}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base">
          <div>
            <span className="font-semibold">Dates:</span><br />
            {trekDetails.dates}
          </div>
          <div>
            <span className="font-semibold">Rental Period:</span><br />
            {trekDetails.rentalPeriod}
          </div>
          <div>
            <span className="font-semibold">Pickup:</span><br />
            {trekDetails.pickup}
          </div>
          <div>
            <span className="font-semibold">Dropoff:</span><br />
            {trekDetails.dropoff}
          </div>
        </div>
      </div>

      {/* Rental Gear Cards */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Rental Gears</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rentalGears.map((gear) => (
            <button
              key={gear.id}
              className="text-left transform transition duration-300 hover:scale-[0.98] hover:shadow-lg focus:outline-none border rounded-lg overflow-hidden bg-white dark:bg-gray-800"
              onClick={() => alert(`Clicked on ${gear.name}`)}
            >
              <img
                src={gear.image}
                alt={gear.name}
                className="w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{gear.name}</h3>
                <p className="text-indigo-700 font-semibold">₹{gear.price} / day</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

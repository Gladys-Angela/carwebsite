import React, { useEffect, useState } from 'react';
import { getCars, createCar, updateCar, deleteCar } from '../../services/adminService';
import { Car } from '../../types';

const CarsPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await getCars();
      setCars(response.cars);
    };
    fetchCars();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Cars</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Make</th>
            <th className="py-2">Model</th>
            <th className="py-2">Year</th>
            <th className="py-2">Price</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car._id}>
              <td className="border px-4 py-2">{car.make}</td>
              <td className="border px-4 py-2">{car.model}</td>
              <td className="border px-4 py-2">{car.year}</td>
              <td className="border px-4 py-2">{car.price}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarsPage;
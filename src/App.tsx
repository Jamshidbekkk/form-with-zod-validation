import React, { useState } from 'react';
import { z } from 'zod';

// Define a Zod schema for form validation
const schema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  subscribe: z.boolean(),
  gender: z.enum(['male', 'female']),
});

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    subscribe: false,
    gender: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      schema.parse(formData);
      console.log('Form Data:', formData);
      // You can add your form submission logic here
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Extract validation errors
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
      <form onSubmit={handleSubmit} className="space-y-6 w-[400px]">
        <div>
          <label htmlFor="name" className="block text-2xl font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm p-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.name ? 'border-red-500' : ''
            }`}
            required
          />
          {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-2xl font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm p-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.email ? 'border-red-500' : ''
            }`}
            required
          />
          {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-2xl font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm p-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.password ? 'border-red-500' : ''
            }`}
            required
          />
          {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
        </div>
        <div>
          <div className="flex items-start">
            <div className="flex items-center h-8">
              <input
                id="subscribe"
                name="subscribe"
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                checked={formData.subscribe}
                onChange={handleChange}
              />
            </div>
            <div className="ml-3 text-xl">
              <label htmlFor="subscribe" className="font-medium text-gray-700">
                Subscribe to newsletter
              </label>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xl font-medium text-gray-700">Gender</p>
          <div className="mt-1 flex items-center">
            <input
              id="male"
              name="gender"
              type="radio"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
            />
            <label htmlFor="male" className="ml-3">
              Male
            </label>
            <input
              id="female"
              name="gender"
              type="radio"
              className="ml-6 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            />
            <label htmlFor="female" className="ml-3">
              Female
            </label>
          </div>
          {errors.gender && <p className="mt-2 text-sm text-red-600">{errors.gender}</p>}
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;

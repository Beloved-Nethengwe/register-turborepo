'use client';
import { useState } from 'react';

interface UserData {
  username: string;
  surname: string;
  idnumber: string;
  currentdate: string; 
}

const UserForm = () => {
  const [formData, setFormData] = useState<UserData>({
    username: '',
    surname: '',
    idnumber: '',
    currentdate: '',
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    // Set the current date
    const date = new Date();
    date.setDate(date.getDate() + 1); // Adds one day to the current date
    const currentdate = date.toISOString().split('T')[0];

    const dataToSave = { ...formData, currentdate };

    try {
      // Send the form data to your API route to insert into the database
      const response = await fetch('/api/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        alert('User added successfully!');
        // Clear the form
        setFormData({
          username: '',
          surname: '',
          idnumber: '',
          currentdate: '',
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to add user, Because the user has already signed in for today');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('An error occurred while submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ui-max-w-lg ui-mx-auto ui-mt-10">
      <form onSubmit={handleSubmit} className="ui-space-y-4 ui-p-6 ui-bg-gray-100 ui-border ui-border-gray-300 ui-rounded-lg ui-shadow-lg ui-max-w-lg ui-mx-auto ui-mt-10">
        <h2 className="ui-text-xl ui-font-bold ui-text-gray-700 ui-mb-4 ui-text-left">
          User Registration Form - {new Date().toLocaleDateString()}
        </h2>

        {error && <p className="ui-text-red-600">{error}</p>}

        <div className="ui-mb-4">
          <label htmlFor="username" className="ui-block ui-text-sm ui-font-medium ui-text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="ui-mt-1 ui-block ui-w-full ui-px-3 ui-py-2 ui-border ui-border-gray-300 ui-rounded-md ui-shadow-sm ui-focus:outline-none ui-focus:ring-blue-500 ui-focus:border-blue-500 ui-sm:text-sm"
            required
          />
        </div>

        <div className="ui-mb-4">
          <label htmlFor="surname" className="ui-block ui-text-sm ui-font-medium ui-text-gray-700">
            Surname
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="ui-mt-1 ui-block ui-w-full ui-px-3 ui-py-2 ui-border ui-border-gray-300 ui-rounded-md ui-shadow-sm ui-focus:outline-none ui-focus:ring-blue-500 ui-focus:border-blue-500 ui-sm:text-sm"
            required
          />
        </div>

        <div className="ui-mb-4">
          <label htmlFor="id" className="ui-block ui-text-sm ui-font-medium ui-text-gray-700">
            ID
          </label>
          <input
            type="text"
            id="idnumber"
            name="idnumber"
            value={formData.idnumber}
            onChange={handleChange}
            className="ui-mt-1 ui-block ui-w-full ui-px-3 ui-py-2 ui-border ui-border-gray-300 ui-rounded-md ui-shadow-sm ui-focus:outline-none ui-focus:ring-blue-500 ui-focus:border-blue-500 ui-sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="ui-inline-flex ui-justify-center ui-py-2 ui-px-4 ui-border ui-border-transparent ui-shadow-sm ui-text-sm ui-font-medium ui-rounded-md ui-text-white ui-bg-blue-600 ui-hover:bg-blue-700 ui-focus:outline-none ui-focus:ring-2 ui-focus:ring-offset-2 ui-focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;

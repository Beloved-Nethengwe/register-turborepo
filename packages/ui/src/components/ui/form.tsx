'use client'
import { useState } from 'react';

interface UserData {
  username: string;
  surname: string;
  id: string;
  currentDate: string; 
}

const UserForm = () => {
  
  const [formData, setFormData] = useState<UserData>({
    username: '',
    surname: '',
    id: '',
    currentDate: '', 
  });

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    const date = new Date();
    date.setHours(date.getHours() + 2);
    const currentDate = date.toISOString().split('T')[0];

    const storedData = localStorage.getItem("userData");
    const existingData: UserData[] = storedData ? JSON.parse(storedData) : [];

    const userExistsToday = existingData.some((user: UserData) => 
      user.id === formData.id && user.currentDate === currentDate
    );

    if (userExistsToday) {
      alert('This user has already been added today.'); 
      return; 
    }

   
    const dataToSave = { ...formData, currentDate }; 

    const updatedData = [...existingData, dataToSave];
    localStorage.setItem('userData', JSON.stringify(updatedData));

   
    setFormData({
      username: '',
      surname: '',
      id: '',
      currentDate: '', 
    });

    alert('Data saved to local storage');
  };

  return (
    <div className="ui-max-w-lg ui-mx-auto ui-mt-10">
      <form onSubmit={handleSubmit} className="ui-space-y-4 ui-p-6 ui-bg-gray-100 ui-border ui-border-gray-300 ui-rounded-lg ui-shadow-lg ui-max-w-lg ui-mx-auto ui-mt-10">
        <h2 className="ui-text-xl ui-font-bold ui-text-gray-700 ui-mb-4 ui-text-left">
          User Registration Form - {new Date().toLocaleDateString()}
        </h2>
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
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="ui-mt-1 ui-block ui-w-full ui-px-3 ui-py-2 ui-border ui-border-gray-300 ui-rounded-md ui-shadow-sm ui-focus:outline-none ui-focus:ring-blue-500 ui-focus:border-blue-500 ui-sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="ui-inline-flex ui-justify-center ui-py-2 ui-px-4 ui-border ui-border-transparent ui-shadow-sm ui-text-sm ui-font-medium ui-rounded-md ui-text-white ui-bg-blue-600 ui-hover:bg-blue-700 ui-focus:outline-none ui-focus:ring-2 ui-focus:ring-offset-2 ui-focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;

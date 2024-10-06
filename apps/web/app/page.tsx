'use client'; 
import { useEffect, useState } from 'react';
import UserForm from "@repo/ui/components/ui/form";

interface User {
  id: number;
  username: string;
  surname: string;
  idnumber: string;
  currentdate: string;
}

export default function Home() {
  return App();
}


function App() {

  const [users, setUsers] = useState<User[]>([]);  // Use the User type for state

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      console.log(response);
      
      const data = await response.json();
      setUsers(data);  // Set the data fetched from the API
    };
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <div className="ui-container ui-mx-auto ui-mt-10">
      <UserForm />
      </div>
    </div>
    
    
  );
}
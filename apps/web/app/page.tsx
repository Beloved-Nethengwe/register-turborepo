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

  return (
    <div className="App">
      <div className="ui-container ui-mx-auto ui-mt-10">
      <UserForm />
      </div>
    </div>
    
    
  );
}
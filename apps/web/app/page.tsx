'use client'; 
import UserForm from "@repo/ui/components/ui/form";

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
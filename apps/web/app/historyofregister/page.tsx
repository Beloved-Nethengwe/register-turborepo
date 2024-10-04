'use client';
import { useEffect, useState } from 'react';

interface UserData {
  username: string;
  surname: string;
  id: string;
  currentDate: string;
}

const RegisterHistory = () => {
  const [userDataList, setUserDataList] = useState<UserData[]>([]);
  const [groupedData, setGroupedData] = useState<Record<string, UserData[]>>({});
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Change this value to show more or fewer items per page

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    const existingData = storedData ? JSON.parse(storedData) : [];
    setUserDataList(existingData);
    
  }, []);

  useEffect(() => {
    if (userDataList.length > 0) {
    
      const grouped = userDataList.reduce<Record<string, UserData[]>>((acc, user) => {
        const date = user.currentDate.split('T')[0]; // Split to get the date part
        if (date) { // Ensure date is defined
          acc[date] = acc[date] || []; // Initialize the array if it doesn't exist
          acc[date]!.push(user); // Push the user to the corresponding date array
        }
        return acc;
      }, {});

      setGroupedData(grouped);
      const uniqueDates = Object.keys(grouped); // Get unique dates

      // Set the current date to the first one if available
      if (uniqueDates.length > 0) {
        const firstDate = uniqueDates[0];
        if (firstDate) {
          setCurrentDate(firstDate);
        }
      }
    }
  }, [userDataList]);

  const handleDateChange = (date: string) => {
    setCurrentDate(date);
    setCurrentPage(1); // Reset to first page when date changes
  };

  // Pagination logic
  const usersToDisplay = currentDate && groupedData[currentDate] ? groupedData[currentDate] : [];
  const totalPages = Math.ceil((usersToDisplay?.length ?? 0) / itemsPerPage); // Parentheses added
  const displayedUsers = (usersToDisplay ?? []).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);  

  return (
    <div>
    <main className="ui-flex ui-items-center ui-justify-center ui-min-h-screen ui-bg-gray-100">
        <div className="ui-bg-white ui-shadow-md ui-rounded-lg ui-p-4 sm:ui-p-6 ui-w-full sm:ui-w-3/4 lg:ui-w-1/2">
            <h2 className="ui-text-lg sm:ui-text-xl ui-font-semibold ui-mb-4 ui-text-center">
                User Registration History - {currentDate}
            </h2>

            <div className="ui-flex ui-flex-wrap ui-justify-center sm:ui-justify-between ui-mb-4">
                {Object.keys(groupedData).map((date) => (
                    <button
                        key={date}
                        onClick={() => handleDateChange(date)}
                        className={`ui-mx-1 ui-my-1 ui-py-1 ui-px-3 ui-rounded ${currentDate === date ? 'ui-bg-lime-800 ui-text-white' : 'ui-bg-gray-300'}`}
                    >
                        {date}
                    </button>
                ))}
            </div>

            {displayedUsers.length > 0 ? (
                <div className="ui-overflow-x-auto">
                    <table className="ui-min-w-full ui-text-center">
                        <thead>
                            <tr className="ui-bg-gray-700">
                                <th className="ui-py-2 ui-px-4">Username</th>
                                <th className="ui-py-2 ui-px-4">Surname</th>
                                <th className="ui-py-2 ui-px-4">ID</th>
                                <th className="ui-py-2 ui-px-4">Current Date</th>
                            </tr>
                        </thead>
                        <tbody className="ui-bg-gray-400">
                            {displayedUsers.map((user, index) => (
                                <tr key={index}>
                                    <td className="ui-border ui-py-2 ui-px-4">{user.username}</td>
                                    <td className="ui-border ui-py-2 ui-px-4">{user.surname}</td>
                                    <td className="ui-border ui-py-2 ui-px-4">{user.id}</td>
                                    <td className="ui-border ui-py-2 ui-px-4">{user.currentDate.split('T')[0]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="ui-text-center ui-text-gray-500">No data available for this date.</p>
            )}

            <div className="ui-flex ui-justify-between ui-items-center ui-mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="ui-bg-lime-800 ui-text-white ui-px-4 ui-py-2 ui-rounded"
                >
                    Previous
                </button>
                <span className="ui-text-center">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="ui-bg-lime-800 ui-text-white ui-px-4 ui-py-2 ui-rounded"
                >
                    Next
                </button>
            </div>
        </div>
    </main>
</div>

  );
};

export default RegisterHistory;

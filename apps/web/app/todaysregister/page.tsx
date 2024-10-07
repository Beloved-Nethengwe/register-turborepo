'use client'; 
import { useEffect, useState } from "react";

interface UserData {
    id: number;
    username: string;
    surname: string;
    idnumber: string;
    currentdate: string | null; // Make this nullable in case it is not present
}

const todaysRegister = () => {
    const [userDataList, setUserDataList] = useState<UserData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/users'); // Make API request to fetch users
                const data = await response.json();
                
                setUserDataList(data); // Set the data from PostgreSQL
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false); // Set loading to false once the data is fetched
            }
        };

        fetchUserData();
    }, []);

    const today = new Date();
    today.setHours(today.getHours() + 2); // Adjust timezone if needed
    const todayString = today.toISOString().split('T')[0];
    
    // console.log(userDataList[10]?.currentdate ? userDataList[10].currentdate.toString().split('T')[0] : 'N/A');
    console.log(todayString);
    console.log(userDataList);
    

    const filteredUserData = userDataList.filter(
        user => user.currentdate && user.currentdate.toString().split('T')[0] === todayString
    );
    
    const displayedUsers = filteredUserData.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <p className="ui-text-center ui-text-gray-500">Loading...</p>;
    }

    return (
        <div>
            <main className="ui-flex ui-items-center ui-justify-center ui-min-h-screen ui-bg-gray-100">
                <div className="ui-bg-white ui-shadow-md ui-rounded-lg ui-p-4 sm:ui-p-6 ui-w-full sm:ui-w-3/4 lg:ui-w-1/2">
                    <h2 className="ui-text-lg sm:ui-text-xl ui-font-bold ui-mb-4 ui-text-center">
                        Today's Register - {new Date().toLocaleDateString()}
                    </h2>

                    {/* Search input */}
                    <input
                        type="text"
                        placeholder="Search by username"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ui-mb-4 ui-py-2 ui-px-3 ui-border ui-rounded-lg ui-w-full"
                    />

                    {displayedUsers.length > 0 ? (
                        <div className="ui-overflow-x-auto">
                            <table className="ui-min-w-full ui-text-center">
                                <thead>
                                    <tr className="ui-bg-gray-700">
                                        <th className="ui-py-2 ui-px-4">Username</th>
                                        <th className="ui-py-2 ui-px-4">Surname</th>
                                        <th className="ui-py-2 ui-px-4">ID Number</th>
                                        <th className="ui-py-2 ui-px-4">Current Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedUsers.map((user, index) => (
                                        <tr key={index} className="ui-bg-gray-400">
                                            <td className="ui-border ui-py-2 ui-px-4">{user.username}</td>
                                            <td className="ui-border ui-py-2 ui-px-4">{user.surname}</td>
                                            <td className="ui-border ui-py-2 ui-px-4">{user.idnumber}</td>
                                            <td className="ui-border ui-py-2 ui-px-4">
                                                {user.currentdate ? user.currentdate.split('T')[0] : 'N/A'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="ui-text-center ui-text-gray-500">No data available for today or no matching users.</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default todaysRegister;

'use client'; 
import { useEffect, useState } from "react";

interface UserData {
    username: string;
    surname: string;
    id: string;
    currentDate: string;
}

const todaysRegister = () => {
    const [userDataList, setUserDataList] = useState<UserData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query

    useEffect(() => {
        const storedData = localStorage.getItem("userData");
        const existingData = storedData ? JSON.parse(storedData) : [];
        setUserDataList(existingData);
    }, []);

    const today = new Date();
    today.setHours(today.getHours() + 2);
    const todayString = today.toISOString().split('T')[0];

    const filteredUserData = userDataList.filter(
        user => user?.currentDate.toString().split('T')[0] === todayString
    );

    const displayedUsers = filteredUserData.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                                <th className="ui-py-2 ui-px-4">ID</th>
                                <th className="ui-py-2 ui-px-4">Current Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedUsers.map((user, index) => (
                                <tr key={index} className="ui-bg-gray-400">
                                    <td className="ui-border ui-py-2 ui-px-4">{user.username}</td>
                                    <td className="ui-border ui-py-2 ui-px-4">{user.surname}</td>
                                    <td className="ui-border ui-py-2 ui-px-4">{user.id}</td>
                                    <td className="ui-border ui-py-2 ui-px-4">
                                        {user?.currentDate.toString().split('T')[0]}
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

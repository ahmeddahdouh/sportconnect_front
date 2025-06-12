import React from "react";

const ProfileTabs = ({ currentTab, setCurrentTab }) => {
    const tabs = ["Profil", "Mes Événements"];

    return (
        <div className="flex justify-center border-b mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setCurrentTab(tab)}
                    className={`px-4 py-2 font-medium ${
                        currentTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default ProfileTabs;

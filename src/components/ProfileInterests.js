import React from "react";

const ProfileInterests = ({ interests }) => {
    return (
        <div className="mt-4">
            <h3 className="font-semibold mb-2">Centres d'intérêt</h3>
            <div className="flex flex-wrap gap-2">
                {interests?.map((interest, index) => (
                    <span key={index} className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                        {interest}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ProfileInterests;

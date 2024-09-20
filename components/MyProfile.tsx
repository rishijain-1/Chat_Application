import React from 'react';
import LogOut from './LogOut';

interface Profile {
  name: string;
  email: string;
  designation?: string;
  id: string; // Add userId to the Profile interface
}

interface MyProfileProps {
  profile: Profile;
}

const MyProfile: React.FC<MyProfileProps> = ({ profile }) => {
  return (
    <div className="absolute top-16 right-0 bg-gradient-to-l from-gray-800 via-gray-900 to-black shadow-lg p-6 rounded-lg w-80 sm:w-64 md:w-80 lg:w-96 text-gray-800">
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-indigo-500 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {profile.name[0].toUpperCase()}
        </div>
        <h3 className="text-2xl font-semibold text-gray-100">{profile.name}</h3>
        {profile.designation && (
          <p className="text-lg text-gray-200 italic">{profile.designation}</p>
        )}
        <p className="text-gray-200 text-sm sm:text-base">{profile.email}</p>
        <p className="text-gray-200 text-xs xs:text-base">ID: {profile.id}</p> {/* Display user ID */}
        <div><LogOut /></div>
      </div>
    </div>
  );
};

export default MyProfile;

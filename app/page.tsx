import LogoHeader from "@/components/LogoHeader";
import Register from "@/components/Register";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-indigo-900 p-6">
      {/* Logo Header */}
      <header className="w-full max-w-screen-lg mb-10">
        <LogoHeader />
      </header>

      {/* Register Form */}
      <main className="w-full max-w-lg  bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl p-8 transform transition hover:scale-105 duration-300 ease-in-out">
        <h1 className="text-4xl font-extrabold text-center text-gray-200 mb-6">
          Create Account
        </h1>
        <Register />
      </main>
    </div>
  );
}

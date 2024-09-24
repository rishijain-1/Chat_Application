'use client'

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock, FaBriefcase, FaEye, FaEyeSlash } from "react-icons/fa"; // Importing icons

interface FormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  designation: string;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const sendData = {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      designation: data.designation,
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });

      if (res.ok) {
        const message = await res.json();
        alert(message.message);
        reset();
        router.push("/login");
      } else {
        const error = await res.json();
        setErrorMessage(error.message || "An unknown error occurred");
      }
    } catch{
      setErrorMessage("An error occurred during registration.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-max ">
      <div className="w-full max-w-md p-8 m-4 space-y-6 bg-white bg-opacity-80 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label htmlFor="name" className="flex items-center text-gray-800 text-sm font-medium mb-1">
              <FaUser className="text-gray-600 mr-2" />
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 rounded-md outline-none text-gray-800"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="flex items-center text-gray-800 text-sm font-medium mb-1">
              <FaEnvelope className="text-gray-600 mr-2" />
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-2 rounded-md outline-none text-gray-800"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="designation" className="flex items-center text-gray-800 text-sm font-medium mb-1">
              <FaBriefcase className="text-gray-600 mr-2" />
              Designation
            </label>
            <input
              type="text"
              id="designation"
              placeholder="Designation"
              {...register("designation", { required: "Designation is required" })}
              className="w-full p-2 rounded-md outline-none text-gray-800"
            />
            {errors.designation && <p className="text-red-500 text-sm">{errors.designation.message}</p>}
          </div>

          <div className="relative">
            <label htmlFor="password" className="flex items-center text-gray-800 text-sm font-medium mb-1">
              <FaLock className="text-gray-600 mr-2" />
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle input type based on state
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-2 rounded-md outline-none text-gray-800 pr-10" // Add padding to make room for the icon
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
            </button>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="relative">
            <label htmlFor="password_confirmation" className="flex items-center text-gray-800 text-sm font-medium mb-1">
              <FaLock className="text-gray-600 mr-2" />
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"} // Toggle input type based on state
              id="password_confirmation"
              placeholder="Confirm Password"
              {...register("password_confirmation", {
                validate: (value: string) =>
                  value === getValues("password") || "Passwords do not match",
                required: "Please confirm your password",
              })}
              className="w-full p-2 rounded-md outline-none text-gray-800 pr-10" // Add padding to make room for the icon
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>
            )}
          </div>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
          <div className="w-full text-center">
            <p className="text-gray-800 text-sm">
              Already have an account? <a className="text-blue-600" href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

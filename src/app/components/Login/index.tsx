"use client";

import { userLogin } from "@/app/api/utils/userLogin";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState('');
  const [response, setResponse] = useState('');
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await userLogin({ username, password });
      setResponse(response.message ?? 'Successful login');
      router.push('/atoms/sectionAtoms');
      setLoading(false);
    } catch (error) {
      const message = (error as Error).message;
      setLoading(false);
      setError(message);
    }
  };

  return (
      <div className="m-72">
      <form
        onSubmit={handleLogin}
        className="relative border border-gray-300 p-4 rounded-lg shadow-lg bg-blue-950 shadow-blue-500"
        >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Login</h2>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Enter username"
            required
            className="w-full px-5 py-4 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
          />
        </div>

        <div className="relative mb-8">
          <input
            type="password"
            placeholder="Enter password"
            required
            className="w-full px-5 py-4 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold rounded-lg py-3 mt-6 hover:bg-purple-700 transition duration-300 ease-in-out"
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>

        {response && <p className="text-green-500 text-sm mt-4 text-center">{response}</p>}
        {errors && <p className="text-red-500 text-sm mt-2 text-center">{errors}</p>}
      </form>
    </div>
  );
};

export default Login;

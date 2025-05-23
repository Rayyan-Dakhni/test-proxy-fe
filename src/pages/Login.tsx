import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <form
        onSubmit={handleLogin}
        className='bg-white p-6 rounded-xl shadow-md w-full max-w-sm'
      >
        <h2 className='text-2xl font-semibold mb-4 text-center'>Admin Login</h2>
        {error && <p className='text-red-500 text-sm mb-3'>{error}</p>}

        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='mb-3'
          required
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='mb-4'
          required
        />
        <Button type='submit' className='w-full'>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;

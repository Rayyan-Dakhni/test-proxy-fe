import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-white shadow p-5 px-20 flex justify-between items-center'>
        <h1 className='text-xl font-medium'>Proxy</h1>
        <Button variant='outline' onClick={handleLogout}>
          Logout
        </Button>
      </header>
      <main className='p-10 px-20'>{children}</main>
    </div>
  );
};

export default AppLayout;

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import LogsTable from "@/components/LogsTable";
import ProxyRulesCard from "@/components/ProxyRulesCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UsersCardGrid from "@/components/UsersCardGrid";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [rules, setRules] = useState(null);
  const [proxyUrl, setProxyUrl] = useState("");
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const logsRes = await axios.get("/logs"); // This will trigger proxy but we might replace it later with /logs if needed
      const rulesRes = await axios.get("/rules");

      console.log(rulesRes);
      setLogs(logsRes.data);
      setRules(rulesRes.data);
    };
    fetchData();
  }, []);

  const getUsers = async () => {
    try {
      const userRes = await axios.get("/proxy/" + proxyUrl);

      errorMsg !== "" && setErrMsg("");
      setUsers(userRes.data);
    } catch (e: any) {
      console.log(e);
      setErrMsg(e.response.data.error);
    }
  };

  return (
    <div className='w-full grid grid-cols-2 gap-4'>
      <div className='space-y-6'>
        {rules && <ProxyRulesCard rules={rules} setRules={setRules} />}
        <LogsTable logs={logs} />
      </div>

      <div className='w-full bg-white shadow-md rounded-lg p-4'>
        <h2 className='text-xl font-semibold mb-3'>Test Proxy</h2>

        <div className='w-full flex gap-8 mb-5'>
          <div className='w-full'>
            <Input
              placeholder='Enter URL...'
              value={proxyUrl}
              onChange={(e: any) => setProxyUrl(e.target.value)}
              className='w-full'
            />

            <p className='text-sm text-gray-600 p-2'>
              Choose a url to test for eg. users
            </p>
          </div>

          <Button onClick={getUsers} disabled={false}>
            Try
          </Button>
        </div>

        {errorMsg ? (
          <div className='w-full h-80 flex items-center justify-center'>
            <h6 className='text-red-600 text-lg font-medium'>{errorMsg}</h6>
          </div>
        ) : (
          <UsersCardGrid users={users} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

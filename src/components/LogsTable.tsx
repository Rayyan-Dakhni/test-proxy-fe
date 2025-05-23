import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Select } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";

const LogsTable = ({ logs }: { logs: any[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [methodFilter, setMethodFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredLogs = useMemo(() => {
    return logs
      .filter((log) => {
        const matchesSearch =
          log.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.url.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMethod =
          methodFilter === "ALL" || log.method === methodFilter;
        return matchesSearch && matchesMethod;
      })
      .sort((a, b) => {
        const timeA = new Date(a.timestamp).getTime();
        const timeB = new Date(b.timestamp).getTime();
        return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
      });
  }, [logs, searchTerm, methodFilter, sortOrder]);

  return (
    <div className='bg-white shadow-md rounded-lg p-4'>
      <h2 className='text-xl font-semibold mb-4'>Request Logs</h2>

      <div className='flex gap-4 mb-4 items-center'>
        <Input
          placeholder='Search method or URL...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='max-w-sm'
        />
        <Select onValueChange={(v) => setMethodFilter(v)} defaultValue='ALL'>
          <SelectTrigger className='w-[160px]'>
            <SelectValue placeholder='Filter by method' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='ALL'>All Methods</SelectItem>
            <SelectItem value='GET'>GET</SelectItem>
            <SelectItem value='POST'>POST</SelectItem>
            <SelectItem value='PUT'>PUT</SelectItem>
            <SelectItem value='DELETE'>DELETE</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(v) => setSortOrder(v as "asc" | "desc")}
          defaultValue='desc'
        >
          <SelectTrigger className='w-[160px]'>
            <SelectValue placeholder='Sort order' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='desc'>Newest First</SelectItem>
            <SelectItem value='asc'>Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Method</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs.map((log, idx) => (
            <TableRow key={idx}>
              <TableCell>{log.method}</TableCell>
              <TableCell>{log.url}</TableCell>
              <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LogsTable;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UsersCardGrid = ({ users }: { users: any[] }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 max-h-[60vh] overflow-auto'>
      {users.map((user) => (
        <Card key={user.id}>
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
          </CardHeader>

          <CardContent className='text-sm space-y-2'>
            <p>
              <strong>Email:</strong> <br /> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> <br /> {user.phone}
            </p>
            <p>
              <strong>Company:</strong> <br /> {user.company?.name}
            </p>
            <p>
              <strong>City:</strong> <br /> {user.address?.city}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UsersCardGrid;

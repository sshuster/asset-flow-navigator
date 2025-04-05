
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mockUsers, mockStrategies } from '@/utils/mockData';
import { Users, UserX, RefreshCw, Search, AlertTriangle, BarChart2, CircleDollarSign, ServerIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const UserRow = ({ user, onDelete }: { user: any; onDelete: (id: number) => void }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return (
    <tr className="border-b">
      <td className="py-3 px-4">{user.id}</td>
      <td className="py-3 px-4 font-medium">{user.username}</td>
      <td className="py-3 px-4">{user.email}</td>
      <td className="py-3 px-4">{user.registrationDate}</td>
      <td className="py-3 px-4">{user.lastLogin}</td>
      <td className="py-3 px-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {user.status}
        </span>
      </td>
      <td className="py-3 px-4 text-right">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
              <UserX className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm User Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete user "{user.username}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  onDelete(user.id);
                  setIsDialogOpen(false);
                }}
              >
                Delete User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  );
};

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User deleted",
      description: "The user has been successfully removed",
    });
  };

  const totalActiveUsers = users.filter(user => user.status === 'active').length;
  const totalStrategies = mockStrategies.length;
  const avgStrategiesPerUser = Math.round((users.reduce((acc, user) => acc + user.strategies.length, 0) / users.length) * 10) / 10;

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users and monitor system performance</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="mr-2">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button size="sm" variant="secondary">
            <ServerIcon className="h-4 w-4 mr-2" />
            System Status
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <h3 className="text-2xl font-bold mt-1">{totalActiveUsers}</h3>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Strategies</p>
                <h3 className="text-2xl font-bold mt-1">{totalStrategies}</h3>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <BarChart2 className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Strategies / User</p>
                <h3 className="text-2xl font-bold mt-1">{avgStrategiesPerUser}</h3>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <CircleDollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage your platform users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="py-2 px-4 text-left font-medium text-sm">ID</th>
                      <th className="py-2 px-4 text-left font-medium text-sm">Username</th>
                      <th className="py-2 px-4 text-left font-medium text-sm">Email</th>
                      <th className="py-2 px-4 text-left font-medium text-sm">Registered</th>
                      <th className="py-2 px-4 text-left font-medium text-sm">Last Login</th>
                      <th className="py-2 px-4 text-left font-medium text-sm">Status</th>
                      <th className="py-2 px-4 text-right font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(user => (
                        <UserRow 
                          key={user.id} 
                          user={user}
                          onDelete={handleDeleteUser}
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-6 text-center text-muted-foreground">
                          No users found matching your search criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredUsers.length} of {users.length} users
              </p>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" disabled={filteredUsers.length === users.length}>
                  Previous
                </Button>
                <Button size="sm" variant="outline" disabled={filteredUsers.length === users.length}>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Review system activity and errors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 border p-3 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">API Rate Limit Warning</span>
                      <span className="text-xs text-muted-foreground">2023-04-05 14:32:15</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      External API rate limit threshold reached (85%). Consider implementing additional caching.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 border p-3 rounded-md">
                  <Users className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">User Authentication</span>
                      <span className="text-xs text-muted-foreground">2023-04-05 13:45:02</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Multiple failed login attempts for user "jsmith" (IP: 192.168.1.105). Account temporarily locked.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 border p-3 rounded-md">
                  <ServerIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Database Maintenance</span>
                      <span className="text-xs text-muted-foreground">2023-04-05 12:00:00</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Scheduled database maintenance completed successfully. Performance optimizations applied.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 border p-3 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Critical Error</span>
                      <span className="text-xs text-muted-foreground">2023-04-05 09:17:23</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Market data provider connection failed. Retrying in 5 minutes. Error: Connection timeout.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 border p-3 rounded-md">
                  <Users className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">New User Registration</span>
                      <span className="text-xs text-muted-foreground">2023-04-04 23:12:45</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      User "emma.wilson" registered successfully. Email verification sent.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                View All Logs
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;

import { DataTable } from "@/components/ui/data-table"
import { usersColumns } from "./users-columns"

// Mock data for demonstration - replace with actual server action
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "USER",
    image: null,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
    phone: "+1234567890",
    status: "ACTIVE",
  },
  // Add more mock data as needed
]

export function UsersAdmin() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-red-400">Manage Users</h2>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
          Add User
        </button>
      </div>
      <DataTable columns={usersColumns} data={mockUsers} />
    </div>
  )
}
"use client";

import { DataTable } from "@/components/ui/data-table";
import { getUsersColumns } from "./users-columns";
import { useQuery } from "@tanstack/react-query";
import { userManagementService } from "@/services/user-management.service";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";

export function UsersAdmin() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || "",
  );
  const [debouncedSearchInput] = useDebounce(searchInput, 3000);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearchInput) {
      params.set("search", debouncedSearchInput);
    } else {
      params.delete("search");
    }
    params.set("page", "1"); // Reset to first page on search
    router.replace(`?${params.toString()}`);
  }, [debouncedSearchInput, router, searchParams]);

  const {
    data: usersData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin-users", page, limit, search],
    queryFn: async () => {
      console.log("Fetching users...");
      const response = await userManagementService.getUsers(
        page,
        limit,
        search || undefined,
      );
      return response;
    },
  });

  const users = usersData?.data || [];
  const pagination = usersData?.pagination;
  console.log(
    "UsersAdmin render - users:",
    users,
    "isLoading:",
    isLoading,
    "error:",
    error,
  );
  const handleUserAction = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-red-400">Manage Users</h2>
          <Input
            placeholder="Search users..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-red-400">Manage Users</h2>
          <Input
            placeholder="Search users..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="text-center py-12">
          <p className="text-red-400 text-lg">Failed to load users</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-red-400">Manage Users</h2>
        <Input
          placeholder="Search users..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <DataTable
        columns={getUsersColumns({ onUserAction: handleUserAction })}
        data={users}
        pagination={pagination}
        onPageChange={(newPage) => {
          const params = new URLSearchParams(searchParams);
          params.set("page", newPage.toString());
          router.replace(`?${params.toString()}`);
        }}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          const params = new URLSearchParams(searchParams);
          params.set("page", "1");
          router.replace(`?${params.toString()}`);
        }}
      />
    </div>
  );
}

# Auth User Profile Management - Implementation Guide

## Overview

This guide demonstrates clean, maintainable patterns for user authentication and profile management in the CineVerse application. All code follows best practices for error handling, state management, and API integration.

## Architecture

### Files Updated/Created

```
src/
├── services/
│   ├── auth.service.ts          # Core auth service (UPDATED)
│   └── auth.examples.ts         # Usage examples and patterns (NEW)
├── types/
│   └── auth.types.ts            # Auth types (UPDATED)
├── lib/
│   └── hooks/
│       └── useUserProfile.ts    # Custom hook (NEW)
└── components/
    └── modules/
        ├── auth/
        │   └── ProfileUpdateForm.tsx  # Update form component (NEW)
        └── dashboard/
            └── user/
                ├── UserProfileCard.tsx # Profile display (EXISTING)
                └── profile/
                    └── example-page.tsx # Example page (NEW)
```

## API Endpoints

### Get Current User Profile
```
GET /api/v1/auth/me
Response: { success: true, data: CurrentUser }
```

### Update User Profile
```
PUT /api/v1/auth/me
Body: { name?, image?, phone? }
Response: { success: true, data: CurrentUser }
```

## Core Service: `authService`

### `getCurrentUser()`
Fetch the currently authenticated user's profile.

```typescript
const response = await authService.getCurrentUser();

if (response.success && response.data) {
  const user = response.data; // CurrentUser type
  console.log(user.name, user.email);
}
```

### `updateUserProfile(data)`
Update user profile with specific fields.

```typescript
const response = await authService.updateUserProfile({
  name: "John Doe",
  image: "https://example.com/image.jpg",
  phone: "+1 (555) 123-4567"
});

if (response.success && response.data) {
  const updatedUser = response.data;
}
```

## Usage Patterns

### Pattern 1: Basic Hook Usage (Recommended)

The simplest way to manage user profiles in React components.

```typescript
"use client";

import { useEffect } from "react";
import { useUserProfile } from "@/lib/hooks/useUserProfile";

export default function ProfilePage() {
  const { user, isLoading, updateProfile, fetchUser } = useUserProfile();

  // Load user on mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  const handleUpdateName = async () => {
    const result = await updateProfile({
      name: "New Name"
    });
    
    if (result) {
      console.log("Profile updated!");
    }
  };

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={handleUpdateName}>Update Name</button>
    </div>
  );
}
```

### Pattern 2: Direct Service Usage

For more control, use the service directly.

```typescript
import { authService } from "@/services/auth.service";

async function updateUserProfile() {
  try {
    // Get current user
    const userResponse = await authService.getCurrentUser();
    if (!userResponse.success) throw new Error("Failed to load user");
    
    const currentUser = userResponse.data;

    // Update profile
    const updateResponse = await authService.updateUserProfile({
      name: "Updated Name",
      phone: "+1 (555) 000-0000"
    });

    if (updateResponse.success) {
      console.log("Profile updated:", updateResponse.data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
```

### Pattern 3: Component with Form Validation

Complete example with validation and error handling.

```typescript
import { ProfileUpdateForm } from "@/components/modules/auth/ProfileUpdateForm";

export default function SettingsPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user...
  }, []);

  const handleUpdateSuccess = (updatedUser) => {
    setUser(updatedUser);
    toast.success("Profile updated!");
  };

  return (
    <ProfileUpdateForm 
      currentUser={user}
      onUpdateSuccess={handleUpdateSuccess}
    />
  );
}
```

## Best Practices

### 1. Only Send Changed Fields

Never send all fields, only those that changed:

```typescript
// ❌ Bad: Sends unnecessary data
await authService.updateUserProfile({
  name: user.name,
  image: user.image,
  phone: newPhone  // Only this changed
});

// ✅ Good: Send only changed field
await authService.updateUserProfile({
  phone: newPhone
});
```

### 2. Validate Before Sending

Always validate user input before submitting:

```typescript
function validateProfileData(data) {
  if (data.name && data.name.trim().length === 0) {
    throw new Error("Name cannot be empty");
  }

  if (data.image) {
    try {
      new URL(data.image);
    } catch {
      throw new Error("Invalid image URL");
    }
  }

  if (data.phone) {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(data.phone)) {
      throw new Error("Invalid phone number");
    }
  }

  return true;
}
```

### 3. Proper Error Handling

Use try-catch and provide user feedback:

```typescript
try {
  setIsLoading(true);
  const response = await authService.updateUserProfile(data);

  if (response.success) {
    toast.success("Profile updated successfully");
  } else {
    toast.error(response.message || "Update failed");
  }
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown error";
  toast.error(message);
  console.error("Update error:", error);
} finally {
  setIsLoading(false);
}
```

### 4. Debounce Auto-Save

When auto-saving changes:

```typescript
import { useCallback } from "react";

function useAutoSaveProfile() {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const autoSave = useCallback((data: UpdateProfileData) => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout (save after 2 seconds of inactivity)
    timeoutRef.current = setTimeout(async () => {
      await authService.updateUserProfile(data);
    }, 2000);
  }, []);

  return autoSave;
}
```

### 5. Keep UI in Sync

Always update local state with API response:

```typescript
const response = await authService.updateUserProfile(data);

if (response.success && response.data) {
  // Update local state with fresh data from server
  setUser(response.data);
  
  // Show success message
  toast.success("Changes saved");
}
```

## Type Definitions

### CurrentUser
```typescript
type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
  phone?: string;
  status?: UserStatus;
  createdAt: string;
  updatedAt: string;
}
```

### UpdateProfileData
```typescript
interface UpdateProfileData {
  name?: string;
  image?: string;
  phone?: string;
}
```

### API Response
```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}
```

## Error Scenarios

### Network Error
```typescript
try {
  await authService.getCurrentUser();
} catch (error) {
  if (error instanceof NetworkError) {
    toast.error("Network connection failed");
  }
}
```

### Invalid Token
```typescript
// Service will throw error if token is invalid
// Redirect to login
if (error.status === 401) {
  redirect("/login");
}
```

### Validation Error
```typescript
const response = await authService.updateUserProfile(data);

if (!response.success) {
  // response.message contains validation error details
  toast.error(response.message);
}
```

## Testing

### Test Getting User
```typescript
test("should fetch current user", async () => {
  const response = await authService.getCurrentUser();
  
  expect(response.success).toBe(true);
  expect(response.data).toHaveProperty("id");
  expect(response.data).toHaveProperty("email");
});
```

### Test Updating Profile
```typescript
test("should update user profile", async () => {
  const response = await authService.updateUserProfile({
    name: "New Name"
  });
  
  expect(response.success).toBe(true);
  expect(response.data.name).toBe("New Name");
});
```

## Components Reference

### useUserProfile Hook
```typescript
const {
  user,           // CurrentUser | null
  isLoading,      // boolean
  isUpdating,     // boolean
  error,          // Error | null
  fetchUser,      // () => Promise<void>
  updateProfile,  // (data) => Promise<CurrentUser | null>
  updateField     // (field, value) => Promise<CurrentUser | null>
} = useUserProfile();
```

### ProfileUpdateForm Component
```typescript
<ProfileUpdateForm
  currentUser={user}
  onUpdateSuccess={(updatedUser) => {
    // Handle success
  }}
/>
```

## Examples Location

Find detailed examples in:
- `src/services/auth.examples.ts` - Code examples and patterns
- `src/app/(dashboard)/user/profile/example-page.tsx` - Full page example
- `src/components/modules/auth/ProfileUpdateForm.tsx` - Form component

## Troubleshooting

### User data not updating in UI
```typescript
// Wrong - modifying state directly
user.name = "New Name";

// Right - create new object
setUser({ ...user, name: "New Name" });
// Or use API response
setUser(response.data);
```

### Image preview not showing
```typescript
// Check if URL is valid
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Add error handler
<img 
  src={imageUrl}
  onError={() => toast.error("Failed to load image")}
/>
```

### Changes not saving
```typescript
// Check if there are actual changes
if (formData.name === user.name && 
    formData.image === user.image &&
    formData.phone === user.phone) {
  return; // No changes
}

// Only then call API
await authService.updateUserProfile(updatedFields);
```

## Summary

The auth service provides:
- ✅ Clean API abstraction
- ✅ Type-safe operations
- ✅ Proper error handling
- ✅ Reusable hooks
- ✅ Component examples
- ✅ Validation patterns

Use these patterns to build maintainable, user-friendly profile management throughout the application.

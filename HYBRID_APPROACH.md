# Hybrid Approach: Server Actions + TanStack Query

This implementation demonstrates a hybrid approach using **Server Actions** for mutations and **TanStack Query** for data fetching in a Next.js application with a Spring Boot backend.

## Architecture Overview

### 🎯 **Server Actions** (All Mutations)

- **Create User**: `createUser()` - Form submissions for creating new users
- **Update User**: `updateUser()` - Form submissions for editing existing users
- **Delete User**: `deleteUser()` - Delete operations with confirmation dialogs

### 🔄 **TanStack Query** (Data Fetching Only)

- **Fetch Users**: `useSuperAdminUsers()` - Cached data fetching with automatic refetching

## Key Benefits

### Server Actions Benefits

- ✅ **Simpler form handling** - No need for complex state management
- ✅ **Built-in validation** - Zod schema validation on the server
- ✅ **Progressive enhancement** - Forms work without JavaScript
- ✅ **Type safety** - Full TypeScript support between client and server
- ✅ **Better SEO** - Server-side rendering and form handling
- ✅ **Consistent architecture** - All mutations use the same pattern

### TanStack Query Benefits

- ✅ **Excellent caching** - Automatic background refetching, cache invalidation
- ✅ **Rich loading states** - `isLoading`, `isFetching`, `isError` states
- ✅ **Retry logic** - Built-in retry mechanisms
- ✅ **DevTools** - Great debugging experience

## File Structure

```
├── app/
│   ├── api/
│   │   └── users/
│   │       ├── route.ts                    # POST /api/users (create)
│   │       ├── super-admin/route.ts        # GET /api/users/super-admin (fetch)
│   │       └── [id]/route.ts               # PUT/DELETE /api/users/[id] (update/delete)
│   └── (dashboard)/account/user-management/
│       ├── page.tsx                        # Main page with hybrid approach
│       ├── actions.ts                      # Server actions for mutations
│       └── data-super-admin.ts             # Mock data (replace with API calls)
├── components/
│   ├── providers/
│   │   └── query-provider.tsx              # TanStack Query provider
│   └── dashboard/account/user-management/
│       ├── columns.tsx                     # Table columns with server actions
│       └── user-form.tsx                   # Form component with server actions
├── hooks/
│   └── use-users.ts                        # TanStack Query hooks (fetching only)
└── components/ui/
    └── loading-spinner.tsx                 # Loading component
```

## Usage Examples

### 1. Data Fetching with TanStack Query

```tsx
// In your component
const { data: users, isLoading, error, refetch } = useSuperAdminUsers();

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage />;

return <DataTable data={users} columns={columns} />;
```

### 2. Form Submission with Server Actions

```tsx
// In your form component
const form = useForm({
  resolver: zodResolver(userSchema),
  defaultValues: {
    /* ... */
  },
});

const onSubmit = async (data: FormData) => {
  const formData = new FormData();
  // ... append form data

  const result = await createUser(formData); // Server action
  if (result.success) {
    toast.success("User created!");
  }
};
```

### 3. Delete Operation with Server Actions

```tsx
// In your component
const [isDeleting, setIsDeleting] = useState(false);

const handleDelete = async (id: number) => {
  setIsDeleting(true);
  try {
    const result = await deleteUser(id); // Server action
    if (result.success) {
      toast.success("User deleted successfully!");
      window.location.reload(); // Refresh to update data
    }
  } catch (error) {
    toast.error("Failed to delete user");
  } finally {
    setIsDeleting(false);
  }
};
```

## Integration with Spring Boot Backend

### Current Implementation (Mock)

The current implementation uses mock data and simulated API calls. To integrate with your Spring Boot backend:

1. **Replace mock data** in `data-super-admin.ts` with actual API calls
2. **Update server actions** in `actions.ts` to call your Spring Boot endpoints
3. **Update API routes** to proxy requests to your backend

### Example Spring Boot Integration

```typescript
// In actions.ts
export async function createUser(formData: FormData) {
  const response = await fetch("http://localhost:8080/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validatedData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
}
```

## Best Practices

### 1. **Error Handling**

- Server actions return structured error responses
- Consistent error handling across all mutations
- Loading states provide user feedback

### 2. **Cache Management**

- TanStack Query handles data fetching and caching
- Manual refresh after mutations (or use revalidatePath)
- Configurable stale time and garbage collection

### 3. **Type Safety**

- Zod schemas for validation
- TypeScript interfaces for all data structures
- Full type safety between client and server

### 4. **User Experience**

- Progressive enhancement with server actions
- Loading spinners and error states
- Toast notifications for feedback
- Consistent mutation patterns

## Migration Guide

### From Pure Server Actions

1. Add TanStack Query provider to your layout
2. Create custom hooks for data fetching
3. Replace `getData()` functions with `useQuery` hooks
4. Keep server actions for all mutations

### From Pure TanStack Query

1. Create server actions for all mutations (create, update, delete)
2. Update forms to use server actions instead of mutations
3. Keep TanStack Query for data fetching and cache management
4. Add proper error handling and validation

## Performance Considerations

- **Server Actions**: Reduce client-side JavaScript bundle
- **TanStack Query**: Intelligent caching reduces API calls
- **Hybrid**: Best of both worlds - simple mutations + powerful data management

## Why This Approach?

### ✅ **Consistency**

- All mutations (create, update, delete) use the same pattern
- Simpler mental model for developers
- Easier to maintain and debug

### ✅ **Progressive Enhancement**

- Forms work without JavaScript
- Better accessibility
- SEO-friendly

### ✅ **Type Safety**

- Full TypeScript support
- Zod validation on the server
- Compile-time error checking

This hybrid approach provides the optimal developer and user experience for most applications.

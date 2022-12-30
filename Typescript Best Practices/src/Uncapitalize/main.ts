// @ts-ignore
type Role = "Admin" | "User" | "Guest";

// Bad practice
type UncapitalizeRole_BAD = "admin" | "user" | "guest";

// Good practice
type UncapitalizeRole = Uncapitalize<Role>; // "admin" | "user" | "guest"
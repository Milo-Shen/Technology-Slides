// @ts-ignore
type Role = "admin" | "user" | "guest";

// Bad practice
type CapitalizeRole_BAD = "Admin" | "User" | "Guest";

// Good practice
type CapitalizeRole = Capitalize<Role>; // "Admin" | "User" | "Guest"
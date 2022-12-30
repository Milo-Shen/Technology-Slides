// @ts-ignore
type Role = 'ADMIN' | 'USER' | null;

// Bad practice
type NonNullableRole_BAD = 'ADMIN' | 'USER';

// Good practice
type NonNullableRole = NonNullable<Role>; // "ADMIN" | "USER"

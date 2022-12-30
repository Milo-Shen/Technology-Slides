// @ts-ignore
type Role = 'admin' | 'user' | 'guest';

// Bad practice
type UppercaseRole_BAD = 'ADMIN' | 'USER' | 'GUEST';

// Good practice
type UppercaseRole = Uppercase<Role>; // "ADMIN" | "USER" | "GUEST"

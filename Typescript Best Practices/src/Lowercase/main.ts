// @ts-ignore
type Role = 'ADMIN' | 'USER' | 'GUEST';

// Bad practice
type LowercaseRole_BAD = 'admin' | 'user' | 'guest';

// Good practice
type LowercaseRole = Lowercase<Role>; // "admin" | "user" | "guest"

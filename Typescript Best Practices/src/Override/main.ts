type Override<T, S> = Omit<T, keyof S> & S;

type TYPE_A = { a?: string };
type TYPE_B = { a?: number; b: number };
type TYPE_C = Simplify<TYPE_A & TYPE_B>;
type TYPE_D = Simplify<Override<TYPE_A, TYPE_B>>;

export type Predicate<T> = (target: T) => boolean
export type Record<T> = { [key: string]: T }
export type Callback<T> = (...args: T[]) => void

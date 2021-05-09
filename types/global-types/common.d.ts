export declare type Predicate<T> = (target: T) => boolean;
export declare type Record<T> = {
    [key: string]: T;
};
export declare type Callback<T> = (...args: T[]) => void;

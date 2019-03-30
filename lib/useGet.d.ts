import { DebounceSettings } from "lodash";
import { RestfulReactProviderProps } from "./Context";
import { GetState } from "./Get";

export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface UseGetProps<TData, TQueryParams> {
  /**
   * The path at which to request data,
   * typically composed by parent Gets or the RestfulProvider.
   */
  path: string;
  /** Options passed into the fetch call. */
  requestOptions?: RestfulReactProviderProps["requestOptions"];
  /**
   * Query parameters
   */
  queryParams?: TQueryParams;
  /**
   * Don't send the error to the Provider
   */
  localErrorOnly?: boolean;
  /**
   * A function to resolve data return from the backend, most typically
   * used when the backend response needs to be adapted in some way.
   */
  resolve?: (data: any) => TData;
  /**
   * Should we fetch data at a later stage?
   */
  lazy?: boolean;
  /**
   * An escape hatch and an alternative to `path` when you'd like
   * to fetch from an entirely different URL.
   *
   */
  base?: string;
  /**
   * How long do we wait between subsequent requests?
   * Uses [lodash's debounce](https://lodash.com/docs/4.17.10#debounce) under the hood.
   */
  debounce?:
    | {
        wait?: number;
        options: DebounceSettings;
      }
    | boolean
    | number;
}

export interface UseGetReturn<TData, TError> extends GetState<TData, TError> {
  /**
   * Absolute path resolved from `base` and `path` (context & local)
   */
  absolutePath: string;
  /**
   * Cancel the current fetch
   */
  cancel: () => void;
  /**
   * Refetch
   */
  refetch: () => Promise<void>;
}

export declare function useGet<
  TData = any,
  TError = any,
  TQueryParams = {
    [key: string]: any;
  }
>(path: string, props?: Omit<UseGetProps<TData, TQueryParams>, "path">): UseGetReturn<TData, TError>;

export declare function useGet<
  TData = any,
  TError = any,
  TQueryParams = {
    [key: string]: any;
  }
>(props: UseGetProps<TData, TQueryParams>): UseGetReturn<TData, TError>;
// # sourceMappingURL=useGet.d.ts.map

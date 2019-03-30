import isEqualWith from "lodash/fp/isEqualWith";
import { useEffect, useRef } from "react";
/**
 * Custom version of isEqual to handle function comparison
 */
var isEqual = isEqualWith(function(a, b) {
  // Deal with the function comparison case
  if (typeof a === "function" && typeof b === "function") {
    return a.toString() === b.toString();
  }
  // Fallback on the method
  return undefined;
});
function useDeepCompareMemoize(value) {
  var ref = useRef();
  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}
/**
 * Accepts a function that contains imperative, possibly effectful code.
 *
 * This is the deepCompare version of the `React.useEffect` hooks (that is shallowed compare)
 *
 * @param effect Imperative function that can return a cleanup function
 * @param deps If present, effect will only activate if the values in the list change.
 *
 * @see https://gist.github.com/kentcdodds/fb8540a05c43faf636dd68647747b074#gistcomment-2830503
 */
export function useDeepCompareEffect(effect, deps) {
  useEffect(effect, useDeepCompareMemoize(deps));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlRGVlcENvbXBhcmVFZmZlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC91c2VEZWVwQ29tcGFyZUVmZmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFjLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUVqRDs7R0FFRztBQUNILElBQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDO0lBQy9CLHlDQUF5QztJQUN6QyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLEVBQUU7UUFDdEQsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3RDO0lBQ0QseUJBQXlCO0lBQ3pCLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMsQ0FBQyxDQUFDO0FBRUgsU0FBUyxxQkFBcUIsQ0FBQyxLQUFvQjtJQUNqRCxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQU8sQ0FBQztJQUUxQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDaEMsR0FBRyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7S0FDckI7SUFFRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDckIsQ0FBQztBQUVEOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FBSSxNQUE0QixFQUFFLElBQU87SUFDM0UsU0FBUyxDQUFDLE1BQU0sRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2pELENBQUMifQ==

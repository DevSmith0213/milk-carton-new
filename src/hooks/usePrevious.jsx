import { useRef, useEffect } from "react";

/**
 * A custom hook that returns the previous value of a state or prop.
 *
 * @param {any} value - The current value (state or prop) whose previous value needs to be tracked.
 * @returns {any} - The previous value of the passed `value`.
 */
function usePrevious(value) {
  // Create a ref to hold the previous value
  const prevRef = useRef();

  useEffect(() => {
    // Update the ref with the current value after each render
    prevRef.current = value;
  }, [value]); // Runs every time `value` changes

  // Return the previous value from the ref
  return prevRef.current;
}

export default usePrevious;

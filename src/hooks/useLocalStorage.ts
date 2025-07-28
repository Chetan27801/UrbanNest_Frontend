import { useState } from "react";

/**
 * Custom hook for localStorage management with TypeScript support
 * @param key - localStorage key
 * @param initialValue - fallback value if key doesn't exist
 * @returns [value, setValue, removeValue]
 */
export const useLocalStorage = <T>(
	key: string,
	initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] => {
	// Get initial value from localStorage or use provided initial value
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(`Error reading localStorage key "${key}":`, error);
			return initialValue;
		}
	});

	// Set value in localStorage and state
	const setValue = (value: T | ((val: T) => T)) => {
		try {
			// Allow value to be a function so we have the same API as useState
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(`Error setting localStorage key "${key}":`, error);
		}
	};

	// Remove value from localStorage
	const removeValue = () => {
		try {
			window.localStorage.removeItem(key);
			setStoredValue(initialValue);
		} catch (error) {
			console.error(`Error removing localStorage key "${key}":`, error);
		}
	};

	return [storedValue, setValue, removeValue];
};

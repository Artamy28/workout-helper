import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);

	const { dispatch } = useAuthContext();

	const signup = async (email, password) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch(
			"https://workout-helper-backend-lw08.onrender.com/api/user/signup",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			}
		);

		const data = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		}

		if (response.ok) {
			// Save the user to local storage
			localStorage.setItem("user", JSON.stringify(data));

			// Update the Auth context
			dispatch({ type: "LOGIN", payload: data });

			setIsLoading(false);
		}
	};

	return { signup, isLoading, error };
};

export default useSignup;

import { createContext, useContext, useReducer } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  signinError: "",
  signupError: "",
  signupMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "signup":
      return {
        ...state,
        signupMessage: action.payload,
        signupError: "",
      };
    case "signup/error":
      return {
        ...state,
        signupMessage: "",
        signupError: action.payload,
      };

    case "signin":
      return {
        ...state,
        user: {
          id: action.payload.id,
          name: action.payload.user_metadata.display_name,
          avatar: action.payload.user_metadata.avatar,
        },
        isAuthenticated: true,
        signinError: "",
      };
    case "signin/error":
      return {
        ...state,
        signinError: action.payload,
      };

    case "signout":
      return initialState;

    default:
      throw new Error("Unknown action type");
  }
}

const image = "https://i.pravatar.cc/100";
function randomNumber() {
  return Math.floor(Math.random() * 1000) + 1;
}

function AuthProvider({ children }) {
  const [
    { user, isAuthenticated, signinError, signupError, signupMessage },
    dispatch,
  ] = useReducer(reducer, initialState);

  async function signin(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      // console.log("Signin", data, error);
      if (error) throw new Error(error.message);
      dispatch({ type: "signin", payload: data.user });
    } catch (error) {
      dispatch({ type: "signin/error", payload: error.message });
      // console.error(error.message);
    }
  }

  async function signup(name, email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
            avatar: `${image}?=${randomNumber()}`,
          },
        },
      });
      // console.log("Signup", data, error);
      if (error) throw new Error(error.message);
      dispatch({
        type: "signup",
        payload: "Check your email for confirmation.",
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: "signup/error", payload: error.message });
    }
  }

  async function signout() {
    await supabase.auth.signOut();
    dispatch({ type: "signout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signinError,
        signupError,
        signupMessage,
        signin,
        signout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };

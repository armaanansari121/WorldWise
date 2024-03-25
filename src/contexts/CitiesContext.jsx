import { createContext, useContext, useEffect, useReducer } from "react";
import supabase from "../config/supabaseClient";
import { useAuth } from "./AuthContext";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/added":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "reset":
      return initialState;

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { user, isAuthenticated } = useAuth();

  useEffect(
    function () {
      async function getCities() {
        dispatch({ type: "loading" });
        try {
          const { data, error } = await supabase
            .from("Cities")
            .select(
              "cityName, country, emoji, dateVisited, id, latitude, longitude, userId"
            )
            .eq("userId", user.id);
          if (error) throw new Error("Failed to fetch data");
          dispatch({ type: "cities/loaded", payload: data });
        } catch (err) {
          console.error(err);
          dispatch({
            type: "rejected",
            payload: "There was an error fetching the cities",
          });
        }
      }
      if (isAuthenticated) getCities();
      else dispatch({ type: "reset" });
    },
    [isAuthenticated]
  );

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const { data, error } = await supabase
        .from("Cities")
        .select()
        .eq("id", id)
        .single();
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error fetching the city",
      });
    }
  }

  async function addCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const { data, error } = await supabase
        .from("Cities")
        .insert([newCity])
        .select()
        .single();
      const newCityData = {
        cityName: data.cityName,
        country: data.country,
        dateVisited: data.dateVisited,
        emoji: data.emoji,
        id: data.id,
        latitude: data.latitude,
        longitude: data.longitude,
        userId: data.userId,
      };
      dispatch({
        type: "city/added",
        payload: newCityData,
      });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error adding the city",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const { data, error } = await supabase
        .from("Cities")
        .delete()
        .eq("id", id)
        .select()
        .single();
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        addCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside its provider");
  return context;
}

export { CitiesProvider, useCities };

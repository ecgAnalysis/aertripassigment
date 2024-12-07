import { createContext, useContext, useReducer } from "react";
const initialValues = { flightDetails: [] };
const FormContext = createContext(initialValues);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FLIGHT_RESPONSE": {
      // API Call
      return { ...state, flightDetails: action.response };
    }

    default:
      return state;
  }
};

export const FormContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  return (
    <FormContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);

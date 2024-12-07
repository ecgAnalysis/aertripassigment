import "./App.css";
import { lazy, Suspense } from "react";
import { FormContextProvider } from "./contextAPI/FormContext/FormContext";
import ErrorBoundary from "./errorBoundry/ErrorBoundry";

// Lazy loading the components
const CardResults = lazy(() => import("./components/CardResults/CardResults"));
const FlightSearch = lazy(() => import("./components/forms/FlightSearch/Form"));
const Header = lazy(() => import("./components/header/Header"));

function App() {
  return (
    <>
      <FormContextProvider>
        <div className="sticky-header">
          {/* Heading */}
          <ErrorBoundary>
            <Suspense fallback={<div> </div>}>
              <Header />
            </Suspense>
          </ErrorBoundary>
          <div className="container">
            {/* Flight search component */}
            <ErrorBoundary>
              <Suspense fallback={<div> </div>}>
                <FlightSearch />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
        <div className="main">
          {/*  Flight data cards with sort  */}
          <ErrorBoundary>
            <Suspense fallback={<div> </div>}>
              <CardResults />
            </Suspense>
          </ErrorBoundary>
        </div>
      </FormContextProvider>
    </>
  );
}

export default App;

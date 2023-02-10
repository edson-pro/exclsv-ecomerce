import { Suspense, useState } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { Router, Routes, useRoutes } from "react-router";
import routes from "./constraints/routes";
import { AuthProvider } from "./context/authContext";
import { ToastProvider } from "./context/toastContext";
import { ReactQueryDevtools } from "react-query/devtools";

const App = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      })
  );

  const appRoutes = useRoutes(routes);
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}

        <AuthProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <ToastProvider>{appRoutes}</ToastProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;

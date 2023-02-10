import Head from "next/head";
import { Layout } from "../components/Layout";
import { AuthProvider } from "../context/authContext";
import "../styles/globals.css";
import "../styles/slick.css";
import "../styles/progress.css";
import NProgress from "nprogress";

import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import { ReactQueryDevtools } from "react-query/devtools";
import { useEffect, useState } from "react";
import { ToastProvider } from "../context/toastContext";
import { PageProvider } from "../context/pageContext";
import { CartProvider } from "../context/cartContext";

declare global {
  interface Window {
    FB: any;
  }
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", (e) => {
      NProgress.start();
      NProgress.set(0.3);
    });
    router.events.on("routeChangeError", () => {
      NProgress.done();
    });
    router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });

    return () => {
      router.events.off("routeChangeStart", (e) => {
        NProgress.start();
        NProgress.set(0.3);
      });
      router.events.off("routeChangeError", () => {
        NProgress.done();
      });
      router.events.off("routeChangeComplete", () => {
        NProgress.done();
      });
    };
  }, []);

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

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Head>
        <title>exclsv</title>
      </Head>
      <PageProvider>
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <Layout>
                <Toaster position="bottom-right" reverseOrder={false} />
                <Component {...pageProps} />
              </Layout>
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </PageProvider>
    </QueryClientProvider>
  );
}

export default MyApp;

import Layout from "../components//Layout/Layout";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import { StoreProvider } from "../store/Store";

// import { ApolloProvider } from "@apollo/client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// import { client } from "../lib/apollo";

import { GoogleAnalytics, event } from "nextjs-google-analytics";

const client = new ApolloClient({
  uri: "https://graphql.datocms.com/",
  cache: new InMemoryCache(),
});

export function reportWebVitals({ id, name, label, value }) {
  event(name, {
    category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    label: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  });
}

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <StoreProvider>
        <Layout>
          <GoogleAnalytics trackPageViews />
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Layout>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default MyApp;

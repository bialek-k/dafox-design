import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components//Layout/Layout";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import { StoreProvider } from "../store/Store";

import * as fbq from "../lib/fpixel";

import { GoogleAnalytics, event } from "nextjs-google-analytics";
import Script from "next/script";

export function reportWebVitals({ id, name, label, value }) {
  event(name, {
    category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    label: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  });
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [originalTitle, setOriginalTitle] = useState("");

  useEffect(() => {
    const handleTabChange = () => {
      if (document.hidden) {
        document.title = "Come back :) | Dafox Design";
      } else {
        document.title = originalTitle;
      }
    };
    if (!originalTitle) {
      setOriginalTitle(document.title);
    }

    window.addEventListener("visibilitychange", handleTabChange);
    return () =>
      window.removeEventListener("visibilitychange", handleTabChange);
  }, [originalTitle]);

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    fbq.pageview();

    const handleRouteChange = () => {
      fbq.pageview();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider>
      <StoreProvider>
        <Layout>
          <GoogleAnalytics trackPageViews />
          <Script
            id="fb-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
            }}
          />
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default MyApp;

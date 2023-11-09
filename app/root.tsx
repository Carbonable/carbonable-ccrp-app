import { json, type LinksFunction, type LoaderArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import styles from "~/styles/app.css";
import Header from "./components/menu/Header";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export async function loader({ request }: LoaderArgs) {  
  return json({graphQLEndpoint: process.env.GRAPHQL_ENDPOINT});
}

export default function App() {
  const { graphQLEndpoint } = useLoaderData();

  const graphQLClient = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: graphQLEndpoint,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
    cache: new InMemoryCache(),
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-neutral-800 text-neutral-100">
        <ApolloProvider client={graphQLClient}>
          <header className="fixed top-0 w-full z-50">
            <Header />
          </header>
          <menu className="fixed bottom-0 w-full z-50">
            Menu
          </menu>
          <main className="px-4 py-8 md:px-8 mt-[80px] relative w-screen mx-auto 2xl:max-w-6xl font-inter">
            <Outlet />
          </main>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </ApolloProvider>
      </body>
    </html>
  );
}

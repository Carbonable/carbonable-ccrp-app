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
import Menu from "./components/Menu";
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
      <body className="bg-neutral-800 text-neutral-100 relative w-screen mx-auto 2xl:max-w-6xl">
        <ApolloProvider client={graphQLClient}>
          <Menu />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </ApolloProvider>
      </body>
    </html>
  );
}

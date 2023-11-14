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
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import Menu from "./components/menu/Menu";
import { useState } from "react";
import Header from "./components/menu/Header";

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

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-neutral-800 text-neutral-100 font-inter">
        <ApolloProvider client={graphQLClient}>
          <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <main className="p-4 ml-0 mt-[66px] lg:p-8 lg:mt-0 lg:pl-[222px] lg:mx-auto max-w-full lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
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

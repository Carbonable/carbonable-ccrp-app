import { json, redirect, type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { getSession } from "utils/sessions.server";
import { Tab } from '@headlessui/react'
import NetZeroOverview from "~/components/dashboard/NetZeroOverview";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Carbon Contribution Portfolio Manager" },
    { name: "description", content: "Carbonable - Carbon Contribution Portfolio Manager" },
  ];
};

export async function loader({ request }: LoaderArgs) {
  if (process.env.ENABLE_EMAIL_VERIFICATION === "true") {
    const session = await getSession(request.headers.get("Cookie"));
    const data = await session.get("data");

    if (data === undefined) return redirect("/login");

    // Try to parse the data
    if (typeof data === "string") {
      try {
        if (!JSON.parse(data).data?.hasOwnProperty("userId")) return redirect("/login");
      } catch (error) {
        return redirect("/login");
      }
    }
  }
  
  return json({});
}

export default function Index() {

  return (
    <div className="">
      <Tab.Group>
        <Tab.List>
          <Tab>Net Zero Overview</Tab>
          <Tab>Business Units Allocation</Tab>
          <Tab>Project Allocation</Tab>
          <Tab>Reporting</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel><NetZeroOverview /></Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
          <Tab.Panel>Content 4</Tab.Panel>
        </Tab.Panels>
    </Tab.Group>
    </div>
  );
}

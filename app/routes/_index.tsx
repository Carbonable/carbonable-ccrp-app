import { json, redirect, type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { getSession } from "utils/sessions.server";
import DashboardTabs from "~/components/dashboard/DashboardTabs";
import DefaultLayout from "~/layouts/DefaultLayout";

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
    <DefaultLayout>
      <div className="mt-8">
        <DashboardTabs />
      </div>
    </DefaultLayout>
  );
}

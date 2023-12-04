import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"
import BackButton from "~/components/common/BackButton";
import SecondaryButton from "~/components/common/Buttons";
import DefaultLayout from "~/layouts/DefaultLayout";
import GlobalData from "~/components/business-units/GlobalData";
import Title from "~/components/common/Title";
import ProjectFundingAllocation from "~/components/business-units/ProjectFundingAllocation";
import DecarbonationOverview from "~/components/business-units/Decarbonation";
import ProjectsMetrics from "~/components/business-units/ProjectsMetrics";
import ProjectImpact from "~/components/business-units/Impact";

export async function loader({ params }: LoaderArgs) {
    return json({ id: params.id });
}

export default function Index() {
    const { id } = useLoaderData();

    return (
        <>
            <DefaultLayout>
                <BackButton link="/?opentab=businessunit" />
                <div className="flex justify-between items-center mt-12 px-4">
                    <div className="text-xl uppercase">
                        Business unit {id}
                    </div>
                    <div className="text-right">
                        <SecondaryButton>Add allocation</SecondaryButton>
                    </div>
                </div>
                <GlobalData />
                <div className="mt-16">
                    <Title title="Projects Allocation" />
                    <ProjectFundingAllocation />
                </div>
                <div className="mt-16">
                    <Title title="Projected decarbonation" />
                    <DecarbonationOverview />
                </div>
                <div className="mt-16">
                    <Title title="Project metrics" />
                    <ProjectsMetrics />
                </div>
                <div className="mt-16 mb-12">
                    <Title title="Impact metrics" />
                    <ProjectImpact businessUnitId={id} />
                </div>
            </DefaultLayout>
        </>
    )
}
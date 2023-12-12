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
import { BUSINESS_UNITS_DETAILS } from "~/graphql/queries/business-units";
import { useQuery } from "@apollo/client";
import type { BusinessUnit } from "~/graphql/__generated__/graphql";
import { useState } from "react";
import AllocationDialogComponent from "~/components/common/Dialog";
import { AllocationType } from "~/types/allocation";

export async function loader({ params }: LoaderArgs) {
    return json({ id: params.id });
}

export default function Index() {
    const { id } = useLoaderData();
    const [isOpen, setIsOpen] = useState(false);
    const { loading, error, data } = useQuery(BUSINESS_UNITS_DETAILS, {
        variables: {
            id: id
        }
    });

    const businessUnit: BusinessUnit = data?.businessUnitDetails;

    const openAllocation = () => {
        setIsOpen(true);
    }

    if (loading) {
        return (
            <DefaultLayout>
                <div className="flex justify-between items-center mt-12 px-4">
                    <div className="text-xl uppercase">
                        Loading...
                    </div>
                    <div className="text-right">
                        <SecondaryButton>Add allocation</SecondaryButton>
                    </div>
                </div>
            </DefaultLayout>
        )
    }

    if (error) {
        console.error(error);

        return (
            <DefaultLayout>
                <div className="flex justify-between items-center mt-12 px-4">
                    <div className="text-xl uppercase">
                        Error
                    </div>
                    <div className="text-right">
                        <SecondaryButton>Add allocation</SecondaryButton>
                    </div>
                </div>
            </DefaultLayout>
        )
    }

    return (
        <>
            <DefaultLayout>
                <BackButton link="/?opentab=businessunit" />
                <div className="flex justify-between items-center mt-12 pl-4">
                    <div className="text-xl uppercase">
                        {businessUnit.name}
                    </div>
                    <div className="text-right">
                        <SecondaryButton onClick={openAllocation}>Add allocation</SecondaryButton>
                    </div>
                </div>
                <div className="mt-16">
                    <GlobalData businessUnitId={id} />
                </div>
                <div className="mt-16">
                    <Title title="Projects Allocation" />
                    <ProjectFundingAllocation businessUnitId={id} />
                </div>
                <div className="mt-16">
                    <Title title="Projected decarbonation" />
                    <DecarbonationOverview businessUnitId={id} />
                </div>
                <div className="mt-16">
                    <Title title="Project metrics" />
                    <ProjectsMetrics businessUnitId={id} />
                </div>
                <div className="mt-16 mb-12">
                    <Title title="Impact metrics" />
                    <ProjectImpact businessUnitId={id} />
                </div>
            </DefaultLayout>
            <AllocationDialogComponent isOpen={isOpen} setIsOpen={setIsOpen} businessUnitId={id} type={AllocationType.BU} />
        </>
    )
}
import PorfolioTabs from "~/components/portfolio/PortfolioTabs";
import DefaultLayout from "~/layouts/DefaultLayout";

export default function Index() {
    return (
        <DefaultLayout>
            <div className="mt-8">
                <PorfolioTabs />
            </div>
        </DefaultLayout>
    )
}
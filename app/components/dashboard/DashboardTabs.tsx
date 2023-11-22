import * as Tabs from '@radix-ui/react-tabs';
import NetZeroOverview from './NetZeroOverview';
import BusinessUnitAllocation from './BusinessUnitsAllocation';
import Reporting from './Reporting';
import { useSearchParams } from '@remix-run/react';

export default function DashboardTabs() {
    const [searchParams] = useSearchParams();
    const openTab = searchParams.get('opentab');
    console.log(openTab);
    
    const triggerClassName = 'px-4 py-2 flex-1 flex items-center justify-center text-sm lg:text-base whitespace-nowrap bg-neutral-800 text-neutral-200 border border-opacityLight-5 first:rounded-l-lg last:rounded-r-lg hover:text-neutral-100 hover:cursor-pointer data-[state=active]:text-neutral-100 data-[state=active]:bg-neutral-700';
    const contentClassName = 'grow py-6 outline-none w-full flex-wrap whitespace-nowrap';
    
    return (
        <Tabs.Root defaultValue={openTab ? openTab : "netzero" } className='flex flex-col w-full'>
            <Tabs.List className="shrink-0">
                <div className='w-full md:w-fit flex overflow-x-scroll'>
                    <Tabs.Trigger value="netzero" className={triggerClassName}>Net Zero Overview</Tabs.Trigger>
                    <Tabs.Trigger value="businessunit" className={triggerClassName}>Business Units Allocation</Tabs.Trigger>
                    <Tabs.Trigger value="reporting" className={triggerClassName}>Reporting</Tabs.Trigger>
                </div>
                <div className='w-full'>
                    <Tabs.Content value="netzero" className={contentClassName}><NetZeroOverview /></Tabs.Content>
                    <Tabs.Content value="businessunit" className={contentClassName}><BusinessUnitAllocation /></Tabs.Content>
                    <Tabs.Content value="reporting" className={contentClassName}><Reporting /></Tabs.Content>
                </div>
            </Tabs.List>
        </Tabs.Root>
    );
}
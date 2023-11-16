import * as Tabs from '@radix-ui/react-tabs';
import Overview from './Overview';
import CarbonManagement from './CarbonManagement';
import Tracking from './Tracking';
import ProjectImpact from './Impact';
import type { SanityContent } from '~/utils/sanity/types';

export default function ProjectTabs({ mapboxKey, slug, trackingActivated, content}: { mapboxKey: string, slug: string, trackingActivated: boolean, content: SanityContent}) {
    const triggerClassName = 'px-4 py-2 flex-1 flex items-center justify-center text-sm lg:text-base whitespace-nowrap bg-neutral-800 text-neutral-200 border border-opacityLight-5 first:rounded-l-lg last:rounded-r-lg hover:text-neutral-100 hover:cursor-pointer data-[state=active]:text-neutral-100 data-[state=active]:bg-neutral-700';
    const contentClassName = 'grow py-6 outline-none w-full relative';
    return (
        <Tabs.Root defaultValue="overview">
            <Tabs.List className="">
                <div className='w-full md:w-fit flex overflow-x-scroll z-20'>
                    <Tabs.Trigger value="overview" className={triggerClassName}>Overview</Tabs.Trigger>
                    <Tabs.Trigger value="management" className={triggerClassName}>Carbon management</Tabs.Trigger>
                    <Tabs.Trigger value="tracking" className={triggerClassName}>Tracking</Tabs.Trigger>
                    <Tabs.Trigger value="impact" className={triggerClassName}>Impact</Tabs.Trigger>
                </div>
                <div className='w-full relative'>
                    <Tabs.Content value="overview" className={contentClassName}><Overview content={content} /></Tabs.Content>
                    <Tabs.Content value="management" className={contentClassName}><CarbonManagement /></Tabs.Content>
                    <Tabs.Content value="tracking" className={contentClassName}><Tracking mapboxKey={mapboxKey} slug={slug} trackingActivated={trackingActivated} /></Tabs.Content>
                    <Tabs.Content value="impact" className={contentClassName}><ProjectImpact /></Tabs.Content>
                </div>
            </Tabs.List>
        </Tabs.Root>
    )
}
import * as Tabs from '@radix-ui/react-tabs';
import Overview from './Overview';
import ProjectAllocation from './ProjectAllocation';

export default function PorfolioTabs() {
    const triggerClassName = 'px-4 py-2 flex-1 flex items-center justify-center text-sm lg:text-base whitespace-nowrap bg-neutral-800 text-neutral-200 border border-opacityLight-5 first:rounded-l-lg last:rounded-r-lg hover:text-neutral-100 hover:cursor-pointer data-[state=active]:text-neutral-100 data-[state=active]:bg-neutral-700';
    const contentClassName = 'grow py-6 outline-none w-full flex-wrap whitespace-nowrap';
    return (
        <Tabs.Root defaultValue="overview" className='flex flex-col w-full'>
            <Tabs.List className="shrink-0">
                <div className='w-fit flex overflow-x-scroll z-20'>
                    <Tabs.Trigger value="overview" className={triggerClassName}>Overview</Tabs.Trigger>
                    <Tabs.Trigger value="management" className={triggerClassName}>Carbon management</Tabs.Trigger>
                </div>
                <div className='w-full'>
                    <Tabs.Content value="overview" className={contentClassName}><Overview /></Tabs.Content>
                    <Tabs.Content value="management" className={contentClassName}><ProjectAllocation /></Tabs.Content>
                </div>
            </Tabs.List>
        </Tabs.Root>
    );
}
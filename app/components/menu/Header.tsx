import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header({ openMenu, setOpenMenu }: { openMenu: boolean, setOpenMenu: (open: boolean) => void}) {
    
    return (
        <div className="fixed top-0 w-full z-50 lg:hidden">
            <div className="w-full flex items-center justify-start bg-neutral-900/90 backdrop-blur-sm p-4">
                { !openMenu && <Bars3Icon className="w-8 h-8 text-neutral-100 border rounded-full p-1" onClick={() => setOpenMenu(true)} /> }
                { openMenu && <XMarkIcon className="w-8 h-8 text-neutral-100 border rounded-full p-1" onClick={() => setOpenMenu(false)} /> }
                <img src="/assets/images/logo.svg" alt="Carbonable logo" className="w-36 ml-8" />
            </div>
        </div>
    )
}
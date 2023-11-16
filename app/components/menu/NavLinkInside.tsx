import { NavLink } from "@remix-run/react";
import { useState } from "react";

export default function NavLinkInside({link, setOpenMenu}: {link: any, setOpenMenu: (open: boolean) => void}) {
    const [isShown, setIsShown] = useState(true);

    return (
        <>
            {link.isOpen && 
                <NavLink key={link.label} className="uppercase font-inter text-base" to={link.href} onClick={() => setOpenMenu(false)} >
                    {({ isActive }) => (
                        <div className={`w-full flex justify-start items-center ${isActive ? "" : "hover:brightness-125"}`}>
                            <div className={`w-[3px] h-[48px] ${isActive ? "bg-primary" : "bg-transparent"}`}></div>
                            <div className={`flex justify-start items-center pl-6 w-full ${isActive ? "text-primary bg-menu-selected" : "text-neutral-200"}`}>
                                <img src={isActive ? `/assets/images/menu/${link.icon}-active.svg` : `/assets/images/menu/${link.icon}.svg`} alt={`${link.icon}_active`} className="w-6 h-6" />
                                <div className="py-3 pl-2">{link.label}</div>
                            </div>
                        </div>
                    )}
                </NavLink>
            }
            {link.isOpen === false && 
                <div key={link.label} className="uppercase font-inter text-base">
                    <div className="w-full flex justify-start items-center">
                        <div className="w-[3px] h-[44px] bg-transparent"></div>
                        <div className="flex justify-start items-center py-2 pl-6 text-neutral-400 cursor-default" onMouseEnter={() => setIsShown(false)} onMouseLeave={() => setIsShown(true)}>
                            <img src={`/assets/images/menu/${link.icon}-inactive.svg`} alt={`${link.icon}_inactive`} className="w-6 h-6 " />
                            {isShown && <div className="py-3 pl-2">{link.label}</div> }
                            {!isShown && <div className="py-3 pl-2">COMING SOON</div> }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
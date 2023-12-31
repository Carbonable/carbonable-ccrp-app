import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "@remix-run/react";

export default function BackButton({link }: {link?: string}) {
    const navigate = useNavigate();
    const resolvedPath = useLocation();

    if (link) {
        return (
            <>
                <div className="items-center">
                    <span className="flex cursor-pointer text-neutral-200 hover:text-neutral-100" onClick={() => navigate(link)}>
                        <ArrowLeftIcon className="w-4 mr-2" />Back
                    </span>
                </div>
            </>
        )
    }

    return (
        <>
            { resolvedPath.pathname.split( '/' ).length > 2 && 
                <div className="items-center">
                    <span className="flex cursor-pointer text-neutral-200 hover:text-neutral-100" onClick={() => navigate(`/${resolvedPath.pathname.split( '/' )[1]}`)}>
                        <ArrowLeftIcon className="w-4 mr-2" />Back
                    </span>
                </div>
            }
        </>
    )
}
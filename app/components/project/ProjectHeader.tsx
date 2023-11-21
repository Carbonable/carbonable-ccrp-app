import DefaultLayout from "~/layouts/DefaultLayout";
import BackButton from "../common/BackButton";
import ProjectInfo from "./info/ProjectInfo";
import { GreenButton } from "../common/Buttons";

export default function ProjectHeader() {
    const handleAction = () => {
        console.log("Allocate");
    }
    return (
        <>
            <div className="bg-project-info">
                <DefaultLayout>
                    <BackButton />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                        <div className="order-1 lg:order-2">
                            Project image
                        </div>
                        <div className="order-2 lg:order-1 lg:col-span-2">
                            <ProjectInfo />
                            <div className="mt-4">
                                <GreenButton className="w-full" onClick={handleAction}>Allocate</GreenButton>
                            </div>
                        </div>
                    </div>
                </DefaultLayout>
            </div>
        </>
    )
}
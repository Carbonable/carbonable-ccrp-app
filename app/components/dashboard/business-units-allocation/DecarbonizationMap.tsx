import SecondaryButton from "~/components/common/Buttons";
import Block from "./Block";

export default function DecarbonizationMap() {
    const handleAddBlock = () => {
        console.log('add block');
    }

    const blocks = [1, 2];

    return (
        <>
            <div className="flex justify-between items-center flex-wrap">
                <div className="font-extrabold text-neutral-100 text-lg uppercase w-full md:w-fit">
                    Decarbonization map
                </div>
                <div className="text-right w-full mt-4 md:w-fit">
                    <SecondaryButton onClick={handleAddBlock}>Add block</SecondaryButton>
                </div>
            </div>
            <div className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                    {blocks.map((block: any, idx: number) => (
                        <Block key={`block_${idx}`} block={block} />
                    ))}
                </div>
            </div>
        </>
    )
}
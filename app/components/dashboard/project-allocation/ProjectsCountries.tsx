import type { LocalizationRepartition } from "~/graphql/__generated__/graphql";
import { getNumericPercentage } from "~/utils/utils";

export default function ProjectsCountries({ countries }: { countries: LocalizationRepartition[] }) {
    let countriesToSort = [...countries];
    countriesToSort.sort((a, b) => {
        const bValue = getNumericPercentage(b.value);
        const aValue = getNumericPercentage(a.value);
        return bValue - aValue;
    });
    
    return (
        <div>
            <div className="w-full h-full md:mt-4 md:max-h-[420px] md:overflow-x-scroll">
                {countriesToSort.map((country, index) => (
                    <ProjectCountriesDetails key={index} country={country} />
                ))}
            </div>
        </div>
    )
}

function ProjectCountriesDetails({ country }: { country: LocalizationRepartition }) {
    return (
        <div className="flex justify-start px-4 mt-8 w-full">
            <div className="text-4xl">
               {country.country.flag}
            </div>
            <div className="w-full pl-4">
                <div className="text-neutral-300 text-sm font-inter">{country.country.name}</div>
                <div className="flex items-center mt-1">
                    <div className="w-full bg-opacityLight-5 rounded-full h-2">
                        <div className="bg-greenish-700 h-2 rounded-full" style={{width: `${getNumericPercentage(country.value)}%`}}></div>
                    </div>
                    <div className="text-neutral-300 text-xs font-inter ml-3">{getNumericPercentage(country.value)}%</div>
                </div>
                
            </div>
        </div>
    )
}
import VeterinarianCard from "./card";
import Header from "../ui/header";
import {MapIcon} from "@heroicons/react/outline";
import {useState} from "react";
import Mapbox from "../mapbox/mapbox";

export default function VeterinariansList ({ veterinarians }) {
    const [showMap, setShowMap] = useState(true);

    const toggleMap = () => {
        setShowMap(!showMap);
    }

    const buttons = [
        { name: 'Show map', icon: MapIcon, theme: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", action: toggleMap },
    ]

    return (
        <>
            <Header title="Veterinarians" buttons={buttons}/>
            {veterinarians.length && !showMap &&
                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {veterinarians.map((veterinarian) => (
                        <VeterinarianCard key={veterinarian.id} veterinarian={veterinarian} />
                    ))}
                </ul>
            }
            {veterinarians.length && showMap &&
                <Mapbox items={veterinarians}/>
            }
            {!veterinarians.length &&
                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <h1>No veterinarians...</h1>
                </ul>
            }
        </>
    )
}
import {useEffect, useState} from "react";
import MapMarker from "./marker";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
const mapboxSdk = require("@mapbox/mapbox-sdk");
const mapboxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

mapboxgl.accessToken = 'pk.eyJ1IjoiYXNwaXJlY3lhIiwiYSI6ImNsMXAxOWgybzA1bHkzY29hNXJoNzNwd2sifQ.XL6Du70IWpUk-UyoTNOJNQ';
let baseClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
let geocodingService = mapboxGeocoding(baseClient);

export default function Mapbox ({ items }) {
    const [modal, setModal] = useState(false);
    const [selectedVeterinarian, setSelectedVeterinarian] = useState(items[0]);

    const [pageIsMounted, setPageIsMounted] = useState(false)
    const [lat, setLat] = useState(48.855946645523325);
    const [lng, setLng] = useState(2.3402352134211224);
    const [zoom, setZoom] = useState(10);

    function handleModal(condition) {
        setModal(condition);
    }

    function handleSelectedMarker(marker) {
        setSelectedVeterinarian(marker);
    }

    function randomMarker() {
        const markers = [
            'data:image/png;base64,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',
            'data:image/png;base64,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',
            'data:image/png;base64,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',
            'data:image/png;base64,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'
        ];

        return markers.sort(() => 0.5 - Math.random()).slice(0, 1);
    }

    useEffect(() => {
        setPageIsMounted(true)

        const map = new mapboxgl.Map({
            container: "mapbox-element",
            center: [lng, lat],
            zoom: zoom,
            style: "mapbox://styles/mapbox/streets-v11",
        });

        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
            })
        );

        items.forEach((element, index) => {
            const queryAddress = `${element.address} ${element.city} ${element.zip_code}`;

            geocodingService
                .forwardGeocode({
                    countries: ['fr'],
                    query: queryAddress.trim(),
                    autocomplete: false,
                    limit: 1
                })
                .send()
                .then((response) => {
                    if (
                        !response ||
                        !response.body ||
                        !response.body.features ||
                        !response.body.features.length
                    ) {
                        console.error('Invalid response:');
                        console.error(response);
                        return;
                    }
                    const feature = response.body.features[0];

                    const el = document.createElement("div");
                    const width = 32;
                    const height = 32;
                    el.className = "marker";
                    el.style.backgroundImage = `url('${randomMarker()}')`;
                    el.style.width = `${width}px`;
                    el.style.height = `${height}px`;
                    el.style.backgroundSize = "100%";
                    el.dataset.id = element.id;
                    el.addEventListener("click", () => {
                        handleSelectedMarker(element);
                        handleModal(true);
                    });

                    new mapboxgl.Marker(el).setLngLat(feature.center).addTo(map);
                });
        });
    }, [])

    return (
        <div className="min-h-screen min-w-full flex justify-center">
            <MapMarker open={modal} setOpen={handleModal} selectedVeterinarian={selectedVeterinarian}></MapMarker>
            <div id="mapbox-element" className="rounded-xl shadow-xl" style={{ height: 800, width: 1200 }}/>
        </div>
    )
}
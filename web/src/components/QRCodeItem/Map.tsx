import { Map, Marker } from "pigeon-maps"


export function MapWithPoint({lat, long}: {lat: number, long: number}) {
    return (
        <Map defaultCenter={[lat, long]}  height={150} defaultZoom={17} dprs={[1, window.devicePixelRatio]} attribution={false}>
            <Marker width={30} color="var(--color-amber-600)" anchor={[lat, long]}/>
        </Map>
    );
}
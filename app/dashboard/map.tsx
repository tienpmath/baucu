"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { LatLngExpression } from "leaflet"
import "leaflet/dist/leaflet.css"

type Point = {
 name: string
 voted: number
 percent: number
}

export default function Map({ points }: { points: Point[] }) {

 const center: LatLngExpression = [11.94, 108.44]

 return (

<MapContainer
center={center}
zoom={14}
style={{ height: "400px", width: "100%" }}
>

<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

{points.map((p, i) => (

<Marker
key={i}
position={[11.94 + i * 0.002, 108.44 + i * 0.002]}
>

<Popup>

<b>{p.name}</b>

<br/>

Đã bầu: {p.voted}

<br/>

Tỷ lệ: {p.percent.toFixed(1)}%

</Popup>

</Marker>

))}

</MapContainer>

 )

}
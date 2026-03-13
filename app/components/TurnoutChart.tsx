import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer
} from "recharts";

export default function TurnoutChart({data}:any){

 return(

<div className="bg-slate-800 p-6 rounded-xl">

<h2 className="text-xl mb-4">
Tỷ lệ cử tri theo khung giờ
</h2>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={data}>

<XAxis dataKey="thoiGian" />

<YAxis/>

<Tooltip/>

<Bar dataKey="daBau" fill="#4ade80" />

</BarChart>

</ResponsiveContainer>

</div>

 )
}
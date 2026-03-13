"use client"

import { useEffect,useState } from "react"
import {
 BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,
 LineChart,Line,
 RadialBarChart,RadialBar
} from "recharts"

const pollingStations=[
{name:"Khu vực bỏ phiếu số 1",voters:1200},
{name:"Khu vực bỏ phiếu số 2",voters:980},
{name:"Khu vực bỏ phiếu số 3",voters:1050},
{name:"Khu vực bỏ phiếu số 4",voters:1120},
{name:"Khu vực bỏ phiếu số 5",voters:990},
{name:"Khu vực bỏ phiếu số 6",voters:870},
{name:"Khu vực bỏ phiếu số 7",voters:950},
{name:"Khu vực bỏ phiếu số 8",voters:1100},
{name:"Khu vực bỏ phiếu số 9",voters:1020},
{name:"Khu vực bỏ phiếu số 10",voters:890},
{name:"Khu vực bỏ phiếu số 11",voters:930},
{name:"Khu vực bỏ phiếu số 12",voters:970},
{name:"Khu vực bỏ phiếu số 13",voters:1000}
]

export default function Dashboard(){

const [sheet,setSheet]=useState<any[]>([])
const [selectedTime,setSelectedTime]=useState("")

useEffect(()=>{

const loadData=()=>{

fetch("https://opensheet.elk.sh/1mhBjez6Bk1QlIQKNi96uppophZ493N8MN3wQ039y7x8/1")
.then(r=>r.json())
.then(setSheet)

}

loadData()

const t=setInterval(loadData,30000)

return()=>clearInterval(t)

},[])

const toNumber=(v:any)=>{
const n=Number(v)
return isNaN(n)?0:n
}

const timeSlots=[
...new Set(sheet.map((d:any)=>d["KHUNG GIỜ BÁO CÁO"]))
].filter(Boolean)

useEffect(()=>{
if(timeSlots.length&&!selectedTime){
setSelectedTime(timeSlots[timeSlots.length-1])
}
},[sheet])

const filtered=selectedTime
?sheet.filter((d:any)=>d["KHUNG GIỜ BÁO CÁO"]===selectedTime)
:sheet

const points=pollingStations.map(station=>{

const found=filtered.find(
(d:any)=>d["kHU VỰC BỎ PHIẾU"]===station.name
)

const voted=found
?toNumber(found["Số Cử tri đã đi bầu"])
:0

const percent=(voted/station.voters)*100

return{
name:station.name,
voters:station.voters,
voted,
percent
}

})

const totalVoters=pollingStations.reduce((a,b)=>a+b.voters,0)
const totalVoted=points.reduce((a,b)=>a+b.voted,0)

const percent=((totalVoted/totalVoters)*100).toFixed(2)

const gaugeData=[{name:"progress",value:Number(percent)}]

const timeline=timeSlots.map(t=>{

const rows=sheet.filter(
(d:any)=>d["KHUNG GIỜ BÁO CÁO"]===t
)

let sum=0

pollingStations.forEach(station=>{

const latest=rows
.filter((r:any)=>r["kHU VỰC BỎ PHIẾU"]===station.name)
.pop()

if(latest){
sum+=toNumber(latest["Số Cử tri đã đi bầu"])
}

})

return{time:t,voted:sum}

})

const topStations=
[...points]
.sort((a,b)=>b.percent-a.percent)
.slice(0,5)

return(

<div className="bg-slate-950 text-white min-h-screen p-10">

<div className="text-center mb-10">

<h1 className="text-2xl md:text-3xl font-black leading-tight tracking-wide text-yellow-400 drop-shadow-lg">

TRUNG TÂM ĐIỀU HÀNH BẦU CỬ  
<br/>

<span className="text-white">
ĐẠI BIỂU QUỐC HỘI KHÓA XVI VÀ ĐẠI BIỂU HĐND CÁC CẤP
</span>

<br/>

<span className="text-orange-400">
NHIỆM KỲ 2026 - 2031
</span>

</h1>

<div className="mt-4 text-3xl font-extrabold text-green-400 tracking-widest drop-shadow-lg">

PHƯỜNG CAM LY - ĐÀ LẠT

</div>

<div className="w-96 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mx-auto mt-4 rounded-full"/>

</div>

{/* timeline */}

<div className="flex gap-3 justify-center mb-10 flex-wrap">

{timeSlots.map(t=>(

<button
key={t}
onClick={()=>setSelectedTime(t)}
className={`px-4 py-2 rounded-lg font-semibold
${selectedTime===t
?"bg-green-600 shadow-lg"
:"bg-slate-700 hover:bg-slate-600"}
`}
>
{t}
</button>

))}

</div>

{/* stats */}

<div className="grid grid-cols-3 gap-6 mb-10">

<div className="bg-blue-600 p-6 rounded-xl text-center shadow-lg">
<p className="opacity-80">Tổng cử tri</p>
<h2 className="text-4xl font-bold">{totalVoters}</h2>
</div>

<div className="bg-green-600 p-6 rounded-xl text-center shadow-lg">
<p className="opacity-80">Đã bỏ phiếu</p>
<h2 className="text-4xl font-bold">{totalVoted}</h2>
</div>

<div className="bg-red-600 p-6 rounded-xl text-center shadow-lg">
<p className="opacity-80">Tỷ lệ</p>
<h2 className="text-4xl font-bold">{percent}%</h2>
</div>

</div>

{/* gauge + top */}

<div className="grid grid-cols-2 gap-8 mb-10">

<div className="bg-slate-800 p-6 rounded-xl flex flex-col items-center">

<h2 className="mb-4 text-lg font-semibold">
Tiến độ toàn phường
</h2>

<RadialBarChart
width={320}
height={200}
innerRadius="70%"
outerRadius="100%"
data={gaugeData}
startAngle={180}
endAngle={0}
>

<RadialBar
dataKey="value"
fill="#22c55e"
/>

</RadialBarChart>

<div className="text-4xl font-bold text-green-400">
{percent}%
</div>

</div>

<div className="bg-slate-800 p-6 rounded-xl">

<h2 className="mb-4 text-lg font-semibold">
Top điểm bầu nhanh nhất
</h2>

<table className="w-full">

<tbody>

{topStations.map((p,i)=>(

<tr key={i} className="border-b border-slate-700">

<td className="p-2">{p.name}</td>

<td className="text-green-400 font-semibold">
{p.percent.toFixed(1)}%
</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

{/* charts */}

<div className="grid grid-cols-2 gap-8 mb-10">

<div className="bg-slate-800 p-6 rounded-xl">

<h2 className="mb-4 font-semibold">
Tiến độ 13 điểm
</h2>

<ResponsiveContainer width="100%" height={350}>

<BarChart data={points}>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="voted" fill="#22c55e"/>

</BarChart>

</ResponsiveContainer>

</div>

<div className="bg-slate-800 p-6 rounded-xl">

<h2 className="mb-4 font-semibold">
Tiến độ theo giờ
</h2>

<ResponsiveContainer width="100%" height={350}>

<LineChart data={timeline}>

<XAxis dataKey="time"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="voted"
stroke="#22c55e"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>

</div>

{/* table */}

<div className="bg-slate-800 p-6 rounded-xl">

<h2 className="mb-4 text-lg font-semibold">
Chi tiết 13 điểm bầu cử
</h2>

<table className="w-full text-sm">

<thead>

<tr className="border-b border-slate-600">

<th className="p-2 text-left">Điểm</th>
<th className="p-2">Cử tri</th>
<th className="p-2">Đã bầu</th>
<th className="p-2">%</th>

</tr>

</thead>

<tbody>

{points.map((p,i)=>(

<tr key={i} className="border-b border-slate-700">

<td className="p-2">{p.name}</td>

<td>{p.voters}</td>

<td>{p.voted}</td>

<td className="p-2">

<div className="w-full bg-slate-700 h-3 rounded">

<div
className={`h-3 rounded ${
p.percent>70?"bg-green-500":"bg-yellow-500"
}`}
style={{width:`${p.percent}%`}}
/>

</div>

<span className="text-xs">
{p.percent.toFixed(1)}%
</span>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}
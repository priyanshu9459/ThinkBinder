import React from 'react'
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis, LineChart, Line, Tooltip, Legend
} from "recharts";
export default function recharts() {
    const data = [
        { name: "Ram", students: 400 },
        { name: "Sohil", students: 700 },
        { name: "Kno", students: 200 },
        { name: "Mania", students: 800 },
    ];
    const datas = [
        { name: 'Jan', value: 10 },
        { name: 'Feb', value: 15 },
        // ... more data points
      ];
  return (
    <div className='container'>
      <h1>RechartJs</h1>
      <div>
      <b>{`npm install recharts`}</b><br/>
      <b>{`import { BarChart, Bar, CartesianGrid, XAxis, YAxis, LineChart, Line, Tooltip, Legend } from recharts`}</b> 
      </div>
    <div className='row col-12'>
        <div className='col-6'>
      
            <LineChart width={400} height={300} data={datas}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>   
     
        </div>
      <div className='col-6 right'>
      <BarChart width={600} height={300} data={data}>
            <Bar dataKey="students" fill="green" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
        </BarChart>
      </div>
    </div>
    <div className='container'>

    <b>3. Common Components:</b>
    LineChart: The main container for a line chart.<br/>
    Line: Represents a line in the line chart.<br/>
    BarChart: The main container for a bar chart.<br/>
    Bar: Represents a bar in the bar chart.<br/>
    PieChart: The main container for a pie chart.<br/>
    Pie: Represents a slice in the pie chart.<br/>
    XAxis and YAxis: Represent the x-axis and y-axis, respectively.<br/>
    Tooltip: Displays information when hovering over chart elements.<br/>
    Legend: Displays a legend for the chart.<br/>

   <b>4. Customization:</b><br/> 
    Recharts provides numerous options for customization, including the ability to customize colors, labels, axis ticks, legends, and more.<br/>

   <b>5. Responsive Charts:</b> 
    Recharts supports responsiveness out of the box. You can make your charts responsive to different screen sizes by adjusting the width and height based on the container size.<br/>

    <b>6. Real-Time Charts:</b>
    Recharts can be used for real-time charts by updating the data dynamically.<br/>

    <b>7. Interactivity:</b>
    Recharts supports interactivity features such as tooltip displays, click events, and animations.<br/>

    <b>8. Documentation:</b>
    Always refer to the official Recharts documentation for detailed information, examples, and advanced usage:<br/>
    
    <b><a href="http://recharts.org/">Recharts Documentation</a></b>
  
</div>

        </div>
  )
}

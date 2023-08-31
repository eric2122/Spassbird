import React  from 'react';
import { PieChart, Pie,CartesianGrid, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';


export default function StaticJokes() {

    const data = [
        {
          name: 'Page A',
          value:800000000
        },
        {
          name: 'Page B',
          value:1000000000 
        },
        {
          name: 'Page C',
          value:60000000000
        },
        {
          name: 'Page D',
          value: 30000000000
        },
        {
          name: 'Page E',
          value: 2000000000000
        },
        {
          name: 'Page F',
          value:900000000000
        },
        {
          name: 'Page G',
          value: 7000000000000
        },
      ];
  return (
    <div>
        
          <div>
          <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="200"
            cy="200"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
          </PieChart>

          <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
          </div>
    </div>
  )
};

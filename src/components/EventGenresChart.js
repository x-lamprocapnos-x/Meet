import { useState, useEffect } from 'react';
import { 
    ResponsiveContainer, 
    PieChart, 
    Pie,
    Cell, 
    Legend 
} from "recharts";

const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
const colors = ['#4F6A6C','#55846D','#567DB0', '#6556B0', '#B05698'];

const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const data = genres.map((genre) => {
            const filteredEvents = events.filter((event) =>
            event.summary.includes(genre)
            );
            return {
                name: genre,
                value: filteredEvents.length
            };
        });
        setData(data);
    }, [events]);

    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
        return percent ? (
          <text
            x={x}
            y={y}
            fill={colors[index]}
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
          >
            {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
          </text>
        ) : null;
      };

      return (
        <ResponsiveContainer width="99%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              fill="#8884d8"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
             > 
             {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );


}

export default EventGenresChart;
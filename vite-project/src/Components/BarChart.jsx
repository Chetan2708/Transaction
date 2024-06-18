import { Bar } from "react-chartjs-2";
import 'chart.js/auto';

const BarChart = ({data}) => {
  return (
    
<div className="sm:bg-white shadow-2xl sm:w-1/2 sm:flex sm:justify-center p-10  sm:h-96 rounded-2xl  ">

          <Bar
            data={{
                labels: Object.keys(data.barChart),
                datasets: [{
                    label: 'Number of Items',
                    data: Object.values(data.barChart),
                    backgroundColor: 'rgba(0, 255, 255, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            }}
            options={{
              scales: {
                  x: {
                      grid: {
                          display: false
                        }
                    }
                }
            }}
            />
            </div>
  )
}

export default BarChart
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';


const PieChart = ({data}) => {
  return (
<div className="sm:bg-white shadow-2xl sm:w-1/2 sm:flex sm:justify-center p-10  sm:h-96 rounded-2xl  ">
       
          <Pie
            data={{
              labels: Object.keys(data.pieChart),
              datasets: [{
                label: 'Items by Category',
                data: Object.values(data.pieChart),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)'
                ],
                borderWidth: 1
              }]
            }}
          />
    </div>
  )
}

export default PieChart
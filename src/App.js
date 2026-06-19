import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import { useState } from 'react';

function App() {
  const [filteredData, setFilteredData] = useState(buildings);
  const [activePage, setActivePage] = useState(1);
  const amountRows = 15;


  return (
    <div className="App">
      <h3>Самые высокие здания и сооружения</h3>
      <Chart data={filteredData} />
      <Table
        data={filteredData}
        fullData={buildings}
        amountRows={amountRows}
        activePage={activePage}
        setActivePage={setActivePage}
        updateDataTable={setFilteredData}
        showPagination={true} />
    </div>
  );
}
export default App;
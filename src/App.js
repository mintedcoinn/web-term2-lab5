import logo from './images/logo.svg';
import './CSS/App.css';
import Table from './components/Table.js';
import buildings from './data';

function App() {
  return (
    <div className="App">
      <h3>Самые высокие здания и сооружения</h3>
       <Table data={ buildings } />
    </div>
  );
}
export default App;

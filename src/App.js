import logo from './images/logo.svg';
import './CSS/App.css';
import TableRow from './components/TableRow';
import buildings from './data';

function App() {
  return (
    <div className="App">
      <h3>Самые высокие здания и сооружения</h3>
      <TableRow row={Object.keys(buildings[0])} isHead = "1" />
      <TableRow row={Object.values(buildings[0])} isHead = "0" />
    </div>
  );
}
export default App;

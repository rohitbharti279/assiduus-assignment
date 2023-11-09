
import './App.css';
import Invoices from './Components/Invoices';
import CheckingAccount from './Components/CheckingAccount';
import Content from './Components/Content';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import CashFlow from './Components/CashFlow';

function App() {
  return (
    <div className="App">
      {/* <Sidebar /> */}
      {/* <Header /> */}
      {/* <Content /> */}

      <div className='flex gap-2'>
        <CheckingAccount />
      <Invoices />
      </div>

      <CashFlow />
      
    </div>
  );
}

export default App;

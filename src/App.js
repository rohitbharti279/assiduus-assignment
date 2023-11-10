
import './App.css';
import Invoices from './Components/Invoices';
import CheckingAccount from './Components/CheckingAccount';
import Content from './Components/Content';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import TotalCashFlow from './Components/TotalCashFlow';
import AccountWatchlist from './Components/AccountWatchlist';

function App() {
  return (
    <div className="App">
      {/* <Sidebar /> */}
      {/* <Header /> */}
      {/* <Content /> */}

      {/* <div className='flex gap-2'>
        <CheckingAccount />
      <Invoices />
      </div> */}

      <div className='flex flex-col lg:flex-row gap-2'>
      <TotalCashFlow />
      <AccountWatchlist />
      </div>
    </div>
  );
}

export default App;


import './App.css';
import Content from './Components/Content';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <div className="App ">
      <Header />
      <div className='flex flex-col lg:flex-row '>
        <Sidebar />
      <Content />
      </div>
      

    </div>
  );
}

export default App;
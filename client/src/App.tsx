import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Dashboard } from './pages/dashboard';
import { Auth } from './pages/auth';
import { RecordsProvider } from './context/records-context';

function App() {

  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path='/' element={<RecordsProvider><Dashboard/></RecordsProvider>}/>
          <Route path='/auth' element={<Auth/>}/>
        </Routes>
      </div> 
    </Router>
  );
}

export default App
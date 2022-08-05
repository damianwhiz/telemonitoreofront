import {Routes,Route} from "react-router-dom";
import Login  from "./componentes/Login.jsx";
import Home from "./componentes/Home.jsx";
function App() {

  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react'
import './App.css'
import Table from "./components/Table"
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await axios("https://jsonplaceholder.typicode.com/users");
      setData(response.data);
    }

    loadData();
  }, [])

  return (
    <div className="App">
      <Table data={data}/>
    </div>
  )
}

export default App

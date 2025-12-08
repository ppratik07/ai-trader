import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { CreateWorkflow } from './components/CreateWorkflow'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/create-workflow' element={<CreateWorkflow />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

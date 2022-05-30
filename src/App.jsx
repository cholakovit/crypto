import { Routes, Route, Navigate } from 'react-router-dom'

import List from './main/List'
import Layout from './components/Layout'
import Home from './main/Home'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>

          <Route index element={<Home />} />

          <Route path='crypto'>
            <Route index element={<List />} />
          </Route>

          {/* Catch all - replace with 404 component if you want */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

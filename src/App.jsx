import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StateProvider } from './StateProvider'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Logout from './components/Logout'
import NavigationBar from './components/NavigationBar';
import './i18n';

const queryClient = new QueryClient();

function App() {
  return (
    <StateProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <NavigationBar />
            <Routes>
              <Route path='/' element={<Dashboard />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/logout' element={<Logout />}/>
            </Routes>
          </Router>
        </QueryClientProvider>
      </StateProvider>
  )
}

export default App

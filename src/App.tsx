import { Toaster } from 'react-hot-toast'
import './App.css'
import { WeatherProvider } from './contexts/weather.provider'
import Home from './pages/home'

const App = () => {
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
      />
      <WeatherProvider>
        <Home />
      </WeatherProvider>
    </>
  )
}

export default App

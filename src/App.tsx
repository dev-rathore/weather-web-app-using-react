import { Toaster } from 'react-hot-toast'
import './App.css'
import { WeatherProvider } from './contexts/weather.provider'
import Home from './pages/home'
import { ThemeProvider } from './contexts/theme.provider'

const App = () => {
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
      />
      <ThemeProvider>
        <WeatherProvider>
          <Home />
        </WeatherProvider>
      </ThemeProvider>
    </>
  )
}

export default App

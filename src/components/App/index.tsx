import { useEffect, useState } from 'react'
import { Card } from '../Card'
import './styles.scss'
import { isMobile } from 'react-device-detect'

type Geolocation = {
  country_code: string
  country_name: string
  city: string
  postal: string
  latitude: string
  longitude: string
  IPv4: string
  state: string
}

function App() {
  const [navigator, setNavigator] = useState<Navigator | null>(null)
  const [geolocation, setGeolocation] = useState<Geolocation | null>(null)

  useEffect(() => {
    // Set navigator from window obj
    const navigator = window && window.navigator ? window.navigator : null
    setNavigator(navigator)

    // Get ip
    const fetchIp = async () => {
      const res = await fetch('https://geolocation-db.com/json/')
      const data = await res.json()
      setGeolocation(data)
    }

    fetchIp()
  }, [])

  return (
    <div className="App">
      <h3>Your device information</h3>
      <Card
        title={'Device type'}
        description={isMobile ? 'Mobile' : 'Desktop (non-mobile)'}
      />
      {/* <Card
        title={'App version'}
        description={navigator?.appVersion}
      /> */}
      <Card
        title={'IP information'}
        description={`IP address(IPv4): ${geolocation?.IPv4}\nAddress: ${geolocation?.city}, ${geolocation?.state}, ${geolocation?.country_name}\nLatitude & Longitude: ${geolocation?.latitude}, ${geolocation?.longitude}`}
      />
      <Card title={'User Agent'} description={navigator?.userAgent} />
      <Card title={'Browser language'} description={navigator?.language} />
      <Card
        title={'Available languages'}
        description={navigator?.languages as string[]}
      />
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import { Card } from '../Card'
import './styles.scss'
import { isMobile } from 'react-device-detect'
import { Section } from '../Section'

type Geolocation = {
  country: string
  city: string
  zip: string
  lat: string
  lon: string
  query: string
  region: string
  regionName: string
  isp: string
  timezone: string
}

function App() {
  const [navigator, setNavigator] = useState<Navigator | null>(null)
  const [geolocation, setGeolocation] = useState<Geolocation | null>(null)

  useEffect(() => {
    // Set navigator from window obj
    const navigator = window && window.navigator ? window.navigator : null
    console.log(`navigator//: `, navigator)
    setNavigator(navigator)

    // Get ip
    const fetchIp = async () => {
      // docs: https://ip-api.com/
      const ipRes = await fetch(`http://ip-api.com/json/`)
      const ipData = await ipRes.json()
      console.log(`ipdata//: `, ipData)
      setGeolocation(ipData)
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
      <Section>
        <Card
          title={'IP address (IPv4)'}
          description={`${geolocation?.query}`}
        />
        <Card
          title={'IP location'}
          description={`${geolocation?.city}, ${
            geolocation?.region || geolocation?.regionName || '?'
          }, ${geolocation?.country} ${geolocation?.zip}`}
        />
        <Card
          title={'Latitude & Longitude'}
          description={`${geolocation?.lat}, ${geolocation?.lon}`}
        />
        <Card title={'ISP provider'} description={`${geolocation?.isp}`} />
      </Section>
      <Section>
        <Card title={'Timezone'} description={`${geolocation?.timezone}`} />
      </Section>
      <Card title={'User Agent'} description={navigator?.userAgent} />
      <Card
        title={'Connected to online'}
        description={navigator?.onLine ? 'Yes' : 'No'}
      />
      <Card
        title={'Connection type / downlink'}
        // @ts-ignore
        description={`${navigator?.connection?.effectiveType} / ${navigator?.connection?.downlink}`}
      />
      <Section>
        <Card title={'Browser language'} description={navigator?.language} />
        <Card
          title={'Available languages'}
          description={navigator?.languages as string[]}
        />
      </Section>
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import { Card } from '../Card'
import './styles.scss'
import { isMobile } from 'react-device-detect'
import { Section } from '../Section'

type Geolocation = {
  country_name: string
  city: string
  postal: string
  latitude: string
  longitude: string
  ip: string
  region: string
  org: string
}

type Dns = {
  geo: string
  ip: string
}

function App() {
  const [navigator, setNavigator] = useState<Navigator | null>(null)
  const [geolocation, setGeolocation] = useState<Geolocation | null>(null)
  const [dns, setDns] = useState<Dns | null>()

  useEffect(() => {
    // Set navigator from window obj
    const navigator = window && window.navigator ? window.navigator : null
    console.log(`navigator//: `, navigator)
    setNavigator(navigator)

    // Get ip
    const fetchIp = async () => {
      // docs: https://ip-api.com/
      const ipRes = await fetch('https://ipapi.co/json/')
      const ipData = await ipRes.json()
      console.log(`ipdata//: `, ipData)
      setGeolocation(ipData)

      const dnsRes = await fetch(`https://edns.ip-api.com/json`)
      const dnsData = await dnsRes.json()
      console.log(`dnsData//: `, dnsData)
      if (dnsData?.dns) {
        setDns(dnsData.dns)
      }
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
        <Card title={'IP address (IPv4)'} description={`${geolocation?.ip}`} />
        <Card
          title={'IP location'}
          description={`${geolocation?.city}, ${geolocation?.region}, ${geolocation?.country_name} ${geolocation?.postal}`}
        />
        <Card
          title={'Latitude & Longitude'}
          description={`${geolocation?.latitude}, ${geolocation?.longitude}`}
        />
        <Card title={'ISP provider'} description={`${dns?.geo}`} />
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

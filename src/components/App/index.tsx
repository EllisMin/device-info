import { useEffect, useState } from 'react'
import { Card } from '../Card'
import './styles.scss'
import { isMobile } from 'react-device-detect'
import { Section } from '../Section'
import moment from 'moment-timezone'
import platform from 'platform'

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
  const [deviceTime, setDeviceTime] = useState<Date>(new Date())
  const [realTime, setRealTime] = useState<Date>(new Date())
  const [timezone, setTimezone] = useState<null | string>(null)

  useEffect(() => {
    // Set navigator from window obj
    const navigator = window && window.navigator ? window.navigator : null
    console.log(`navigator//: `, navigator)
    setNavigator(navigator)
    console.log(`platform//: `, platform)

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

    const deviceTimeTimer = setInterval(() => {
      setDeviceTime(new Date())
    }, 1000)

    const realTimer = setInterval(() => {
      fetch('http://worldtimeapi.org/api/ip')
        .then((res) => res.json())
        .then((data) => {
          setRealTime(new Date(data.datetime))
          setTimezone(data.timezone)
        })
        .catch((err) => console.log(err))
    }, 1000)

    return () => {
      clearInterval(deviceTimeTimer)
      clearInterval(realTimer)
    }
  }, [])

  const formatDate = (date: Date) => {
    const newDate = moment(date)
    const pattern = `YYYY-MM-DD, hh:mm:ss A, ddd (UTCZ z)`
    const isDst = newDate.tz(moment.tz.guess()).isDST()
    const dstStr = `(DST: ${isDst ? 'Yes' : 'No'})`

    if (timezone) {
      return newDate.tz(timezone).format(pattern) + dstStr
    }
    return newDate.format(pattern) + dstStr
  }

  return (
    <div className="App">
      <h3>Your device information</h3>
      <Section>
        <Card
          title={'Device type'}
          description={isMobile ? 'Mobile' : 'Desktop (non-mobile)'}
        />
        <Card title={'Platform name'} description={platform.name} />
        <Card title={'Platform os'} description={platform.os} />
        <Card title={'Platform version'} description={platform.version} />
        <Card
          title={'Platform description'}
          description={platform.description}
        />
        <Card
          title={'Platform manufacturer'}
          description={platform.manufacturer}
        />
        <Card
          title={'Platform product'}
          description={platform.product}
        />
        {/* <Card title={'Platform layout'} description={platform.layout} /> */}
        <Card title={'User Agent'} description={navigator?.userAgent} />
      </Section>
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
      <Section>
        <Card title={'Device time'} description={formatDate(deviceTime)} />
        <Card title={'Local time'} description={formatDate(realTime)} />
        <Card title={'Local timezone'} description={timezone || ''} />
      </Section>

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

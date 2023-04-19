import { useState } from 'react'
import './styles.scss'

type Description = string | string[] | Object | null | undefined

type Props = {
  title: string
  description?: Description
  initialShow?: boolean
}

const parseDescription = (str: Description) => {
  if (!str || (typeof str === 'string' && str.includes('undefined'))) {
    return 'No information Available'
  }
  if (Array.isArray(str)) {
    return str.join(', ')
  }
  return str.toString()
}

export const Card = (props: Props) => {
  const { title, description, initialShow = true } = props

  const [show, setShow] = useState<boolean>(initialShow)
  const [copied, setCopied] = useState(false)

  const toggleCollapseButton = () => {
    setShow(!show)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(parseDescription(description))
      setCopied(true)
    } catch (err) {
      console.warn('Failed to copy content: ', err)
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-collapse-btn">
          <button
            className="btn-no-style collapse-btn"
            onClick={toggleCollapseButton}>
            {show ? '▼' : '▶'}
          </button>
          <div className="card-title">{`${title}:`}</div>
        </div>
        <button className="btn-no-style copy-btn" onClick={copyToClipboard}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="card-body">
        {show && (
          <p className="card-description">{`${parseDescription(
            description
          )}`}</p>
        )}
      </div>
    </div>
  )
}

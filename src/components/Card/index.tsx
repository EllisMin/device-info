import { useState } from 'react'
import './styles.scss'

type Props = {
  title: string
  description?: string | string[]
  initialShow?: boolean
}

const parseDescription = (str: null | string | undefined | string[]) => {
  if (!str) {
    return 'No information Available'
  }
  if (Array.isArray(str)) {
    return str.join(', ')
  }
  return str
}

export const Card = (props: Props) => {
  const { title, description, initialShow = true } = props

  const [show, setShow] = useState<boolean>(initialShow)

  const toggleCollapseButton = () => {
    setShow(!show)
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-collapse-btn">
          <button className="btn-no-style" onClick={toggleCollapseButton}>
            {show ? '⬇' : '➡'}
          </button>
          <div className="card-title">{`${title}:`}</div>
        </div>
        {/* TODO: */}
        <div>Copy</div>
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

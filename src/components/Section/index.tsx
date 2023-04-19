import { ReactNode } from 'react'
import './styles.scss'

type Props = {
  children: ReactNode
  title?: string
}

export const Section = (props: Props) => {
  const { children, title } = props
  return (
    <div className="section">
      {title && <h3 style={{ textAlign: 'left' }}>{title}</h3>}
      {children}
    </div>
  )
}

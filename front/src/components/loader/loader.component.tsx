import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  color?: string
  customSize?: string
  size?: 'small' | 'bigger' | 'big' | ''
  borderSize?: string
}

export default ({ color = 'var(--primary_color)', customSize, size = '', borderSize, className = '' }: Props) => {
  return (
    <div
      className={`loader ${size} ${className}`}
      role="status"
      style={{
        borderWidth: borderSize,
        height: customSize,
        width: customSize,
        borderColor: color,
      }}
    >
      <span className="visually-hidden">Carregando</span>
    </div>
  )
}

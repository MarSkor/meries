import React from 'react'

const Badge = props => {
  return (
    <span className={`badge badge-default ${props.className}`}>
        {props.children}
    </span>
  )
}

export const OutlineBadge = props => {
    return(
        <Badge className={`badge badge-outline ${props.className}`}>
            {props.children}
        </Badge>
    )
}
export default Badge
import React from 'react'
import { Link } from 'react-router-dom'

import { Listing, Image, Name } from './clubListingStyle'

const EventListing = ({ name, image, linkTo, ...rest }) => {
  return (
    <Listing {...rest}>
      <Link to={linkTo}>
        <Image src={image} alt="" />
        <Name className="name">{name}</Name>
      </Link>
    </Listing>
  )
}

export default EventListing

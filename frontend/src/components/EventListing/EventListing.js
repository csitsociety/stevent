import React from 'react'
import event from 'res/test_event.png';
import {ListingContainerStyle} from './eventListingStyle'

const EventListing = () => {
    return (
        <ListingContainerStyle>
            <img src={event}/>
        </ListingContainerStyle>
    )
}

export default EventListing
import React from 'react'
import Masonry from 'react-masonry-css'
import { SearchedPins } from '../types/sanityInterfaces'
import Pin from './Pin'

const breakpointObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1
}

const MasonryLayout = (props: { pins: SearchedPins[] }) =>
{

    return (
        <Masonry className='flex animate-slide-fwd' breakpointCols={breakpointObj}>
            {props.pins.map((pin: SearchedPins) => <Pin key={pin._id} pin={pin} />)}
        </Masonry>
    )
}

export default MasonryLayout
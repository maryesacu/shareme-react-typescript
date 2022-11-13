import React, { useState, useEffect } from 'react'

import MasonryLayout from './MasonryLayout'
import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import Spinner from './Spinner'
import { SearchedPins } from '../types/sanityInterfaces'

const Search = (props: { searchTerm: string, setSearchTerm: React.Dispatch<React.SetStateAction<string>> }) => {
    const [pins, setPins] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(props.searchTerm) {
            setLoading(true)
            const query = searchQuery(props.searchTerm.toLowerCase())
            client.fetch(query)
                .then((data) => {
                    setPins(data)
                    setLoading(false)
                })
        } else {
            client.fetch(feedQuery)
                .then((data) => {
                    setPins(data)
                    setLoading(false)
                })
        }
    },[props.searchTerm])

    return (
        <div>
            {loading && <Spinner message="Searching for pins..."/>}
            {pins.length !== 0 && <MasonryLayout pins={pins} />}
            {pins.length === 0 && props.searchTerm !== '' && !loading && (
                <div className="mt-10 text-center text-xl ">No Pins Found!</div>
            )}
        </div>
    )
}

export default Search
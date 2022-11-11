import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { client } from '../client'
import { SearchedPins } from '../types/sanityInterfaces'
import { feedQuery, searchQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () =>
{
    const [loading, setLoading] = useState(false)
    const { categoryId } = useParams();
    const [pins, setPins] = useState<SearchedPins[]>()

    useEffect(() =>
    {
        setLoading(true);
        if (categoryId)
        {
            const query = searchQuery(categoryId);
            client.fetch(query)
                .then((data: SearchedPins[]) =>
                {
                    setPins(data);
                    setLoading(false);
                })
        } else
        {
            client.fetch(feedQuery)
                .then((data: SearchedPins[]) =>
                {
                    setPins(data);
                    setLoading(false);
                })
        }
    }, [categoryId])


    if (loading) return <Spinner message="We are adding new ideas to your feed!" />
    return (
        <div>{pins && <MasonryLayout pins={pins} />}</div>
    )
}

export default Feed
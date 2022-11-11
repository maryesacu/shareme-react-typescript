import { useState } from 'react'
import { client, urlFor } from '../client'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { SearchedPins } from '../types/sanityInterfaces'
import { fetchUser } from '../utils/fetchUser'

const Pin = (props: { pin: SearchedPins }) =>
{
    const navigate = useNavigate();
    const [postHovered, setPostHovered] = useState(false)
    const userInfo = fetchUser();
    const alreadySaved = !!(props?.pin?.save?.filter((item: any) => item.postedBy._id === userInfo.sub).length);

    const savePin = (id: string) =>
    {
        if (!alreadySaved)
        {
            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [{
                    _key: uuidv4(),
                    userId: userInfo.sub,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: userInfo.sub
                    }
                }])
                .commit()
                .then(() =>
                {
                    window.location.reload();
                })
        }
    }

    const deletePin = (id: string) =>
    {
        client
            .delete(id)
            .then(() =>
            {
                window.location.reload()
            })
    }

    return (
        <div className='m-2'>
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${props.pin._id}`)}
                className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
            >
                <img className='rounded-lg w-full' src={urlFor(props.pin.image).width(250).url()} alt="user-post" />
                {postHovered && (
                    <div
                        className='absolute top-0 flex flex-col justify-between p-1 pr-2 pt-2 pb-2 '
                        style={{ height: '100%', width: '100%' }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <a href={`${props.pin.image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e: any) => e.stopPropagation()}
                                    className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                                >
                                    <MdDownloadForOffline />
                                </a>
                            </div>
                            {alreadySaved ? (
                                <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                                    ({props.pin?.save?.length}) Saved
                                </button>
                            ) : (
                                <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                                    onClick={(e: any) =>
                                    {
                                        e.stopPropagation();
                                        savePin(props.pin._id);
                                    }}>
                                    Save
                                </button>
                            )}
                        </div>
                        <div className="flex justify-between items-center gap-2 w-full">
                            {props.pin.destination && (
                                <a href={props.pin.destination}
                                    onClick={(e: any) =>
                                    {
                                        e.stopPropagation();
                                    }}
                                    target="_blank"
                                    rel='noreferrer'
                                    className='bg-white flex items-center gap-2 text-black font-bold p-1 pl-3 pr-3 rounded-full  opacity-70 hover:opacity-100 hover:shadow-md'
                                >
                                    <BsFillArrowUpRightCircleFill />
                                    {props.pin.destination.length > 20 ? props.pin.destination.slice(8, 20) : props.pin.destination.slice(8)}
                                </a>
                            )}
                            {props.pin.postedBy._id === userInfo.sub && (
                                <button
                                    type='button'
                                    className='bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold text-base rounded-3xl hover:shadow-md outline-none'
                                    onClick={(e: any) =>
                                    {
                                        e.stopPropagation();
                                        deletePin(props.pin._id);
                                    }}
                                ><AiTwotoneDelete /></button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Link
                to={`user-profile/${userInfo.sub}`}
                className="flex gap-2 mt-2 items-center max-w-fit"
            >
                <img src={props.pin.postedBy?.image} alt="user-profile" className="w-8 h-8 rounded-full object-cover" />
                <p className="font-semibold capitalize">{props.pin.postedBy?.userName}</p>
            </Link>
        </div>
    )
}

export default Pin
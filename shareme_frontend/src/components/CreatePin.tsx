import { useState } from 'react'
import { FetchedUser } from '../types/sanityInterfaces'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { client } from '../client'
import Spinner from './Spinner'
import { categories } from '../utils/data'


const CreatePin = (props: { user: FetchedUser }) =>
{
    const [title, setTitle] = useState('')
    const [about, setAbout] = useState('')
    const [destination, setDestination] = useState('')
    const [loading, setLoading] = useState(false)
    const [fields, setFields] = useState(false)
    const [category, setCategory] = useState(null)
    const [imageAsset, setImageAsset] = useState<{ url: string, _id: string }>({ url: '', _id: '' })
    const [wrongImageType, setWrongImageType] = useState(false)
    const navigate = useNavigate();

    const uploadImage = (e: any) =>
    {
        const { type, name } = e.target.files[0];

        if (type === 'image/png' || type === 'image/svg' || type === 'image/jpeg')
        {
            setWrongImageType(false)
            setLoading(true)

            client.assets
                .upload('image', e.target.files[0], { contentType: type, filename: name })
                .then((document: any) =>
                {
                    setImageAsset(document)
                    setLoading(false)
                })
        } else
        {
            setWrongImageType(true)
        }
    }

    const savePin = () =>
    {
        if (title && about && destination && imageAsset?._id && category)
        {
            const doc = {
                _type: 'pin',
                title,
                about,
                destination,
                image: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: imageAsset?._id
                    }
                },
                userId: props.user._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: props.user._id
                },
                category
            }
            client.create(doc)
                .then(() =>
                {
                    navigate('/')
                })
        } else
        {
            setFields(true);
            setTimeout(() => setFields(false), 2000)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
            {fields && (
                <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">Please fill all the fields.</p>
            )}
            <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
                <div className="bg-secondaryColor p-3 flex flex-0 7 w-full">
                    <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
                        {loading && <Spinner message='Loading' />}
                        {wrongImageType && <p>Wrong image type</p>}
                        {!imageAsset.url ? (
                            <label >
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="font-bold text-2xl">
                                            <AiOutlineCloudUpload />
                                        </p>
                                        <p className="text-lg">Click to upload</p>
                                    </div>
                                    <p className="mt-20 text-gray-400">
                                        Use high-quality JPG, SVG, PNG, GIF or TIFF less than 20MB
                                    </p>
                                </div>
                                <input type="file"
                                    name="upload-image"
                                    onChange={uploadImage}
                                    className="w-0 h-0" />
                            </label>
                        ) : (
                            <div className='relative h-full'>
                                <img src={imageAsset.url} alt="uploaded-pic" className='h-full w-full' />
                                <button
                                    type='button'
                                    className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                                    onClick={() => setImageAsset({ url: '', _id: '' })}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
                    <input type="text"
                        value={title}
                        onChange={(e: any) => setTitle(e.target.value)}
                        placeholder="Add your title"
                        className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'
                    />
                    {props.user && (
                        <div className="flex gap-2 my-2 items-center bg-white rounded-lg">
                            <img src={props.user.image} alt="img" className='2-10 h-10 rounded-full' />
                            <p className="font-bold">{props.user.userName}</p>
                        </div>
                    )}
                    <input type="text"
                        value={about}
                        onChange={(e: any) => setAbout(e.target.value)}
                        placeholder="Add your about"
                        className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
                    />
                    <input type="text"
                        value={destination}
                        onChange={(e: any) => setDestination(e.target.value)}
                        placeholder="Add a destination link"
                        className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
                    />
                    <div className="flex flex-col">
                        <div>
                            <p className='mb-2 font-semibold text-lg sm:text-xl'>Choose pin category</p>
                            <select
                                onChange={(e: any) => setCategory(e.target.value)}
                                className='outline-none w-4/5 text-base border-b-2 border-grey-200 p-2 rounded-md cursor-pointer'
                            >
                                <option value="other" className='bg-white'>Select Category</option>
                                {categories.map((category: any) =>

                                    <option className='text-base border-0 outline-none capitalize bg-white text-black' value={category.name}>{category.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="flex justify-end items-end mt-5">
                            <button type='button'
                                onClick={savePin}
                                className='bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none'>
                                Save pin
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreatePin
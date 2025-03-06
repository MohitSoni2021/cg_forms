import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getFromStorage } from '../utils/encryptStorageutil';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLink, FaPlus, FaRemoveFormat, FaTimes } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { motion } from 'framer-motion';



const DashBoard = () => {
    const [isUserLogin, setIsUserLogin] = useState(false);
    const [username, setUsername] = useState("User");
    const [userForms, setUserForms] = useState([])
    const navigate = useNavigate()
    const [isloading, setisloading] = useState(true)

    useEffect(() => {
        (async () => {
            const checking = await getFromStorage("utilityfunctions");
            if (checking) {
                setIsUserLogin(true)
                setUsername(checking._id)

                const userCreatedForms = await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/user/${checking._id}/forms`)
                setUserForms(userCreatedForms.data.forms)
                if(userCreatedForms.status == 200 || userCreatedForms.status == 201){
                    setisloading(false)
                }else{
                    setisloading(false)
                }

            } else {
                navigate('/signup')
            }


        })()
    }, [])

    return (
        <>
            <Navbar />
            {
                (isloading) ? 
                <div className="min-h-[calc(100vh-72px)] bg-gray-100 p-8 mt-[72px] flex items-center justify-center">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
                    </div>
                </div>
                :
                (
                    (userForms.length == 0) ?
                    <div className='min-h-[calc(100vh-72px)] mt-[72px] flex items-center justify-center'>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center justify-center p-8 border-2 border-gray-300 rounded-lg shadow-lg bg-white"
                        >
                            <FaPlus className="text-6xl text-blue-500 animate-bounce" />
                            <h1 className="text-3xl font-bold mt-4">No Forms Found</h1>
                            <p className="text-center text-gray-500">Create a new form to get started!</p>
                            <button
                                className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-300"
                                onClick={() => navigate('/create-form')}
                            >
                                Create Form
                            </button>
                        </motion.div>
                    </div> :
                    (
                        <div className="mt-[75px] h-[calc(100vh-75px)]">
                            <h1 className='text-4xl font-bold text-center w-full p-3'>Your Created Forms</h1>
                            <div className="flex gap-5 flex-col standard-max-width">

                                {
                                    userForms.map((ele, key) => {
                                        return (
                                            <div className="flex flex-col p-4 border-2 border-gray-300 last:border-b-0 bg-white rounded-lg shadow-lg" key={key}>
                                                <div className="flex items-center justify-between">
                                                    <NavLink to={`/form/${ele._id}/responses`}>
                                                        <div className="flex flex-col">
                                                            <h2 className="font-bold text-3xl">{ele.title}</h2>
                                                            <p className="text-sm mt-1">{ele.description}</p>
                                                            <div className="mt-4 flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-4">
                                                                <span className="text-xs text-gray-600">
                                                                    Created: {new Date(ele.createdAt).toLocaleString()}
                                                                </span>
                                                                <span className="text-xs text-gray-600">
                                                                    Expiration: {new Date(ele.expiration).toLocaleString()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </NavLink>
                                                    <div className="flex items-center text-xl max-md:flex-col max-md:gap-3">
                                                        <button className="bg-red-500 cursor-pointer hover:bg-red-700 aspect-square text-white font-bold py-1 px-2 rounded-full"
                                                            onClick={(async () => {
                                                                const SerVerResponse = await axios.delete(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/user/${username}/forms/${ele._id}`)
                                                                console.log(SerVerResponse);
                                                                navigate('/form/successfull-deleted')
                                                            })}
                                                        >
                                                            <MdDelete />
                                                        </button>
                                                        <button className="bg-blue-500 cursor-pointer aspect-square hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full ml-2" onClick={() => {
                                                            navigator.clipboard.writeText(`${window.location.host}/response/${username}/${ele._id}`)
                                                            alert("Form link copied to clipboard")
                                                        }}>
                                                            <FaLink />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                                <span className=""></span>
                            </div>

                            <motion.button
                                className="fixed bottom-5 cursor-pointer right-5 bg-blue-500 text-white rounded-full p-4 hover:bg-green-700"
                                initial={{ x: 1000 }}
                                animate={{ x: 0 }}
                                transition={{ duration: 0.5 }}
                                onClick={() => navigate('/create-form')}
                            >
                                <FaPlus size={24} />
                            </motion.button>


                        </div>
                    )
                )
            }
        </>
    )
}

export default DashBoard
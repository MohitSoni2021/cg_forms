// import React from 'react'

// const PreviewPage = () => {
//   return (
//     <div>PreviewPage</div>
//   )
// }

// export default PreviewPage


import { useEffect, useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getFromStorage } from '../utils/encryptStorageutil';
import { motion } from 'framer-motion'

const questionTypes = [
    { value: 'mcq', label: 'Multiple Choice' },
    { value: 'number', label: 'Number' },
    { value: 'text', label: 'Text' },
    { value: 'paragraph', label: 'Paragraph' },
    { value: 'boolean', label: 'Yes/No' }
];

function PreviewPage() {
    const [questions, setQuestions] = useState([]);
    const [formTitle, setFormTitle] = useState('Untitled Form');
    const [formDescription, setFormDescription] = useState('Form Description');
    const navigate = useNavigate()
    const [userResponse, setUserResponse] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [isFormExpired, setIsFormExpired] = useState(false)
    const [postNotFound, setPostNotFound] = useState(false)
    const [isloading, setIsloading] = useState(false)

    const { userId, formId } = useParams();


    const handleUserSubmit = async () => {

        
        console.log(userResponse)
        
        for (const question of questions) {
            if (question.required && question.type !== 'boolean' && !userResponse[question._id]) {
                alert(`Please fill the required field: ${question.question}`)
                return
            }
        }
        setIsLoading(true)

        const serverResponse = await axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/response/SubmitForm`, {
            email: (await getFromStorage("utilityfunctions")).email,
            userResponse,
            formId
        })

        console.log(serverResponse.data.response._id)

        const anotherResponse = await axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/user/${userId}/${formId}/add-response`, {
            responseId: serverResponse.data.response._id
        })

        console.log(anotherResponse)
        if (anotherResponse.status == 200) {
            navigate("/reponse/subitted")
        }

        console.log({
            email: (await getFromStorage("utilityfunctions")).email,
            userResponse,
            formId
        })
    }



    useEffect(() => {
        (async () => {


            // const serverResponseForm = await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/user/${userId}/${formId}`)


            if (!(await getFromStorage("utilityfunctions"))) {
                navigate("/signup")
            }

            let serverResponseQuestion;

            try {
                serverResponseQuestion = await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/user/${userId}/${formId}/questions`)
            } catch (error) {
                setPostNotFound(true)
            }

            // const serverResponseQuestion = await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/user/${userId}/${formId}/questions`)

            // if(serverResponseQuestion.status == 404) {
            //     setPostNotFound(true)
            // }


            if (new Date(serverResponseQuestion.data.questions.expiration) < new Date()) {
                setIsFormExpired(true)
                setTimeout(() => {
                    navigate('/dashboard')
                }, 3000);
            }

            const serverResponse = await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/user/eh8w0SOovfU4BLATTG38gt4nNpI3/forms`);
            setQuestions(serverResponseQuestion.data.questions.questions)
            setFormTitle(serverResponseQuestion.data.questions.title)
            setFormDescription(serverResponseQuestion.data.questions.description)
            serverResponseQuestion.data.questions.questions.map((question) => {
                if (question.type === 'mcq') {
                    setUserResponse((prevResponse) => ({
                        ...prevResponse,
                        [question._id]: ''
                    }));
                } else if (question.type === 'text') {
                    setUserResponse((prevResponse) => ({
                        ...prevResponse,
                        [question._id]: ''
                    }));
                } else if (question.type === 'paragraph') {
                    setUserResponse((prevResponse) => ({
                        ...prevResponse,
                        [question._id]: ''
                    }));
                } else if (question.type === 'boolean') {
                    setUserResponse((prevResponse) => ({
                        ...prevResponse,
                        [question._id]: false
                    }));
                } else if (question.type === 'number') {
                    setUserResponse((prevResponse) => ({
                        ...prevResponse,
                        [question._id]: 0
                    }));
                }
            });

            if (serverResponse.status == 200) {
                setIsLoading(false)
            }
        })()

    }, [])




    return (
        <>
            <Navbar />

            {
                isloading ? 
                <div className="min-h-[calc(100vh-72px)] bg-gray-100 p-8 mt-[72px] flex items-center justify-center">
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
                                </div>
                            </div>
                :
                (
                    postNotFound ? 
                <div className="min-h-[calc(100vh-72px)] mt-[72px] flex items-center justify-center">

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="bg-gradient-to-br from-blue-500 to-indigo-500 p-8 rounded-xl shadow-2xl text-white text-center"
                        >
                            <svg className="w-20 h-20 mx-auto mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 17H6.837a2 2 0 01-1.789-2.894l-3.5-7a2 2 0 013.5-3.414L6.5 6.586zM17 14a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <h2 className="text-3xl font-extrabold mb-3">Post Not Found!</h2>
                            <p className="text-lg font-light">The post you are searching for does not exist. Please verify the URL or try searching for it again.</p>
                        </motion.div>

                </div>
                :
                isFormExpired ?
                    <div className="min-h-[calc(100vh-72px)] bg-gray-100 p-8 mt-[72px] flex items-center justify-center">
                        <div className="min-h-[calc(100vh-72px)] bg-gray-100 p-8 mt-[72px] flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="bg-gradient-to-br from-red-500 to-pink-500 p-6 rounded-lg shadow-lg text-white text-center"
                            >
                                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <h2 className="text-2xl font-bold mb-2">Form Expired!</h2>
                                <p className="text-lg">This form is no longer available. Redirecting to the dashboard...</p>
                            </motion.div>
                        </div>

                    </div>
                    :
                    (

                        isLoading ?
                            <div className="min-h-[calc(100vh-72px)] bg-gray-100 p-8 mt-[72px] flex items-center justify-center">
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
                                </div>
                            </div>
                            :

                            (
                                <div className="min-h-[calc(100vh-72px)] mt-[72px] bg-gray-100 py-8 px-4">
                                    <div className="max-w-3xl mx-auto space-y-6">
                                        {/* Form Header */}
                                        <div className="bg-white rounded-lg shadow-md p-6">
                                            <input
                                                type="text"
                                                disabled
                                                value={formTitle}
                                                className="w-full select-none text-3xl font-bold border-b-2 border-purple-300 focus:border-purple-500 outline-none pb-2"
                                            />
                                            <input
                                                type="text"
                                                disabled
                                                value={formDescription}
                                                className="w-full mt-4 select-none border-b border-gray-300 focus:border-purple-500 outline-none"
                                            />
                                        </div>

                                        {/* Questions */}
                                        {questions.map((question) => (
                                            <div key={question.id} className="bg-white rounded-lg shadow-md p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-4 mb-4">
                                                            <input
                                                                type="text"
                                                                value={question.question}
                                                                placeholder="Question"
                                                                className="flex-1 border-b border-gray-300 focus:border-purple-500 outline-none"
                                                            />

                                                        </div>

                                                        {question.type === 'mcq' && (
                                                            <div className="space-y-2">
                                                                {question.options.map((option, idx) => (
                                                                    <div key={idx} className="flex items-center gap-2">
                                                                        <input
                                                                            type="radio"
                                                                            name={question._id}
                                                                            value={option}
                                                                            checked={userResponse[question._id] === option}
                                                                            onChange={(e) => setUserResponse((prevResponse) => ({ ...prevResponse, [question._id]: e.target.value }))}
                                                                            className="text-purple-600"
                                                                        />
                                                                        <span className="flex-1">{option}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {question.type === 'text' && (
                                                            <input
                                                                type="text"
                                                                value={userResponse[question._id]}
                                                                onChange={(e) => setUserResponse((prevResponse) => ({ ...prevResponse, [question._id]: e.target.value }))}
                                                                // disabled
                                                                placeholder="Short answer text"
                                                                className="w-full border-b border-gray-300 mt-2"
                                                            />
                                                        )}

                                                        {question.type === 'paragraph' && (
                                                            <textarea
                                                                value={userResponse[question._id]}
                                                                onChange={(e) => setUserResponse((prevResponse) => ({ ...prevResponse, [question._id]: e.target.value }))}
                                                                // disabled
                                                                placeholder="Long answer text"
                                                                className="w-full border border-gray-300 rounded mt-2 h-24"
                                                            />
                                                        )}

                                                        {question.type === 'number' && (
                                                            <input
                                                                value={userResponse[question._id]}
                                                                onChange={(e) => setUserResponse((prevResponse) => ({ ...prevResponse, [question._id]: e.target.value }))}
                                                                type="number"
                                                                placeholder="Number input"
                                                                className="w-full border-b border-gray-300 mt-2"
                                                            />
                                                        )}

                                                        {question.type === 'boolean' && (
                                                            <div className="flex gap-4 mt-2">
                                                                <label className="flex items-center gap-2">
                                                                    <input
                                                                        type="radio"
                                                                        name={question._id}
                                                                        value={true}
                                                                        checked={userResponse[question._id] === true}
                                                                        onChange={(e) =>
                                                                            setUserResponse((prevResponse) => ({
                                                                                ...prevResponse,
                                                                                [question._id]: e.target.value === 'true'
                                                                            }))
                                                                        }
                                                                        className="text-purple-600"
                                                                    />{' '}
                                                                    Yes
                                                                </label>
                                                                <label className="flex items-center gap-2">
                                                                    <input
                                                                        type="radio"
                                                                        name={question._id}
                                                                        value={false}
                                                                        checked={userResponse[question._id] === false}
                                                                        onChange={(e) =>
                                                                            setUserResponse((prevResponse) => ({
                                                                                ...prevResponse,
                                                                                [question._id]: e.target.value === 'true'
                                                                            }))
                                                                        }
                                                                        className="text-purple-600"
                                                                    />{' '}
                                                                    No
                                                                </label>
                                                            </div>
                                                        )}
                                                    </div>

                                                </div>

                                                <div className="mt-4 flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={question.required}
                                                        className="text-purple-600"
                                                    />
                                                    <span className="text-sm text-gray-600">Required</span>
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full cursor-pointer"
                                            onClick={handleUserSubmit}
                                        >
                                            Submit
                                        </button>

                                    </div>
                                </div>
                            )


                    )
                )
            }

        </>
    );
}

export default PreviewPage;
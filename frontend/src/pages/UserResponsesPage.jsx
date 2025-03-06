import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getFromStorage } from '../utils/encryptStorageutil';
import Navbar from '../components/Navbar';

const UserResponsesPage = () => {

    const [isloading, setIsloading] = useState(true);

    const { formId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        _id: "67c7edf3ac5a73ebf5501686",
        title: "Untitled Form",
        description: "Form Description",
        createdAt: "2025-03-05T06:23:47.556Z",
        updatedAt: "2025-03-05T06:23:47.556Z",
        expiration: "2025-03-06T06:05:00.000Z",
        questions: [
            {
                question: "Your Name",
                type: "text",
                required: true,
                options: ["Option 1"],
                _id: "67c7edf3ac5a73ebf5501687"
            },
            {
                question: "Your Age",
                type: "number",
                required: true,
                options: ["Option 1"],
                _id: "67c7edf3ac5a73ebf5501688"
            }
        ],
        response_ids: [
            {
                email: "soni3006mohit@gmail.com",
                form_id: "67c7edf3ac5a73ebf5501686",
                user_response: {
                    "67c7edf3ac5a73ebf5501687": "MohitSoni",
                    "67c7edf3ac5a73ebf5501688": "19"
                },
                _id: "67c8563e26a772980db12e23"
            },
            {
                email: "try.mohitsoni@gmail.com",
                form_id: "67c7edf3ac5a73ebf5501686",
                user_response: {
                    "67c7edf3ac5a73ebf5501687": "Mohit Soni",
                    "67c7edf3ac5a73ebf5501688": "19"
                },
                _id: "67c8599926a772980db12efb"
            }
        ]
    })

    useEffect(() => {

        (async () => {
            if (!(await getFromStorage("utilityfunctions"))) {
                navigate("/signup")
            }

            const ServerResponse = await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/user/${(await getFromStorage("utilityfunctions"))._id}/forms/${formId}`)

            setFormData(ServerResponse.data)
            if(ServerResponse.status == 200){
                setIsloading(false)
            }
        })()
    }, [])

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

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
                        <div className="min-h-[calc(100vh-72px)] bg-gray-100 p-8 mt-[72px]">
                            <div className="max-w-6xl mx-auto">
                                {/* Form Details */}
                                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                                    <div className="flex items-center gap-2 mb-4">
                                        <table className="w-6 h-6 text-blue-600" />
                                        <h1 className="text-2xl font-bold text-gray-800">{formData.title}</h1>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-600">Description: <span className="text-gray-800">{formData.description}</span></p>
                                            <p className="text-gray-600">Created: <span className="text-gray-800">{formatDate(formData.createdAt)}</span></p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Updated: <span className="text-gray-800">{formatDate(formData.updatedAt)}</span></p>
                                            <p className="text-gray-600">Expires: <span className="text-gray-800">{formatDate(formData.expiration)}</span></p>
                                        </div>
                                    </div>
                                </div>

                                {/* Responses Table */}
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                    {formData.questions.map((question) => (
                                                        <th key={question._id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            {question.question}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {formData.response_ids.map((response) => (
                                                    <tr key={response._id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {response.email}
                                                        </td>
                                                        {formData.questions.map((question) => (
                                                            <td key={question._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {
                                                                    (typeof (response.user_response[question._id]) == "boolean") ?
                                                                        JSON.stringify(response.user_response[question._id])
                                                                        :
                                                                        response.user_response[question._id]
                                                                }
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }

        </>
    );
}

export default UserResponsesPage
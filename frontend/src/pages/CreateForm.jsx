import { useEffect, useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { motion } from 'framer-motion';
import { getFromStorage } from '../utils/encryptStorageutil';

const questionTypes = [
  { value: 'mcq', label: 'Multiple Choice' },
  { value: 'number', label: 'Number' },
  { value: 'text', label: 'Text' },
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'boolean', label: 'Yes/No' }
];

function App() {
  const [questions, setQuestions] = useState([]);
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [formDescription, setFormDescription] = useState('Form Description');
  const [expirationDate, setExpirationDate] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [errormsg, setErrormsg] = useState("")
  const [isFormCreated, setIsFormCreated] = useState(false)

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        type: 'text',
        question: '',
        options: ['Option 1'],
        required: false
      }
    ]);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q =>
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const addOption = (questionId) => {
    setQuestions(questions.map(q =>
      q.id === questionId
        ? { ...q, options: [...q.options, `Option ${q.options.length + 1}`] }
        : q
    ));
  };

  const updateOption = (questionId, optionIndex, value) => {
    setQuestions(questions.map(q =>
      q.id === questionId
        ? {
          ...q,
          options: q.options.map((opt, idx) =>
            idx === optionIndex ? value : opt
          )
        }
        : q
    ));
  };

  const removeOption = (questionId, optionIndex) => {
    setQuestions(questions.map(q =>
      q.id === questionId
        ? {
          ...q,
          options: q.options.filter((_, idx) => idx !== optionIndex)
        }
        : q
    ));
  };

  const handleCreate = async () => {
    if ((new Date() > new Date(`${expirationDate}T${expirationTime}`)) || expirationDate == null) {
      setErrormsg("Expiration date is invalid")
    } else {

      const formData = {
        title: formTitle,
        description: formDescription,
        questions: questions.map(({ id, ...rest }) => rest),
        expiration: expirationDate && expirationTime
          ? new Date(`${expirationDate}T${expirationTime}`).toISOString()
          : null
      };

      try {
        const serverRes = await axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/user/${(await getFromStorage("utilityfunctions"))._id}/add-form`, formData)
        setIsFormCreated(true)
        setTimeout(() => {
          navigator('/dashboard')
        }, 3000);
      } catch (error) {
        console.log(error)
      }

    }
  };

  useEffect(() => {
    setErrormsg("")
  }, [expirationDate, expirationTime])

  return (
    <>
      <Navbar />
      {
        isFormCreated ?
          <div className="min-h-[calc(100vh-72px)] mt-[72px] ">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-xl shadow-2xl z-20 flex flex-col items-center justify-center"
            >
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-white text-lg font-semibold mt-3">Form created successfully!</p>
            </motion.div>
          </div>
          :
          (
            <div className="min-h-[calc(100vh-72px)] mt-[72px] bg-gray-100 py-8 px-4">
              <div className="max-w-3xl mx-auto space-y-6">
                {/* Form Header */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full text-3xl font-bold border-b-2 border-purple-300 focus:border-purple-500 outline-none pb-2"
                  />
                  <input
                    type="text"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full mt-4 border-b border-gray-300 focus:border-purple-500 outline-none"
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
                            onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                            placeholder="Question"
                            className="flex-1 border-b border-gray-300 focus:border-purple-500 outline-none"
                          />
                          <select
                            value={question.type}
                            onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1"
                          >
                            {questionTypes.map(type => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {question.type === 'mcq' && (
                          <div className="space-y-2">
                            {question.options.map((option, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  disabled
                                  className="text-purple-600"
                                />
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => updateOption(question.id, idx, e.target.value)}
                                  className="flex-1 border-b border-gray-300 focus:border-purple-500 outline-none"
                                />
                                {question.options.length > 1 && (
                                  <button
                                    onClick={() => removeOption(question.id, idx)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <FaTrash size={14} />
                                  </button>
                                )}
                              </div>
                            ))}
                            <button
                              onClick={() => addOption(question.id)}
                              className="text-purple-600 hover:text-purple-800 flex items-center gap-1 mt-2"
                            >
                              <FaPlus size={12} /> Add Option
                            </button>
                          </div>
                        )}

                        {question.type === 'text' && (
                          <input
                            type="text"
                            disabled
                            placeholder="Short answer text"
                            className="w-full border-b border-gray-300 mt-2"
                          />
                        )}

                        {question.type === 'paragraph' && (
                          <textarea
                            disabled
                            placeholder="Long answer text"
                            className="w-full border border-gray-300 rounded mt-2 h-24"
                          />
                        )}

                        {question.type === 'number' && (
                          <input
                            type="number"
                            disabled
                            placeholder="Number input"
                            className="w-full border-b border-gray-300 mt-2"
                          />
                        )}

                        {question.type === 'boolean' && (
                          <div className="flex gap-4 mt-2">
                            <label className="flex items-center gap-2">
                              <input type="radio" disabled className="text-purple-600" /> Yes
                            </label>
                            <label className="flex items-center gap-2">
                              <input type="radio" disabled className="text-purple-600" /> No
                            </label>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => removeQuestion(question.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={question.required}
                        onChange={(e) => updateQuestion(question.id, 'required', e.target.checked)}
                        className="text-purple-600"
                      />
                      <span className="text-sm text-gray-600">Required</span>
                    </div>
                  </div>
                ))}

                {/* Add Question Button */}
                <button
                  onClick={addQuestion}
                  className="w-full bg-white rounded-lg shadow-md p-4 text-purple-600 hover:bg-purple-50 flex items-center justify-center gap-2"
                >
                  <FaPlus /> Add Question
                </button>

                {/* Form Expiration */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Form Expiration</h3>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 mb-2">Date</label>
                      <input
                        type="date"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 mb-2">Time</label>
                      <input
                        type="time"
                        value={expirationTime}
                        onChange={(e) => setExpirationTime(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  {errormsg && <p className="text-red-500 text-sm mt-2">{errormsg}</p>}
                </div>

                {/* Create Form Button */}
                <button
                  onClick={handleCreate}
                  className="w-full bg-purple-600 text-white rounded-lg shadow-md p-4 hover:bg-purple-700"
                >
                  Create Form
                </button>
              </div>
            </div>
          )
      }
    </>
  );
}

export default App;
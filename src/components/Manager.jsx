// import React from 'react'
// import { useRef, useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { v4 as uuidv4 } from 'uuid';
// import { FaEye, FaEyeSlash, FaExternalLinkAlt } from "react-icons/fa";
// const Manager = ({ darkMode: darkModeProp }) => {
//   const passwordRef = useRef()
//   const [form, setform] = useState({ site: "", username: "", password: "", category: "General" })
//   const [passwordArray, setPasswordArray] = useState([])
//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("All")
//   const [showPasswordGenerator, setShowPasswordGenerator] = useState(false)
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordOptions, setPasswordOptions] = useState({
//     length: 16,
//     uppercase: true,
//     lowercase: true,
//     numbers: true,
//     symbols: true
//   })
//   const [visiblePasswords, setVisiblePasswords] = useState({})

//   // Use darkMode prop (always provided from App.jsx)
//   const darkMode = darkModeProp ?? false

//   const categories = ["All", "General", "Social Media", "Email", "Banking", "Shopping", "Work", "Personal", "Other"]

//   useEffect(() => {
//     let passwords = localStorage.getItem("passwords");
//     if (passwords) {
//       setPasswordArray(JSON.parse(passwords))
//     }
//   }, [])

//   useEffect(() => {
//     setform({ site: "", username: "", password: "", category: "General" });
//   }, [])




//   useEffect(() => {
//     localStorage.setItem("passwords", JSON.stringify(passwordArray))
//   }, [passwordArray])

//   const copyText = (text) => {
//     navigator.clipboard.writeText(text)
//     toast.success('Copied to clipboard!', {
//       autoClose: 2000,
//     })
//   }

//   const togglePasswordVisibility = (id) => {
//     setVisiblePasswords(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }))
//   }

//   const generatePassword = () => {
//     const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
//     const lowercase = "abcdefghijklmnopqrstuvwxyz"
//     const numbers = "0123456789"
//     const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

//     let charset = ""
//     if (passwordOptions.uppercase) charset += uppercase
//     if (passwordOptions.lowercase) charset += lowercase
//     if (passwordOptions.numbers) charset += numbers
//     if (passwordOptions.symbols) charset += symbols

//     if (charset === "") {
//       toast.error("Please select at least one character type", {
//         autoClose: 2000,
//       })
//       return
//     }

//     let password = ""
//     for (let i = 0; i < passwordOptions.length; i++) {
//       password += charset.charAt(Math.floor(Math.random() * charset.length))
//     }

//     setform({ ...form, password })
//     setShowPasswordGenerator(false)
//     toast.success("Password generated!", {
//       autoClose: 2000,
//     })
//   }

//   const getPasswordStrength = (password) => {
//     if (!password) return { strength: 0, label: "", color: "" }

//     let strength = 0
//     if (password.length >= 8) strength++
//     if (password.length >= 12) strength++
//     if (/[a-z]/.test(password)) strength++
//     if (/[A-Z]/.test(password)) strength++
//     if (/[0-9]/.test(password)) strength++
//     if (/[^A-Za-z0-9]/.test(password)) strength++

//     if (strength <= 2) return { strength, label: "Weak", color: "red" }
//     if (strength <= 4) return { strength, label: "Medium", color: "yellow" }
//     return { strength, label: "Strong", color: "green" }
//   }

//   const getStatistics = () => {
//     const total = passwordArray.length
//     const categoriesCount = {}
//     passwordArray.forEach(pwd => {
//       const cat = pwd.category || "General"
//       categoriesCount[cat] = (categoriesCount[cat] || 0) + 1
//     })

//     let weakCount = 0
//     let mediumCount = 0
//     let strongCount = 0
//     passwordArray.forEach(pwd => {
//       const strength = getPasswordStrength(pwd.password)
//       if (strength.label === "Weak") weakCount++
//       else if (strength.label === "Medium") mediumCount++
//       else strongCount++
//     })

//     return { total, categoriesCount, weakCount, mediumCount, strongCount }
//   }

//   const savePassword = () => {
//     if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
//       const newPassword = { ...form, id: form.id || uuidv4(), dateAdded: form.dateAdded || new Date().toISOString() }
//       if (form.id) {
//         // Editing existing password
//         setPasswordArray(passwordArray.map(pwd => pwd.id === form.id ? newPassword : pwd))
//         toast.success('Password updated!', {
//           autoClose: 2000,
//         })
//       } else {
//         // Adding new password
//         setPasswordArray([...passwordArray, newPassword])
//         toast.success('Password saved!', {
//           autoClose: 2000,
//         })
//       }
//       setform({ site: "", username: "", password: "", category: "General" })
//     }
//     else {
//       toast.error('Please fill all fields with at least 4 characters!', {
//         autoClose: 2000,
//       })
//     }
//   }

//   const deletePassword = (id) => {
//     if (window.confirm("Do you really want to delete this password?")) {
//       setPasswordArray(passwordArray.filter(item => item.id !== id))
//       toast.success('Password Deleted!', {
//         autoClose: 2000,
//       })
//     }
//   }

//   const editPassword = (id) => {
//     const passwordToEdit = passwordArray.find(item => item.id === id)
//     if (passwordToEdit) {
//       setform(passwordToEdit)
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//       toast.info('Password loaded for editing', {
//         autoClose: 2000,
//       })
//     }
//   }

//   const handleChange = (e) => {
//     setform({ ...form, [e.target.name]: e.target.value })
//   }

//   const filteredPasswords = passwordArray.filter(item => {
//     const matchesSearch = item.site.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()))
//     const matchesCategory = selectedCategory === "All" || (item.category || "General") === selectedCategory
//     return matchesSearch && matchesCategory
//   })

//   const stats = getStatistics()
//   const passwordStrength = getPasswordStrength(form.password)

//   return (
//     <>
//       <div className="p-3 md:mycontainer min-h-[82.7vh]">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className='text-5xl font-bold mb-2'>
//             <span className='text-green-500'>&lt;</span>
//             <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Secure {""}</span>
//             <span className='text-green-500'>Stack/&gt;</span>
//           </h1>
//           <p className='text-green-900 dark:text-green-300 text-lg'>Your own Password Manager</p>
//         </div>

//         {/* Statistics Dashboard */}
//         {passwordArray.length > 0 && (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
//               <div className="text-3xl font-bold text-blue-500">{stats.total}</div>
//               <div className="text-sm text-gray-600 dark:text-gray-300">Total Passwords</div>
//             </div>
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
//               <div className="text-3xl font-bold text-red-500">{stats.weakCount}</div>
//               <div className="text-sm text-gray-600 dark:text-gray-300">Weak</div>
//             </div>
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
//               <div className="text-3xl font-bold text-yellow-500">{stats.mediumCount}</div>
//               <div className="text-sm text-gray-600 dark:text-gray-300">Medium</div>
//             </div>
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
//               <div className="text-3xl font-bold text-green-500">{stats.strongCount}</div>
//               <div className="text-sm text-gray-600 dark:text-gray-300">Strong</div>
//             </div>
//           </div>
//         )}

//         {/* Password Form */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
//           <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
//             {form.id ? "Edit Password" : "Add New Password"}
//           </h2>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Website URL
//               </label>
//               <input
//                 value={form.site}
//                 onChange={handleChange}
//                 placeholder='Enter website URL'
//                 className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
//                 type="text"
//                 name="site"
//                 id="site"
//               />
//             </div>

//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Username
//                 </label>
//                 <input
//                   value={form.username}
//                   onChange={handleChange}
//                   placeholder='Enter Username'
//                   className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
//                   type="text"
//                   name="username"
//                   id="username"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Category
//                 </label>
//                 <select
//                   value={form.category}
//                   onChange={handleChange}
//                   name="category"
//                   className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
//                 >
//                   {categories.filter(cat => cat !== "All").map(cat => (
//                     <option key={cat} value={cat}>{cat}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Password
//                 </label>
//                 <button
//                   onClick={() => setShowPasswordGenerator(!showPasswordGenerator)}
//                   className="text-sm text-green-500 hover:text-green-600 dark:hover:text-green-400 font-medium"
//                 >
//                   {showPasswordGenerator ? "Hide Generator" : "Generate Password"}
//                 </button>
//               </div>

//               <div className="relative">
//                 <input
//                   ref={passwordRef}
//                   value={form.password}
//                   onChange={handleChange}
//                   placeholder="Enter Password"
//                   className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   id="password"
//                 />
//                 <span
//                   className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-green-500 transition-colors"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <FaEyeSlash size={20} />
//                   ) : (
//                     <FaEye size={20} />
//                   )}
//                 </span>
//               </div>

//               {/* Password Strength Indicator */}
//               {form.password && (
//                 <div className="mt-2">
//                   <div className="flex items-center gap-2 mb-1">
//                     <div className={`flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700`}>
//                       <div
//                         className={`h-2 rounded-full transition-all ${passwordStrength.color === "red" ? "bg-red-500 w-1/3" :
//                           passwordStrength.color === "yellow" ? "bg-yellow-500 w-2/3" :
//                             "bg-green-500 w-full"
//                           }`}
//                       />
//                     </div>
//                     <span className={`text-sm font-medium ${passwordStrength.color === "red" ? "text-red-500" :
//                       passwordStrength.color === "yellow" ? "text-yellow-500" :
//                         "text-green-500"
//                       }`}>
//                       {passwordStrength.label}
//                     </span>
//                   </div>
//                 </div>
//               )}

//               {/* Password Generator */}
//               {showPasswordGenerator && (
//                 <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
//                   <div className="space-y-3">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         Length: {passwordOptions.length}
//                       </label>
//                       <input
//                         type="range"
//                         min="8"
//                         max="32"
//                         value={passwordOptions.length}
//                         onChange={(e) => setPasswordOptions({ ...passwordOptions, length: parseInt(e.target.value) })}
//                         className="w-full"
//                       />
//                     </div>
//                     <div className="grid grid-cols-2 gap-2">
//                       <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
//                         <input
//                           type="checkbox"
//                           checked={passwordOptions.uppercase}
//                           onChange={(e) => setPasswordOptions({ ...passwordOptions, uppercase: e.target.checked })}
//                           className="rounded"
//                         />
//                         Uppercase
//                       </label>
//                       <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
//                         <input
//                           type="checkbox"
//                           checked={passwordOptions.lowercase}
//                           onChange={(e) => setPasswordOptions({ ...passwordOptions, lowercase: e.target.checked })}
//                           className="rounded"
//                         />
//                         Lowercase
//                       </label>
//                       <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
//                         <input
//                           type="checkbox"
//                           checked={passwordOptions.numbers}
//                           onChange={(e) => setPasswordOptions({ ...passwordOptions, numbers: e.target.checked })}
//                           className="rounded"
//                         />
//                         Numbers
//                       </label>
//                       <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
//                         <input
//                           type="checkbox"
//                           checked={passwordOptions.symbols}
//                           onChange={(e) => setPasswordOptions({ ...passwordOptions, symbols: e.target.checked })}
//                           className="rounded"
//                         />
//                         Symbols
//                       </label>
//                     </div>
//                     <button
//                       onClick={generatePassword}
//                       className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
//                     >
//                       Generate Password
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <button
//               onClick={savePassword}
//               className='w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg flex justify-center items-center gap-2'
//             >
//               <lord-icon
//                 src="https://cdn.lordicon.com/jgnvfzqg.json"
//                 trigger="hover"
//                 style={{ width: "24px", height: "24px" }}
//               ></lord-icon>
//               {form.id ? "Update Password" : "Save Password"}
//             </button>
//           </div>
//         </div>

//         {/* Search and Filter */}
//         {passwordArray.length > 0 && (
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Search
//                 </label>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search by site, username, or category..."
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Filter by Category
//                 </label>
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
//                 >
//                   {categories.map(cat => (
//                     <option key={cat} value={cat}>{cat}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Passwords List */}
//         <div className="passwords">
//           <h2 className="font-bold text-2xl py-4 text-center sm:text-left text-gray-800 dark:text-white">
//             Your Passwords ({filteredPasswords.length})
//           </h2>

//           {filteredPasswords.length === 0 && passwordArray.length === 0 && (
//             <div className="text-center text-gray-500 dark:text-gray-400 py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
//               <div className="text-6xl mb-4">🔒</div>
//               <p className="text-xl">No passwords saved yet</p>
//               <p className="text-sm mt-2">Add your first password above to get started!</p>
//             </div>
//           )}

//           {filteredPasswords.length === 0 && passwordArray.length > 0 && (
//             <div className="text-center text-gray-500 dark:text-gray-400 py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
//               <p className="text-xl">No passwords match your search criteria</p>
//             </div>
//           )}

//           {filteredPasswords.length > 0 && (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
//               {filteredPasswords.map((item) => {
//                 const isVisible = visiblePasswords[item.id]
//                 const strength = getPasswordStrength(item.password)

//                 return (
//                   <div
//                     key={item.id}
//                     className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
//                   >
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex-1">
//                         <h3 className="font-bold text-lg text-gray-800 dark:text-white truncate">
//                           {item.site}
//                         </h3>
//                         <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
//                           {item.category || "General"}
//                         </span>
//                       </div>
//                       <div className={`w-3 h-3 rounded-full ${strength.color === "red" ? "bg-red-500" :
//                         strength.color === "yellow" ? "bg-yellow-500" :
//                           "bg-green-500"
//                         }`} title={strength.label} />
//                     </div>

//                     <div className="space-y-3 mb-4">
//                       <div>
//                         <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Username</div>
//                         <div className="flex items-center gap-2">
//                           <span className="text-gray-200 dark:text-gray-300 truncate flex-1">{item.username}</span>
//                           <button
//                             onClick={() => copyText(item.username)}
//                             className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
//                             title="Copy username"
//                           >
//                             <lord-icon
//                               src="https://cdn.lordicon.com/iykgtsbt.json"
//                               trigger="hover"
//                           colors="primary:#9ca3af"
//                               style={{ width: "20px", height: "20px" }}
//                             ></lord-icon>
//                           </button>
//                         </div>
//                       </div>

//                       <div>
//                         <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Password</div>
//                         <div className="flex items-center gap-2">
//                           <span className="text-gray-700 dark:text-gray-300 font-mono truncate flex-1">
//                             {isVisible ? item.password : "•".repeat(Math.min(item.password.length, 20))}
//                           </span>

//                           <button
//                             onClick={() => togglePasswordVisibility(item.id)}
//                             className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
//                             title={isVisible ? "Hide password" : "Show password"}
//                           >
//                             {isVisible ? (
//                               <FaEyeSlash className="text-gray-700 dark:text-gray-300" size={18} />
//                             ) : (
//                               <FaEye className="text-gray-700 dark:text-gray-300" size={18} />
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex justify-end gap-2 pt-4 items-center border-t text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700">
//                       {/* Visit Site */}
//                       <a
//                         href={item.site.startsWith("http") ? item.site : `https://${item.site}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
//                         title="Visit site"
//                       >
//                         <lord-icon    
//                         src="https://cdn.lordicon.com/erxuunyq.json"
//                           trigger="hover"
//                           colors="primary:#9ca3af"
//                           style={{ width: "20px", height: "20px" }}
//                         ></lord-icon>
//                       </a>

//                       {/* Edit Password */}
//                       <button
//                         onClick={() => editPassword(item.id)}
//                         className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
//                         title="Edit password"
//                       >
//                         <lord-icon
//                           src="https://cdn.lordicon.com/gwlusjdu.json"
//                           trigger="hover"
//                           colors="primary:#9ca3af"
//                           style={{ width: "20px", height: "20px" }}
//                         ></lord-icon>
//                       </button>

//                       {/* Delete Password */}
//                       <button
//                         onClick={() => deletePassword(item.id)}
//                         className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
//                         title="Delete password"
//                       >
//                         <lord-icon
//                           src="https://cdn.lordicon.com/skkahier.json"
//                           trigger="hover"
//                           colors="primary:#9ca3af"
//                           style={{ width: "20px", height: "20px" }}
//                         ></lord-icon>
//                       </button>
//                     </div>


//                   </div>
//                 )
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }

// export default Manager




import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ACCENT = "#007AFF";

const Manager = ({ darkMode: darkModeProp }) => {
  const passwordRef = useRef();

  // ---------------- State ----------------
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
    category: "General",
  });

  const [passwordArray, setPasswordArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [passwordOptions, setPasswordOptions] = useState({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const [visiblePasswords, setVisiblePasswords] = useState({});

  const darkMode = darkModeProp ?? false;

  const categories = [
    "All",
    "General",
    "Social Media",
    "Email",
    "Banking",
    "Shopping",
    "Work",
    "Personal",
    "Other",
  ];

  // ---------------- Effects ----------------
  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) setPasswordArray(JSON.parse(passwords));
  }, []);

  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwordArray));
  }, [passwordArray]);

  // ---------------- Functions ----------------

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!", { autoClose: 1500 });
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let charset = "";
    if (passwordOptions.uppercase) charset += uppercase;
    if (passwordOptions.lowercase) charset += lowercase;
    if (passwordOptions.numbers) charset += numbers;
    if (passwordOptions.symbols) charset += symbols;

    if (!charset) {
      toast.error("Select a character type!");
      return;
    }

    let password = "";
    for (let i = 0; i < passwordOptions.length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setForm({ ...form, password });
    setShowPasswordGenerator(false);

    toast.success("Password generated!");
  };

  const getPasswordStrength = (password) => {
    if (!password) return { label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { label: "Weak", color: "red" };
    if (strength <= 4) return { label: "Medium", color: "yellow" };
    return { label: "Strong", color: "green" };
  };

  const stats = (() => {
    const total = passwordArray.length;
    let weak = 0,
      medium = 0,
      strong = 0;

    passwordArray.forEach((p) => {
      const { label } = getPasswordStrength(p.password);
      if (label === "Weak") weak++;
      else if (label === "Medium") medium++;
      else strong++;
    });

    return { total, weak, medium, strong };
  })();

  const savePassword = () => {
    if (
      form.site.length < 3 ||
      form.username.length < 3 ||
      form.password.length < 3
    ) {
      toast.error("All fields need 3+ characters");
      return;
    }

    const newPassword = {
      ...form,
      id: form.id || uuidv4(),
      dateAdded: form.dateAdded || new Date().toISOString(),
    };

    if (form.id) {
      setPasswordArray((prev) =>
        prev.map((p) => (p.id === form.id ? newPassword : p))
      );
      toast.success("Updated!");
    } else {
      setPasswordArray((prev) => [...prev, newPassword]);
      toast.success("Saved!");
    }

    setForm({ site: "", username: "", password: "", category: "General" });
  };

  const deletePassword = (id) => {
    if (window.confirm("Delete this password?")) {
      setPasswordArray((prev) => prev.filter((p) => p.id !== id));
      toast.success("Deleted!");
    }
  };

  const editPassword = (id) => {
    const item = passwordArray.find((p) => p.id === id);
    setForm(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.info("Loaded for editing");
  };

  const filteredPasswords = passwordArray.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      (item.site.toLowerCase().includes(q) ||
        item.username.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)) &&
      (selectedCategory === "All" || item.category === selectedCategory)
    );
  });

  const passwordStrength = getPasswordStrength(form.password);

  // -----------------------------------------------------------
  //                         UI START
  // -----------------------------------------------------------

  return (
    <div className="p-6 md:mycontainer min-h-screen">

      {/* ---------------- Header ---------------- */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-semibold mb-2 tracking-tight">
          <span className="text-gray-400">&lt;</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
            Secure
          </span>
          <span className="text-gray-400">Stack/&gt;</span>
        </h1>
        <p className="text-sm text-gray-600">Your personal Password Manager</p>
      </header>

      {/* ---------------- Stats ---------------- */}
      {passwordArray.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <Stat label="Total" value={stats.total} color="#111" />
          <Stat label="Weak" value={stats.weak} color="red" />
          <Stat label="Medium" value={stats.medium} color="orange" />
          <Stat label="Strong" value={stats.strong} color="green" />
        </div>
      )}

      {/* ---------------- Form ---------------- */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg mb-10">

        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-medium">
            {form.id ? "Edit Password" : "Add New Password"}
          </h2>
          <span className="text-xs text-gray-500">macOS · Light</span>
        </div>

        {/* Input fields */}
        <div className="space-y-4">

          {/* Website */}
          <Input
            label="Website URL"
            name="site"
            value={form.site}
            onChange={handleChange}
            placeholder="example.com or https://..."
          />

          {/* Username + Category */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="your username"
            />

            <Select
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              options={categories.filter((c) => c !== "All")}
            />
          </div>

          {/* Password */}
          <PasswordInput
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            form={form}
            handleChange={handleChange}
            passwordStrength={passwordStrength}
          />

          {/* Generator Panel */}
          {showPasswordGenerator && (
            <GeneratorPanel
              passwordOptions={passwordOptions}
              setPasswordOptions={setPasswordOptions}
              generatePassword={generatePassword}
            />
          )}

          <button
            onClick={() => setShowPasswordGenerator(!showPasswordGenerator)}
            className="text-xs text-sky-600 hover:underline"
          >
            {showPasswordGenerator ? "Hide Generator" : "Open Password Generator"}
          </button>

          <button
            onClick={savePassword}
            className="w-full py-3 text-white font-semibold rounded-xl shadow-md hover:scale-[1.02] transition"
            style={{
              background: `linear-gradient(90deg, ${ACCENT}, #2DA7FF)`,
            }}
          >
            {form.id ? "Update Password" : "Save Password"}
          </button>
        </div>
      </section>

      {/* ---------------- Search & Filter ---------------- */}
      {passwordArray.length > 0 && (
        <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg mb-10">

          <div className="grid md:grid-cols-2 gap-4">

            <Input
              label="Search"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search site, username, or category..."
            />

            <Select
              label="Filter by Category"
              name="categoryFilter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={categories}
            />
          </div>
        </section>
      )}

      {/* ---------------- Password List ---------------- */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Your Passwords ({filteredPasswords.length})
        </h2>

        {filteredPasswords.length === 0 ? (
          <div className="bg-white text-center py-10 rounded-xl shadow-md border">
            <p className="text-gray-500">No passwords found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPasswords.map((item) => {
              const isVisible = visiblePasswords[item.id];
              const strength = getPasswordStrength(item.password);

              return (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-2xl border shadow-md hover:shadow-xl transition"
                >
                  {/* Title */}
                  <div className="flex justify-between mb-3">
                    <div>
                      <p className="font-medium text-lg truncate">{item.site}</p>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    <div
                      className={`w-3 h-3 rounded-full ${
                        strength.label === "Weak"
                          ? "bg-red-500"
                          : strength.label === "Medium"
                          ? "bg-yellow-400"
                          : "bg-green-500"
                      }`}
                    ></div>
                  </div>

                  {/* Username */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-400 mb-1">Username</p>
                    <div className="flex items-center gap-2">
                      <span className="truncate">{item.username}</span>
                      <button
                        className="text-xs text-gray-500 hover:underline"
                        onClick={() => copyText(item.username)}
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Password</p>
                    <div className="flex items-center gap-2">
                      <span className="truncate font-mono">
                        {isVisible
                          ? item.password
                          : "•".repeat(Math.min(item.password.length, 12))}
                      </span>

                      <button
                        className="p-1 hover:bg-gray-100 rounded"
                        onClick={() => togglePasswordVisibility(item.id)}
                      >
                        {isVisible ? (
                          <FaEyeSlash size={17} />
                        ) : (
                          <FaEye size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Footer buttons */}
                  <div className="flex justify-end gap-4 mt-4 border-t pt-3 text-sm">
                    <button
                      className="text-gray-600 hover:underline"
                      onClick={() => editPassword(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => deletePassword(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

/* ---------------- Reusable Components ---------------- */

const Stat = ({ label, value, color }) => (
  <div className="bg-white rounded-2xl p-4 border shadow-md">
    <div className="text-3xl font-semibold" style={{ color }}>
      {value}
    </div>
    <p className="text-xs text-gray-500 mt-1">{label}</p>
  </div>
);

const Input = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="text-xs text-gray-500 mb-1 block">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:outline-none"
      style={{ outlineColor: ACCENT }}
    />
  </div>
);

const Select = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="text-xs text-gray-500 mb-1 block">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:outline-none"
      style={{ outlineColor: ACCENT }}
    >
      {options.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  </div>
);

const PasswordInput = ({
  form,
  handleChange,
  showPassword,
  setShowPassword,
  passwordStrength,
}) => (
  <div>
    <label className="text-xs text-gray-500 mb-1 block">Password</label>

    <div className="relative">
      <input
        name="password"
        value={form.password}
        onChange={handleChange}
        type={showPassword ? "text" : "password"}
        placeholder="Enter password"
        className="w-full px-4 py-2 pr-12 rounded-xl border border-gray-200 focus:ring-2 focus:outline-none"
        style={{ outlineColor: ACCENT }}
      />

      <button
        type="button"
        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
      </button>
    </div>

    {form.password && (
      <div className="mt-3">
        <div className="flex items-center gap-3">
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className={`h-2 rounded-full ${
                passwordStrength.color === "red"
                  ? "bg-red-500 w-1/3"
                  : passwordStrength.color === "yellow"
                  ? "bg-yellow-400 w-2/3"
                  : "bg-green-500 w-full"
              }`}
            ></div>
          </div>

          <span className="text-xs text-gray-700 font-medium">
            {passwordStrength.label}
          </span>
        </div>
      </div>
    )}
  </div>
);

const GeneratorPanel = ({
  passwordOptions,
  setPasswordOptions,
  generatePassword,
}) => (
  <div className="mt-4 p-4 bg-gray-50 border rounded-xl">
    <div className="space-y-3">
      <div>
        <label className="text-xs text-gray-500 block mb-1">
          Length: {passwordOptions.length}
        </label>
        <input
          type="range"
          min="8"
          max="32"
          value={passwordOptions.length}
          onChange={(e) =>
            setPasswordOptions((p) => ({
              ...p,
              length: parseInt(e.target.value),
            }))
          }
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        {["uppercase", "lowercase", "numbers", "symbols"].map((key) => (
          <label key={key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={passwordOptions[key]}
              onChange={(e) =>
                setPasswordOptions((p) => ({
                  ...p,
                  [key]: e.target.checked,
                }))
              }
            />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
        ))}
      </div>

      <button
        onClick={generatePassword}
        className="w-full py-2 text-white font-semibold rounded-xl"
        style={{ background: ACCENT }}
      >
        Generate
      </button>
    </div>
  </div>
);

export default Manager;

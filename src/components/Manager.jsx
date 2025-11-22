import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  FaEye,
  FaEyeSlash,
  FaCopy,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
  FaShieldAlt,
  FaKey,
  FaGlobe
} from "react-icons/fa";

const Manager = () => {
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
    toast.success("Copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
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
      toast.error("Select at least one character type!");
      return;
    }

    let password = "";
    for (let i = 0; i < passwordOptions.length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setForm({ ...form, password });
    setShowPasswordGenerator(false);
    toast.success("Password generated successfully!");
  };

  const getPasswordStrength = (password) => {
    if (!password) return { label: "", color: "bg-slate-200 dark:bg-slate-700", width: "0%" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { label: "Weak", color: "bg-red-500", width: "33%" };
    if (strength <= 4) return { label: "Medium", color: "bg-yellow-500", width: "66%" };
    return { label: "Strong", color: "bg-green-500", width: "100%" };
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
      else if (label === "Strong") strong++;
    });

    return { total, weak, medium, strong };
  })();

  const savePassword = () => {
    if (
      form.site.length < 3 ||
      form.username.length < 3 ||
      form.password.length < 3
    ) {
      toast.error("All fields must have at least 3 characters");
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
      toast.success("Password updated successfully!");
    } else {
      setPasswordArray((prev) => [...prev, newPassword]);
      toast.success("Password saved successfully!");
    }

    setForm({ site: "", username: "", password: "", category: "General" });
  };

  const deletePassword = (id) => {
    if (window.confirm("Are you sure you want to delete this password?")) {
      setPasswordArray((prev) => prev.filter((p) => p.id !== id));
      toast.success("Password deleted!");
    }
  };

  const editPassword = (id) => {
    const item = passwordArray.find((p) => p.id === id);
    setForm(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.info("Editing password...");
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
    <div className="min-h-screen pb-20">
      {/* ---------------- Header Section ---------------- */}
      <div className="bg-indigo-600 dark:bg-slate-900 pb-32 pt-12 px-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Secure Your Digital Life
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto">
            A modern, secure, and elegant way to manage all your passwords in one place.
          </p>

          {/* Stats Cards */}
          {passwordArray.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
              <StatCard label="Total Passwords" value={stats.total} icon={<FaShieldAlt />} />
              <StatCard label="Weak" value={stats.weak} color="text-red-400" />
              <StatCard label="Medium" value={stats.medium} color="text-yellow-400" />
              <StatCard label="Strong" value={stats.strong} color="text-green-400" />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-24">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ---------------- Left Column: Form ---------------- */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border border-slate-100 dark:border-slate-700 transition-colors duration-300 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  {form.id ? <FaEdit className="text-indigo-500" /> : <FaPlus className="text-indigo-500" />}
                  {form.id ? "Edit Password" : "Add Password"}
                </h2>
                {form.id && (
                  <button
                    onClick={() => setForm({ site: "", username: "", password: "", category: "General" })}
                    className="text-xs text-slate-500 hover:text-indigo-500 underline"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <div className="space-y-5">
                <Input
                  label="Website URL"
                  name="site"
                  value={form.site}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  icon={<FaGlobe />}
                />

                <Input
                  label="Username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="johndoe@email.com"
                  icon={<FaShieldAlt />}
                />

                <Select
                  label="Category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  options={categories.filter((c) => c !== "All")}
                />

                <PasswordInput
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  form={form}
                  handleChange={handleChange}
                  passwordStrength={passwordStrength}
                  onGenerateClick={() => setShowPasswordGenerator(!showPasswordGenerator)}
                />

                {showPasswordGenerator && (
                  <GeneratorPanel
                    passwordOptions={passwordOptions}
                    setPasswordOptions={setPasswordOptions}
                    generatePassword={generatePassword}
                  />
                )}

                <button
                  onClick={savePassword}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  {form.id ? "Update Password" : "Save Password"}
                </button>
              </div>
            </div>
          </div>

          {/* ---------------- Right Column: List ---------------- */}
          <div className="lg:col-span-2 space-y-6">

            {/* Search & Filter Bar */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-2/3">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search passwords..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-indigo-500 dark:text-white cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Passwords Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 px-1">
                Your Passwords <span className="text-sm font-normal text-slate-500">({filteredPasswords.length})</span>
              </h3>

              {filteredPasswords.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaKey className="text-3xl text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No passwords found</h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    {passwordArray.length === 0
                      ? "Start by adding your first password using the form."
                      : "Try adjusting your search or filter to find what you're looking for."}
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredPasswords.map((item) => (
                    <PasswordCard
                      key={item.id}
                      item={item}
                      visiblePasswords={visiblePasswords}
                      togglePasswordVisibility={togglePasswordVisibility}
                      copyText={copyText}
                      editPassword={editPassword}
                      deletePassword={deletePassword}
                      getPasswordStrength={getPasswordStrength}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Sub-Components ---------------- */

const StatCard = ({ label, value, icon, color = "text-white" }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
    <div className={`text-2xl font-bold ${color} mb-1`}>{value}</div>
    <div className="text-xs text-indigo-100 flex items-center justify-center gap-1">
      {icon} {label}
    </div>
  </div>
);

const Input = ({ label, name, value, onChange, placeholder, icon }) => (
  <div>
    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
        {icon}
      </div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition-all dark:text-white"
      />
    </div>
  </div>
);

const Select = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">
      {label}
    </label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition-all dark:text-white appearance-none cursor-pointer"
      >
        {options.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
        ▼
      </div>
    </div>
  </div>
);

const PasswordInput = ({
  form,
  handleChange,
  showPassword,
  setShowPassword,
  passwordStrength,
  onGenerateClick
}) => (
  <div>
    <div className="flex justify-between items-center mb-1.5">
      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        Password
      </label>
      <button
        onClick={onGenerateClick}
        className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        Generate
      </button>
    </div>

    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
        <FaKey />
      </div>
      <input
        name="password"
        value={form.password}
        onChange={handleChange}
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition-all dark:text-white font-mono"
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>

    {form.password && (
      <div className="mt-2">
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ease-out ${passwordStrength.color}`}
            style={{ width: passwordStrength.width }}
          />
        </div>
        <p className="text-xs text-right mt-1 text-slate-500 dark:text-slate-400">
          Strength: <span className="font-medium">{passwordStrength.label}</span>
        </p>
      </div>
    )}
  </div>
);

const GeneratorPanel = ({
  passwordOptions,
  setPasswordOptions,
  generatePassword,
}) => (
  <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-2">
    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Length</span>
          <span>{passwordOptions.length}</span>
        </div>
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
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {["uppercase", "lowercase", "numbers", "symbols"].map((key) => (
          <label key={key} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={passwordOptions[key]}
              onChange={(e) =>
                setPasswordOptions((p) => ({
                  ...p,
                  [key]: e.target.checked,
                }))
              }
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
        ))}
      </div>

      <button
        onClick={generatePassword}
        className="w-full py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        Regenerate
      </button>
    </div>
  </div>
);

const PasswordCard = ({
  item,
  visiblePasswords,
  togglePasswordVisibility,
  copyText,
  editPassword,
  deletePassword,
  getPasswordStrength
}) => {
  const isVisible = visiblePasswords[item.id];
  const strength = getPasswordStrength(item.password);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700 transition-all duration-200 group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0 text-indigo-600 dark:text-indigo-400 font-bold text-lg">
            {item.site.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-800 dark:text-white truncate text-lg leading-tight">
              {item.site}
            </h3>
            <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 mt-1">
              {item.category}
            </span>
          </div>
        </div>
        <div className={`w-2 h-2 rounded-full ${strength.color.replace('bg-', 'bg-')}`} title={`Strength: ${strength.label}`} />
      </div>

      <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3">
        <div className="flex items-center justify-between group/field">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">Username</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 truncate select-all">{item.username}</p>
          </div>
          <button
            onClick={() => copyText(item.username)}
            className="text-slate-400 hover:text-indigo-500 opacity-0 group-hover/field:opacity-100 transition-opacity p-1.5"
            title="Copy Username"
          >
            <FaCopy />
          </button>
        </div>

        <div className="flex items-center justify-between group/field">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">Password</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 truncate font-mono">
              {isVisible ? item.password : "••••••••••••"}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => togglePasswordVisibility(item.id)}
              className="text-slate-400 hover:text-indigo-500 p-1.5"
              title={isVisible ? "Hide" : "Show"}
            >
              {isVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
            <button
              onClick={() => copyText(item.password)}
              className="text-slate-400 hover:text-indigo-500 opacity-0 group-hover/field:opacity-100 transition-opacity p-1.5"
              title="Copy Password"
            >
              <FaCopy />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
        <button
          onClick={() => editPassword(item.id)}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors px-2 py-1 rounded hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
        >
          <FaEdit /> Edit
        </button>
        <button
          onClick={() => deletePassword(item.id)}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-red-600 transition-colors px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default Manager;

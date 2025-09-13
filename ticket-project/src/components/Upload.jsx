import { useEffect, useRef, useState } from 'react';
import Ticket from './Ticket';


const Form = ( {submitted, setSubmitted} ) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [avatarError, setAvatarError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null)
  const inputRef = useRef(null);
  const [nameError, setNameError] = useState(null)
  const [userNameError, setUsernameError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [loading, setLoading] = useState(false);




  const validateFile = (file) => {
    if (!file) return 'No file selected';

    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) return "Only JPG or PNG images are allowed."
    if (file.size > 500 * 1024) return "File too large. Please upload a photo under 500kb.";

    return null;

  }
  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer?.files[0] || event.target.files[0];
    const error = validateFile(selectedFile);
    setAvatarError(error);

    if (!error) {
      setFile(selectedFile);
    } else {
      setFile(null);
      console.error(error);
    }
    setIsDragging(false);
  }


  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleRemove = () => {
    setFile(null)
    setAvatarError(null)
    setPreviewUrl(null)
    if (inputRef.current) inputRef.current.value = "";
  }

  const handleChange = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const validateName = (name) => {
    if (!name) return "Name is required";
    return "";
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validateUsername = (username) => {
    if (!username) return "Username is required";
    return "";
  };


const handleSubmit = (e) => {
  e.preventDefault();

  // run validations
  const nameErr = validateName(name);
  const emailErr = validateEmail(email);
  const usernameErr = validateUsername(username);
  const avatarErr = validateFile(file);

  // set errors only if invalid
  if (nameErr) setNameError(nameErr);
  if (emailErr) setEmailError(emailErr);
  if (usernameErr) setUsernameError(usernameErr);
  if (avatarErr) setAvatarError(avatarErr);

  // stop if there are errors
  if (nameErr || emailErr || usernameErr || avatarErr) {
    return;
  }

  // success branch
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    setSubmitted(true);
  }, 5000);
};



  return (
     <>
    {loading ? (
      // Spinner
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
    <div className="bg-white/10 rounded-2xl p-8 shadow-xl flex flex-col items-center">
    <div className='loader'></div>
        <p className="mt-2 text-sm text-gray-400">Generating your ticket...</p>
      </div>
      </div>
    ) : submitted ? (
      // Ticket
      <>
      <Ticket
        name={name}
        email={email}
        username={username}
        avatar={previewUrl}
        file={file}
      />
      </>
    ) : (
    <form 
    className="flex flex-col flex-1 gap-1 pb-4 md:w-[350px] lg:w-[350px] flex-shrink"
    onSubmit={handleSubmit}
    onKeyDown={(e) => {if (e.key === "Enter") {
      handleSubmit
    }}}
    >
      {previewUrl ? (
        <div>
          <h2 className="text-[hsl(252,6%,83%)] text-start text-[15px]">Upload Avatar</h2>
          <label
            htmlFor="file-upload"
            className='flex flex-col gap-2 border-dashed border-2 border-[hsl(245,15%,58%)] py-2 rounded-2xl items-center bg-[violet]/10 mix-blend-lighten transition-colors duration-200 focus-within:border-[hsl(252,95%,75%)] focus-within:bg-[hsl(247,48%,22%)] w-full'>
            <img src={previewUrl} alt="Avatar preview" className='rounded-xl p-2  h-15 w-15 object-cover' />
            <input
              id="file-upload"
              type="file"
              accept=".jpg,.png"
              className="text-[hsl(252,6%,83%)] border-amber-100"
              hidden
              ref={inputRef}
              onChange={handleFileChange}
              aria-label="File Upload"
              tabIndex={0}
            />
            <div className="flex gap-2">
              <button type="button" className='text-[hsl(0,8%,83%)] bg-[hsl(245,19%,35%)] px-1 text-[12px] rounded cursor-pointer hover:underline' onClick={handleRemove}>Remove Image</button>
              <button type="button" className='text-[hsl(0,8%,83%)] bg-[hsl(245,19%,35%)] px-1 text-[12px] rounded cursor-pointer hover:underline' onClick={handleChange}>Change Image</button>
            </div>
          </label>
          <div className="flex gap-2 mt-2 relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="stroke-[hsl(245,15%,58%)]" viewBox="0 0 16 16"><path className="stroke-[hsl(245,15%,58%)]" strokeLinecap="round" strokeLinejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z" /><path className="stroke-[hsl(245,15%,58%)]" d="M8.004 10.462V7.596ZM8 5.57v-.042Z" /><path className="stroke-[hsl(245,15%,58%)]" strokeLinecap="round" strokeLinejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042" /></svg>
            <p className="text-[hsl(245,15%,58%)] text-[12px]" aria-live='polite'>Upload your photo (JPG or PNG, max size: 500kb).</p>
          </div>
        </div>
      ) : (<div className="flex flex-col gap-1 mb-2">
        <h2 className="text-[hsl(252,6%,83%)] text-start text-[15px]">Upload Avatar</h2>
        <div>
          <label
            htmlFor="file-upload"
            className={`flex flex-col gap-2 border-dashed border-2 border-[hsl(245,15%,58%)] p-2 rounded-2xl items-center bg-[hsl(247,48%,17%)] mix-blend-lighten transition-colors duration-200 focus-within:border-[hsl(252,95%,75%)] focus-within:bg-[hsl(247,48%,22%)] cursor-pointer hover:bg-[hsl(245,57%,25%)]
            ${isDragging ? 'bg-[hsl(245,57%,48%)] border-[hsl(252,95%,75%)]' : ''}
            `}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={handleFileChange}
          >
            <input
              id="file-upload"
              type="file"
              accept=".jpg,.png"
              className="text-[hsl(252,6%,83%)] border-amber-100"
              hidden
              ref={inputRef}
              onChange={handleFileChange}
              aria-label="File Upload"
              tabIndex={0}
            />

            <img src="/images/icon-upload.svg" alt="Upload" className='bg-[hsl(248,28%,26%)] rounded-xl p-2 cursor-pointer hover:bg-[hsl(245,52%,29%)] hover:scale-105 transition-all duration-200 mt-3' />
            <p className="text-[hsl(245,15%,58%)] text-[14px]">Drag and drop or click to upload</p>
          </label>

          <div className="flex items-center gap-2 mt-2 relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className={`${avatarError ? "stroke-[hsl(7,88%,67%)]" : "stroke-[hsl(245,15%,58%)]"}`} viewBox="0 0 16 16"><path className={`${avatarError ? "stroke-[hsl(7,88%,67%)]" : "stroke-[hsl(245,15%,58%)]"}`} strokeLinecap="round" strokeLinejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z" /><path className={`${avatarError ? "stroke-[hsl(7,88%,67%)]" : "stroke-[hsl(245,15%,58%)]"}`} d="M8.004 10.462V7.596ZM8 5.57v-.042Z" /><path className={`${avatarError ? "stroke-[hsl(7,88%,67%)]" : "stroke-[hsl(245,15%,58%)]"}`} strokeLinecap="round" strokeLinejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042" /></svg>
            <p className={`${avatarError ? "text-[hsl(7,88%,67%)]" : "text-[hsl(245,15%,58%)]"} text-[12px]`} aria-live='polite'>{avatarError || "Upload your photo (JPG or PNG, max size: 500kb)."}</p>
          </div>
        </div>
      </div>)
      }



      <div className="flex flex-col gap-2 relative z-10 mix-blend-lighten">
        <label htmlFor="full-name" className="text-[hsl(252,6%,83%)] text-[14px]">Full Name</label>
        <input
          id="full-name"
          type="text"
          className={`border-2 ${nameError ? "border-[hsl(7,88%,67%)]" : "border-[hsl(245,15%,58%)]"} p-2 rounded-xl bg-[violet]/10 text-white hover:bg-[hsl(245,57%,25%)] hover:scale-101 transition-all duration-200 cursor-pointer`}
          value={name}
          onBlur={() => setNameError(validateName(name))}
          onChange={(event) => {
            setName(event.target.value);
            if (nameError) setNameError(null);
          }}
        />

        {(
          <div
            className={`flex items-center gap-2 transition-all duration-200 ${nameError ? "opacity-100 h-2" : "opacity-0 h-0 overflow-hidden"
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              className="stroke-[hsl(7,88%,67%)]"
              viewBox="0 0 16 16"
            >
              <path
                className="stroke-[hsl(7,88%,67%)]"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"
              />
              <path
                className="stroke-[hsl(7,88%,67%)]"
                d="M8.004 10.462V7.596ZM8 5.57v-.042Z"
              />
              <path
                className="stroke-[hsl(7,88%,67%)]"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.004 10.462V7.596M8 5.569v-.042"
              />
            </svg>
            <p
              className="text-[hsl(7,88%,67%)] text-[12px]"
              aria-live="polite"
            >
              {nameError}
            </p>
          </div>
        )}



      </div>


      <div className="flex flex-col gap-2 relative z-10 mix-blend-lighten my-2">
        <label htmlFor="email" className="text-[hsl(252,6%,83%)] text-[14px]">Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="example@email.com"
          className={`border-2 ${emailError ? "border-[hsl(7,88%,67%)]" : "border-[hsl(245,15%,58%)]"} p-2 rounded-xl bg-[violet]/10 text-white hover:bg-[hsl(245,57%,25%)] hover:scale-101 transition-all duration-200 cursor-pointer`}
          value={email}
          onBlur={() => setEmailError(validateEmail(email))}
          onChange={(event) => {
            setEmail(event.target.value);
            if (emailError) setEmailError(null);
          }}
        />
        {(
          <div
            className={`flex items-center gap-2 transition-all duration-200 ${emailError ? "opacity-100 h-3" : "opacity-0 h-0 overflow-hidden"
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              className="stroke-[hsl(7,88%,67%)]"
              viewBox="0 0 16 16"
            >
              <path
                className="stroke-[hsl(7,88%,67%)]"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"
              />
              <path
                className="stroke-[hsl(7,88%,67%)]"
                d="M8.004 10.462V7.596ZM8 5.57v-.042Z"
              />
              <path
                className="stroke-[hsl(7,88%,67%)]"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.004 10.462V7.596M8 5.569v-.042"
              />
            </svg>
            <p
              className="text-[hsl(7,88%,67%)] text-[12px]"
              aria-live="polite"
            >
              {emailError}
            </p>
          </div>
        )}
      </div>


      <div className="flex flex-col gap-2 relative z-10 mix-blend-lighten">
        <label htmlFor="github-username" className="text-[hsl(252,6%,83%)] text-[14px]">GitHub Username</label>
        <input
          id="github-username"
          type="text"
          placeholder="@yourusername"
          className={`border-2 ${userNameError ? "border-[hsl(7,88%,67%)]" : "border-[hsl(245,15%,58%)]"} p-2 rounded-xl bg-[violet]/10 text-white hover:bg-[hsl(245,52%,29%)] hover:scale-101 transition-all duration-200 cursor-pointer backdrop-blur-none`}
          value={username}
          onBlur={() => setUsernameError(validateUsername(username))}
          onChange={(event) => setUserName(event.target.value)}
        />
        {(
          <div
            className={`flex items-center gap-2 transition-all duration-200 ${userNameError ? "opacity-100 h-3" : "opacity-0 h-0 overflow-hidden"
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              className="stroke-[hsl(7,88%,67%)]"
              viewBox="0 0 16 16"
            >
              <path
                className="stroke-[hsl(7,88%,67%)]"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"
              />
              <path
                className="stroke-[hsl(7,88%,67%)]"
                d="M8.004 10.462V7.596ZM8 5.57v-.042Z"
              />
              <path
                className="stroke-[hsl(7,88%,67%)]"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.004 10.462V7.596M8 5.569v-.042"
              />
            </svg>
            <p
              className="text-[hsl(7,88%,67%)] text-[12px]"
              aria-live="polite"
            >
              {userNameError}
            </p>
          </div>
        )}
      </div>
      <button type="submit" className="bg-[hsl(7,88%,67%)] text-[hsl(247,48%,17%)] p-2 rounded-xl font-bold text-[18px] relative z-10 hover:scale-102 transition-all duration-200 cursor-pointer mt-1">Generate My Ticket</button>
    </form >
    )}
    </>
  )
}
export default Form
import React, { useEffect, useRef, useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'
import { QueryClient } from '@tanstack/react-query'
import { queryClient } from '../main'
import { gsap } from 'gsap'

const UrlForm = () => {
  
  const [url, setUrl] = useState("https://www.google.com")
  const [shortUrl, setShortUrl] = useState()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [customSlug, setCustomSlug] = useState("")
  const {isAuthenticated} = useSelector((state) => state.auth)
  const formRef = useRef(null)
  const resultRef = useRef(null)

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    }
  }, [])

  useEffect(() => {
    if (shortUrl && resultRef.current) {
      gsap.fromTo(resultRef.current, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
    }
  }, [shortUrl])

  const handleSubmit = async () => {
    try{
      const shortUrl = await createShortUrl(url,customSlug)
      setShortUrl(shortUrl)
      queryClient.invalidateQueries({queryKey: ['userUrls']})
      setError(null)
    }catch(err){
      setError(err.message)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div ref={formRef} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            Enter your URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onInput={(event)=>setUrl(event.target.value)}
            placeholder="https://example.com"
            required
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-violet-600 text-white py-2.5 px-4 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 shadow"
        >Shorten URL
        </button>
         {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        {isAuthenticated && (
          <div className="mt-4">
            <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 mb-1">
              Custom URL (optional)
            </label>
            <input
              type="text"
              id="customSlug"
              value={customSlug}
              onChange={(event) => setCustomSlug(event.target.value)}
              placeholder="Enter custom slug"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            />
          </div>
        )}
        {shortUrl && (
          <div ref={resultRef} className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Your shortened URL:</h2>
            <div className="flex items-center">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="flex-1 p-2 border border-gray-200 dark:border-gray-700 rounded-l-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
               <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-r-lg transition-colors duration-200 ${
                  copied 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-violet-600 text-white hover:bg-violet-700'
                }`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
  )
}

export default UrlForm
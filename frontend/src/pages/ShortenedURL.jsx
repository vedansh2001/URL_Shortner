import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import '../App.css'

function ShortenedURL() {
  const location = useLocation();
  const { url } = location.state || {};
  const navigate = useNavigate();
  const id = useParams();
  const value = `https://url5.vercel.app/${id.shortId}`;

  // State to handle loading and copy notification
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleonclickfunction = () => {
    navigate('/');
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Hide after 2 seconds
    }).catch(err => {
      console.error("Failed to copy URL: ", err);
    });
  };

  const handleAnalytics = async () => {
    try {
      const response = await fetch(`https://url5.vercel.app/url/analytics/${id.shortId}`, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      setLoading(true); // Start loading

      const data = await response.json();

      navigate(`/Analytics/${id.shortId}`, { state: { data, url } });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false); // Stop loading after fetch completes
    }
  };

  return (
    <>
      <div className='bg-[#1E201E] w-full h-screen flex justify-center pt-20'>
        <div className='w-3/5'>
          <h1 className='text-white text-5xl font-bold flex justify-center pb-8'>SHORTENED URL</h1>
          <div className='bg-[#697565] w-full h-[80%] rounded-md relative'> {/* Add relative to parent */}
            <h1 className='pt-7 text-4xl font-semibold text-gray-900 flex justify-center'>
              Copy the shortened link and share it anywhere
            </h1>
            <div className='flex justify-center pt-12 pb-5 w-[80%] ml-[10%] relative'>
              <input
                type="text"
                placeholder='Enter the link here...'
                value={value}
                className='rounded-l w-[80%] h-12 pl-4 text-xl border-2'
              />
              <button
                className='bg-[#ECDFCC] h-12 w-[20%] py-2 text-xl font-semibold rounded-r border-2 hover:opacity-80 relative'
                onClick={handleCopyClick}
              >
                Copy URL
              </button>
              {/* Copied text with absolute positioning */}
              {copied && (
                <div className="absolute top-[100px] left-[85%] transform -translate-x-[50%] bg-green-200 text-green-800 p-2 rounded">
                  Copied!
                </div>
              )}
            </div>
            <p className="ml-[10%] mb-8 text-xl">
              Long URL:&nbsp;
              <a
                href={url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'blue', textDecoration: 'underline' }}
              >
                {url || 'URL not available'}
              </a>
            </p>
            <button
              className='bg-[#ECDFCC] h-12 py-2 px-4 mb-8 text-xl ml-[10%] font-semibold rounded border-2 hover:opacity-80'
              onClick={handleonclickfunction}
            >
              Shorten another URL
            </button>
            <button
              className={`bg-[#ECDFCC] h-12 py-2 px-4 mb-10 text-xl ml-[10%] font-semibold rounded border-2 hover:opacity-80 
                flex items-center justify-center ${loading ? 'cursor-not-allowed opacity-60' : ''}`}
              onClick={handleAnalytics}
              disabled={loading}
              style={{ width: '200px' }} // Set a fixed width for the button
            >
              {loading ? (
                <div className="spinner"></div> // Placeholder for loading animation
              ) : (
                'View Analytics'
              )}
            </button>

            <h1 className="ml-[10%] text-4xl font-semibold mb-7 text-gray-900">
              Share it on social Platforms
            </h1>
            <div className="ml-[10%]">
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${value}`} target="_blank" rel="noopener noreferrer">
                <button className="px-4 rounded py-2 text-xl bg-blue-500 mr-2 text-white hover:opacity-80">LinkedIn</button>
              </a>
              <a href={`https://api.whatsapp.com/send?text=${value}`} target="_blank" rel="noopener noreferrer">
                <button className="px-4 rounded py-2 text-xl bg-green-500 mr-2 text-white hover:opacity-80">WhatsApp</button>
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${value}`} target="_blank" rel="noopener noreferrer">
                <button className="px-4 rounded py-2 text-xl bg-black mr-2 text-white hover:opacity-80">X</button>
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${value}`} target="_blank" rel="noopener noreferrer">
                <button className="px-4 rounded py-2 text-xl bg-blue-600 mr-2 text-white hover:opacity-80">Facebook</button>
              </a>
              <a href={`https://t.me/share/url?url=${value}`} target="_blank" rel="noopener noreferrer">
                <button className="px-4 rounded py-2 text-xl bg-blue-400 mr-2 text-white hover:opacity-80">Telegram</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShortenedURL;

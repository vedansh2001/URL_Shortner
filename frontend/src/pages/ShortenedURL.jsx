import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import '../App.css'

function ShortenedURL() {

  const location = useLocation();
  const { url } = location.state || {};
  const navigate = useNavigate();
  const id = useParams();
  const value = `https://url5.vercel.app/${id.shortId}`;

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShortenAnotherURL = () => {
    navigate('/');
  };

  const handleCopyShortenedURL = () => {
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
      setLoading(true);

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
      <div className='bg-[#1E201E] w-full h-screen pb-[70px] flex justify-center pt-12
                        sm:pt-16
      '>
        <div className='w-[90%]
                        sm:w-3/5
        '>
          <h1 className='text-white text-4xl font-bold flex justify-center pb-6
                           sm:text-5xl
                           sm:pb-8
          '>Shortened Url</h1>
          <div className='bg-[#40534C] w-full h-[98%] rounded-md relative
                            lg:h-[80%]
          '>
            <h1 className='pt-7 pl-3 text-2xl font-semibold text-white flex justify-center
                           sm:text-3xl
            '>
              Copy the shortened link and share it anywhere
            </h1>
            <div className='flex justify-center pt-9 pb-5 w-[80%] ml-[10%] relative
                            sm:pt-12
            '>
              <input
                type="text"
                placeholder='Enter the link here...'
                value={value}
                className='rounded-l w-[70%] h-12 pl-2 text-lg border-2 bg-gray-200
                           sm:w-[80%]
                           sm:pl-4
                           sm:text-xl
                '
              />
              <button
                className='bg-gray-300 h-12 w-[30%] py-2 text-lg font-semibold rounded-r border-2 hover:opacity-80 relative flex justify-center items-center
                             sm:w-[20%]
                             sm:text-2xl
                             sm:font-bold
                '
                onClick={handleCopyShortenedURL}
              >
                Copy
              </button>

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
              className='bg-gray-300 h-12 py-2 px-4 mb-8 text-lg ml-[10%] font-semibold rounded border-2 hover:opacity-80
                           sm:text-xl
              '
              onClick={handleShortenAnotherURL}
            >
              Shorten another URL
            </button>

            <button
              className={`bg-gray-300 h-12 py-2 px-4 mb-5 text-lg ml-[10%] font-semibold rounded border-2 hover:opacity-80 
                flex items-center justify-center 
                sm:text-xl
                sm:w-[180px]
                sm:mb-10
                ${loading ? 'cursor-not-allowed opacity-60' : ''}`}
              onClick={handleAnalytics}
              disabled={loading}
            >
              {loading ? (
                <div className="spinner"></div> 
              ) : (
                'View Analytics'
              )}
            </button>

            <h1 className="ml-[10%] font-sans text-2xl font-semibold mb-7 text-gray-900
                           sm:text-3xl
                           lg:text-4xl
            ">
              Share it on social Platforms
            </h1>

            <div className="ml-[10%]">
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${value}`} target="_blank" rel="noopener noreferrer">
                <button className="px-4 rounded py-2 text-xl mb-2 bg-blue-500 mr-2 text-white hover:opacity-80">LinkedIn</button>
              </a>
              <a href={`https://t.me/share/url?url=${value}`} target="_blank" rel="noopener noreferrer">
                <button className="px-4 rounded py-2 text-xl mb-2 bg-blue-400 mr-2 text-white hover:opacity-80">Telegram</button>
              </a>
              <a href={`https://api.whatsapp.com/send?text=${value}`} target="_blank" rel="noopener noreferrer">
                <button className="px-4 rounded py-2 text-xl bg-green-500 mr-2 text-white hover:opacity-80">WhatsApp</button>
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${value}`} target="_blank" rel="noopener noreferrer">
                <button className="px-4 rounded py-2 text-xl bg-black mr-2 text-white hover:opacity-80">Twitter</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShortenedURL;

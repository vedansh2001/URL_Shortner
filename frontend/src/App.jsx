import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleClickShorten = async () => {
    if (!url) {
      alert('Please enter a URL');
      return;
    }    
    setLoading(true); // Start loading
    try {
        const response = await fetch('https://url5.vercel.app/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Navigate to the URL display page
      navigate(`/shortened/${data.id}`, { state: { url } });

    } catch (error) {
      console.error("Error: ", error);
      alert('An error occurred while shortening the URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className='bg-[#1E201E] w-full h-screen flex justify-center pt-12
                      sm:pt-32
     '>
     <div className='w-[90%]
                     sm:w-3/5
     '>
      <h1 className='text-white text-4xl font-bold flex justify-center pb-8
                       sm:text-5xl
      '>Url Shortner</h1>
      <div className='bg-[#40534C] w-full h-[55%] rounded-md 
                        sm:h-[60%]
                        lg:h-[53%]
      '>
        <h1 className='pt-7 text-4xl font-bold text-white flex justify-center
        ' >Paste the URL</h1>
        <div className='flex justify-center pt-10 pb-10 w-[90%] ml-[5%]'>
        <input 
          type="text" 
          placeholder='Enter the link here...'  
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className='rounded-l w-[80%] h-12 pl-2 text-md border-2 bg-gray-200
                     sm:text-lg
                     sm:pl-4
                     md:text-xl 
        ' />
        <button 
              className={`bg-gray-300 h-12 py-2 w-[140px] text-lg font-semibold rounded-r border-2 flex justify-center items-center
                      hover:opacity-80 
                      sm:text-xl
                      md:w-[170px]
                      sm:w-[200px]
                      ${loading ? 'cursor-not-allowed opacity-60' : ''}`}
              onClick={handleClickShorten}
              disabled={loading}
        >
          {loading ? (
                <div className="spinner"></div> //
              ) : (
                'Shorten'
              )
          }
          
        </button>

        </div>
        <p className='flex justify-center w-[85%] ml-[10%] mr-[5%] font-sans text-md leading-normal font-semibold text-white tracking-wider
                      sm:text-lg
                      sm:w-[80%]
                      sm:mr-[0%]
        '>
          Transform lengthy URLs into sleek, shareable links effortlessly with URL shortner, the free tool designed for easy sharing across all your platforms!
        </p>
      </div>
      <div className="mt-12 ml-[15%]
                      sm:flex justify-center
                      sm:ml-[0]
      ">
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=`} target="_blank" rel="noopener noreferrer">
                <button className="px-2 rounded py-1 text-lg mb-2 bg-blue-500 mr-2 text-white hover:opacity-80
                                   sm:px-4
                                   sm:py-2
                                   sm:text-xl
                ">LinkedIn</button>
              </a>
              <a href={`https://t.me/share/url?url=`} target="_blank" rel="noopener noreferrer">
                <button className="px-2 rounded py-1 text-lg mb-2 bg-blue-400 mr-2 text-white hover:opacity-80
                                   sm:px-4
                                   sm:py-2
                                   sm:text-xl
                ">Telegram</button>
              </a>
              <a href={`https://api.whatsapp.com/send?text=`} target="_blank" rel="noopener noreferrer">
                <button className="px-2 rounded py-1 text-lg mb-2 bg-green-500 mr-2 text-white hover:opacity-80
                                   sm:px-4
                                   sm:py-2
                                   sm:text-xl
                ">WhatsApp</button>
              </a>
              <a href={`https://twitter.com/intent/tweet?url=`} target="_blank" rel="noopener noreferrer">
                <button className="px-3 rounded py-1 text-lg mb-2 bg-black mr-2 text-white hover:opacity-80
                                   sm:px-4
                                   sm:py-2
                                   sm:text-xl
                ">Twitter</button>
              </a>
            </div>
        
     </div>
    </div>

    </>
  )
}

export default App
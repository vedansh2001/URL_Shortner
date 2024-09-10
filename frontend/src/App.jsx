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
    <div className='bg-[#1E201E] w-full h-screen flex justify-center pt-36'>
     <div className='w-3/5'>
      <h1 className='text-white text-5xl font-mono font-bold flex justify-center pb-8'>URL SHORTNER</h1>
      <div className='bg-[#40534C] w-full h-[50%] rounded-md '>
        <h1 className='pt-7 text-4xl font-bold text-gray-900 flex justify-center' >Paste the URL to be shortened</h1>
        <div className='flex justify-center pt-10 pb-10 w-[90%] ml-[5%]'>
        <input 
          type="text" 
          placeholder='Enter the link here...'  
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className='rounded-l w-[80%] h-12 pl-4 text-xl border-2
        ' />
        <button 
              className={`bg-[#ECDFCC] h-12 w-[20%] py-2 text-xl font-semibold rounded-r border-2 flex justify-center items-center
                      hover:opacity-80 
                      ${loading ? 'cursor-not-allowed opacity-60' : ''}`}
              onClick={handleClickShorten}
              disabled={loading}
              style={{ width: '200px' }}
        >
          {loading ? (
                <div className="spinner"></div> //
              ) : (
                'Shorten'
              )
          }
          
        </button>

        </div>
        <p className='flex justify-center w-[80%] ml-[10%] font-sans text-lg leading-normal font-semibold text-gray-950 tracking-wider'>
          Transform lengthy URLs into sleek, shareable links effortlessly with URL SHORTENER, the free tool designed for easy sharing across all your platforms!
        </p>
      </div>
      <div className="flex justify-center mt-12">
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=`} target="_blank" rel="noopener noreferrer">
                <button className="px-4 rounded py-2 text-xl bg-blue-500 mr-2 text-white hover:opacity-80">LinkedIn</button>
              </a>
              <a href={`https://api.whatsapp.com/send?text=`} target="_blank" rel="noopener noreferrer">
                <button className="px-4 rounded py-2 text-xl bg-green-500 mr-2 text-white hover:opacity-80">WhatsApp</button>
              </a>
              <a href={`https://twitter.com/intent/tweet?url=`} target="_blank" rel="noopener noreferrer">
                <button className="px-4 rounded py-2 text-xl bg-black mr-2 text-white hover:opacity-80">X</button>
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=`} target="_blank" rel="noopener noreferrer">
                <button className="px-4 rounded py-2 text-xl bg-blue-600 mr-2 text-white hover:opacity-80">Facebook</button>
              </a>
              <a href={`https://t.me/share/url?url=`} target="_blank" rel="noopener noreferrer">
                <button className="px-4 rounded py-2 text-xl bg-blue-400 mr-2 text-white hover:opacity-80">Telegram</button>
              </a>
            </div>
        
     </div>
    </div>

    </>
  )
}

export default App
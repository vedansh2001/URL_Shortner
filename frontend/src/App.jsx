import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  const handleClick = async () => {
    if (!url) {
      alert('Please enter a URL');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/url', {
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
      console.log('Shortened URL: ', data.id);

      // Navigate to the URL display page
      navigate(`/shortened/${data.id}`, { state: { url } });

    } catch (error) {
      console.error("Error: ", error);
      alert('An error occurred while shortening the URL.');
    }
  };

  return (
    <>
    <div className='bg-[#1E201E] w-full h-screen flex justify-center pt-36'>
    <div className='w-3/5'>
      <h1 className='text-white text-5xl font-bold flex justify-center pb-8'>URL SHORTNER</h1>
      <div className='bg-[#697565] w-full h-[50%] rounded-md '>
        <h1 className='pt-7 text-4xl font-bold text-gray-900 flex justify-center' >Paste the URL to be shortened</h1>
        <div className='flex justify-center pt-10 pb-14 w-[90%] ml-[5%]'>
        <input 
          type="text" 
          placeholder='Enter the link here...'  
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className='rounded-l w-[80%] h-12 pl-4 text-xl border-2
        ' />
        <button 
          onClick={handleClick}
          className='bg-[#ECDFCC] h-12 w-[20%] py-2 text-xl font-semibold rounded-r border-2
                      hover:opacity-80 '
        >
          Shorten
        </button>
        </div>
        <p className='flex justify-center w-[80%] ml-[10%] font-sans leading-normal font-semibold text-gray-950 tracking-wider'>Transform lengthy URLs into sleek, shareable links effortlessly with URL SHORTENER, the free tool designed for easy sharing across all your platforms!</p>
      </div>
        
    </div>
    </div>
    <div className='h-[500px] bg-black'></div>
    </>
  )
}

export default App
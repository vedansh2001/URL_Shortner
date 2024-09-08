import { useLocation, useNavigate, useParams } from "react-router-dom"

function Analytics() {

    const location = useLocation();
    const { data,url } = location.state || {};  

    const navigate = useNavigate();
    const id = useParams()
    
    const handleonclickfunction = () => {
        navigate('/');
    };
    const handleGoToShortenedURL = () => {
        navigate(`/shortened/${id.shortId}`, { state: { url } });
    };

   
   
    return (
        <>
        <div className='bg-[#1E201E] w-full h-screen flex justify-center pt-24'>
        <div className='w-3/5'>
          <h1 className='text-white text-5xl font-bold flex justify-center pb-8'>ANALYTICS</h1>
          <div className='bg-[#697565] w-full h-[70%] rounded-md '>
          <h1 className='pt-7 pb-5 text-3xl font-semibold text-gray-900 ml-[10%]' >Total URL clicks</h1>
          <p className="mx-[10%] text-xl font-normal text-gray-800 ">The total number of times the shortened URL was clicked, directing users to the target page.</p>
          <div className="ml-[15%] mt-10 mb-7 flex">
          <div className="text-4xl px-5 py-3 bg-gray-200 rounded-sm">{data.totalClicks}</div>
          </div>
          <button 
          className='bg-[#ECDFCC] h-12 py-2 px-4 mb-8 text-xl ml-[15%] font-semibold rounded border-2 hover:opacity-80 block '
          onClick={handleonclickfunction}
          >
            Shorten another URL
          </button>
          <button 
          className='bg-[#ECDFCC] h-12 py-2 px-4 mb-8 text-xl ml-[15%] font-semibold rounded border-2 hover:opacity-80 '
          onClick={handleGoToShortenedURL}
          >
            Go back to shortened URL
          </button>
            
          </div>
        </div>
        </div>
        </>
        )
    }
    

export default Analytics;

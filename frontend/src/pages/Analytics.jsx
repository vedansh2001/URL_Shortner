import { useLocation, useNavigate, useParams } from "react-router-dom"

function Analytics() {

    const location = useLocation();
    const { data,url } = location.state || {};  
    const navigate = useNavigate();
    const id = useParams()
    
    const handleShortenAnotherURL = () => {
        navigate('/');
    };

    const handleGoToShortenedURL = () => {
        navigate(`/shortened/${id.shortId}`, { state: { url } });
    };

   
   
    return (
        <>
        <div className='bg-[#1E201E] w-full h-screen flex justify-center pt-16
                          sm:pt-20
        '>
         <div className='w-3/5'>
           <h1 className='text-white text-5xl font-bold flex justify-center pb-8'>
             Analytics
           </h1>
          <div className='bg-[#40534C] w-full h-[70%] rounded-md '>
            <h1 className='pt-7 pb-5 text-3xl font-semibold text-white ml-[10%]'>
              Total URL clicks
            </h1>
            <p className="mx-[10%] text-lg font-normal text-white
                          sm:text-xl
            ">
              The total number of times the shortened URL was clicked, directing users to the target page.
            </p>
          <div className="ml-[10%] mt-10 mb-5 flex
                          sm:mb-7
                          sm:ml-[15%]
          ">
             <div className="text-4xl px-4 py-2 bg-gray-200 rounded-sm
                             sm:px-5
                             sm:py-3
             ">{data.totalClicks}</div>
          </div>

               <button 
                className=' bg-gray-200 h-12 py-2 px-3 mb-5 text-xl ml-[10%] font-semibold rounded border-2 hover:opacity-80 block 
                             sm:mb-8
                             sm:ml-[15%]
                             sm:px-4
                '
                onClick={handleShortenAnotherURL}
               >
                Shorten another URL
               </button>
               
               <button 
                className=' bg-gray-200 h-12 py-2 px-2 mb-5 text-xl ml-[10%] font-semibold rounded border-2 hover:opacity-80 
                              sm:mb-8
                              sm:px-4
                              sm:ml-[15%]
                '
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

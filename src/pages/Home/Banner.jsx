import { Link } from 'react-router-dom';
import banner from '../../assets/banner.jpg'
const Banner = () => {
    return (
        <div className='relative'>
            <img className=' h-[400px] md:h-[700px] w-full' src={banner} alt="" />
            <div className="absolute flex flex-col justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00) 100%)] left-0 top-0  h-[400px] md:h-[700px] w-full">
                <div className=' md:pl-5 lg:pl-12 md:w-1/2 flex flex-col-reverse md:flex-col   md:mt-0'>
                    <div className='space-y-5'>
                        <h2 className='text-white text-xl md:text-4xl lg:text-6xl font-bold'>
                        Experience seamless task organization 
                        </h2>
                        <p className='text-white'>
                        Effortlessly manage projects, track progress, and stay ahead with intuitive drag-and-drop functionality. Empower your team to achieve more with our user-friendly interface.
                        </p>
                    </div>
                    <div className='lg:mt-5'>
                        <button className='px-5 py-[8px] bg-[#202938] rounded-lg text-white'><Link to={'/dashboard'}>Let's Explore</Link></button>
                      
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Banner;
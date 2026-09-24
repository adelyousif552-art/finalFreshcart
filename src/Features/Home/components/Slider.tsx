'use client'
import {Swiper,SwiperSlide}from'swiper/react'
import {Navigation,Pagination,Autoplay} from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css';
import sliderbg from '../../../assets/images/slider.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Slider() {
  return<>
  <section className='relative'>
    <Swiper
  slidesPerView={1}
  spaceBetween={10}
  modules={[Navigation,Pagination,Autoplay]}
  navigation={{
    prevEl:'.prev',
    nextEl:'.next'

  }}
  pagination={{
    clickable:true
  }}
  >
    <SwiperSlide
    
    >
        <div className=' h-100' style={{
            backgroundImage:`url(${sliderbg.src})`,
            backgroundSize:"cover",
            backgroundPosition:'center'
        }}>
            <div className='overlay h-full p-20  bg-linear-to-r from-green-500/90 to-green-400/20'>
            <div className="content space-y-3 ">
                <h1 className='text-4xl text-white font-bold' >Fresh Products Delivered <br/> to your Door</h1>
                <p className='text-gray-100'>Get 20% off your first order</p>
                <div className='space-x-5'>
                    <button className='btn bg-white text-green-600'>Shop Now</button>
                    <button className='btn bg-transparent border-2 border-white/70 text-white'>View Deals</button>
                </div>
            </div>

            </div>

        </div>

    </SwiperSlide>
    
    <SwiperSlide>
         <div className=' h-100' style={{
            backgroundImage:`url(${sliderbg.src})`,
            backgroundSize:"cover",
            backgroundPosition:'center'
        }}>
            <div className='overlay h-full p-20  bg-linear-to-r from-green-500/90 to-green-400/20'>
            <div className="content space-y-3 ">
                <h1 className='text-4xl text-white font-bold' >Premium Quality <br/> Guaranteed </h1>
                <p className='text-gray-100'>fresh from farm to your table</p>
                <div className='space-x-5'>
                    <button className='btn bg-white text-green-600'>Shop Now</button>
                    <button className='btn bg-transparent border-2 border-white/70 text-white'>View Deals</button>
                </div>
            </div>

            </div>

        </div>
    </SwiperSlide>
    
    <SwiperSlide>
         <div className=' h-100' style={{
            backgroundImage:`url(${sliderbg.src})`,
            backgroundSize:"cover",
            backgroundPosition:'center'
        }}>
            <div className='overlay h-full p-20  bg-linear-to-r from-green-500/90 to-green-400/20'>
            <div className="content space-y-3 ">
                <h1 className='text-4xl text-white font-bold' >fast & free Delivery</h1>
                <p className='text-gray-100'>same day delivery available</p>
                <div className='space-x-5'>
                    <button className='btn bg-white text-green-600'>Shop Now</button>
                    <button className='btn bg-transparent border-2 border-white/70 text-white'>View Deals</button>
                </div>
            </div>

            </div>

        </div>
    </SwiperSlide>


  </Swiper>
  <button className='prev z-50 cursor-pointer text-white absolute top-1/2 left-1 -translate-y-1/2'>
    <FontAwesomeIcon className='text-2xl' icon={faArrowLeft}/>
  </button>
  <button className='next z-50 cursor-pointer text-white absolute top-1/2 right-1 -translate-y-1/2'>
    <FontAwesomeIcon className='text-2xl' icon={faArrowRight}/>
  </button>
  </section>
  
  
  </>
}

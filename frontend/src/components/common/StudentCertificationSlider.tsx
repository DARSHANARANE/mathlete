import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Images from "../ui/constants/images";
import Button from "../ui/Button";

const certificates = [
    { id: 1, image: Images.certificate1 },
    { id: 2, image: Images.certificate2 },
    { id: 3, image: Images.certificate3 },
    { id: 4, image: Images.certificate4 },
    { id: 5, image: Images.certificate5 },
];

const StudentCertificationSlider = () => {
    return (
        <div className="py-16  bg-gray-100 ">
            <div className="text-center relative">
                <span className="text-[#e3344a] font-semibold uppercase tracking-wider">
                Student Awards & Rewards  
              </span>
               <h2 className="text-4xl font-black text-[#1b1444] md:text-5xl leading-tight">
                    Recognizing student <br />
                    <span className="text-[#e3344a]">
                        success and achievement.
                    </span>
                </h2>
            </div>
            <div className="max-w-4xl mx-auto px-5 mt-12">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    loop={false}
                    breakpoints={{
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {certificates.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                                <img
                                    src={item.image}
                                    alt="certificate"
                                    className="w-full h-[350px] object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="flex justify-center mt-8">
                <Button to="/gallery" >View All Certificates</Button>
            </div>
        </div>
    );
};

export default StudentCertificationSlider;
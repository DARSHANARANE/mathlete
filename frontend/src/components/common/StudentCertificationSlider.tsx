import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Images from "../ui/constants/images";
import Button from "../ui/Button";

const certificates = [
    { id: 1, image: Images.Certificate1 },
    { id: 2, image: Images.Certificate2 },
    { id: 3, image: Images.Certificate3 },
    { id: 4, image: Images.Certificate4 },
    { id: 5, image: Images.Certificate5 },
];

const StudentCertificationSlider = () => {
    return (
        <div className="py-16  bg-gray-100">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-10">
                    Student Certifications
                </h2>

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
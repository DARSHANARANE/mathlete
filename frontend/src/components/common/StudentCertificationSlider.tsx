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

const awards = [
  {
    title: "1st Winner",
    rewards: [
      "Certificate",
      "Medal",
    ],
  },
  {
    title: "2nd Winner",
    rewards: [
      "Certificate",
      "Medal",
    ],
  },
  {
    title: "3rd Winner",
    rewards: [
      "Certificate",
      "Medal",
    ],
  },
  {
    title: "Merit Holder",
    rewards: [
      "Certificate",
      "Medal",
    ],
  },
  {
    title: "Participant",
    rewards: [
      "Participation Certificate",
    ],
  },
];

const StudentCertificationSlider = () => {
  return (
    <div className="py-16 bg-gray-100">

      {/* Heading */}
      <div className="text-center relative px-4">
        <span className="text-[#e3344a] font-semibold uppercase tracking-wider">
          STUDENT AWARDS & REWARDS
        </span>

       
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-5 leading-tight">
            Awards &  Achievement Recognition
          </h2>

        <p className="max-w-3xl mx-auto mt-5 text-gray-600 text-sm sm:text-[15px] md:text-base leading-7">
          We at Mathlete believe in encouraging students at every level
          by rewarding them for their efforts and achievements.
        </p>
      </div>

      {/* Awards Table */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12">
        <div className="bg-white rounded-[24px] shadow-lg overflow-hidden border border-gray-200">

          {/* Table Header */}
          <div className="bg-[#E3344A] text-white text-center py-4 px-4">
            <h3 className="text-lg sm:text-xl font-bold">
              Results are declared for every standard – Awards for Level I
            </h3>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">

              <thead>
                <tr className="bg-[#fff5f5]">
                  {awards.map((award, index) => (
                    <th
                      key={index}
                      className="border border-gray-200 px-4 py-4 text-lg font-bold text-gray-800"
                    >
                      {award.title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <tr>
                  {awards.map((award, index) => (
                    <td
                      key={index}
                      className="border border-gray-200 px-4 py-6 text-center"
                    >
                      <div className="space-y-3">
                        {award.rewards.map((reward, i) => (
                          <p
                            key={i}
                            className="text-gray-700 font-semibold text-sm sm:text-base"
                          >
                            {reward}
                          </p>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>

            </table>
          </div>
        </div>
      </div>

      {/* Certificates Slider */}
      <div className="max-w-4xl mx-auto px-5 mt-14">
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

      {/* Button */}
      <div className="flex justify-center mt-8">
        <Button to="/gallery">
          View All Certificates
        </Button>
      </div>

    </div>
  );
};

export default StudentCertificationSlider;
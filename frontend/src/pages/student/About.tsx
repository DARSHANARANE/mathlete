import { motion } from "framer-motion";
import Navbar from "../../components/common/homepage/Navbar";
import Footer from "../../components/common/homepage/Footer";
import Images from "../../components/ui/constants/images";

const About = () => {
  return (
    <>
      <Navbar />
      {/* Banner */}
      <div className="relative w-full h-[220px] md:h-[250px]">
        <img
          src={Images.Banner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.h1
            className="text-white text-4xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            About Us
          </motion.h1>
        </div>
      </div>

      {/* Main Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">

          {/* About */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-[#e3344a] font-semibold uppercase tracking-wider">
                About Mathlete
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-6 leading-tight">
                Making Mathematics
                <span className="text-[#e3344a]"> Easy & Fun</span>
              </h2>

              <p className="text-gray-600 leading-8 mb-5">
                Mathlete is a venture by Dynamik Education who are active in the field of education for the past decade. 
                Dynamik Education has established  English marathon ( English language competition for school children)in Pune ,
                 besides this they also manage their  own preschool by the name of Aussie Kids in Bhusari Colony,  Pune. </p>


                <p className="text-gray-600 leading-8 mb-5">Dynamik education is spearheaded by the dynamic  trio Namrata Sharma, Sheetal Kulkarni and Sarita Meid, whose  passion for education and mathematics lead them to create Mathlete.
                They and their expert team are successful in taking mathlete to 3000+ students across 50+ schools in and around Pune.
                </p>

              <p className="text-gray-600 leading-8">
                Through engaging workbooks and activities, students
                practice mathematics in an enjoyable and effective way.
              </p>
            </motion.div>
             {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="w-full max-w-[450px] h-[320px] md:h-[400px]  overflow-hidden flex items-center justify-center">

                <img
                  src={Images.AboutImg}
                  alt="About"
                  className="max-w-full max-h-full object-contain"
                />

              </div>
            </motion.div>
          </div>

          {/* Vision & Mission */}
          <section className="py-12 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              {/* Vision */}
              <motion.div
                className="bg-[#e3344a] rounded-2xl p-10 text-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl font-bold mb-5">
                  Vision
                </h3>

                <p className="leading-8 text-white/90">
                  To help children overcome early hurdles in mathematics
                  while building confidence and a positive attitude.
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                className="bg-[#fff5f5] rounded-2xl p-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl font-bold text-[#e3344a] mb-5">
                  Mission
                </h3>

                <p className="leading-8 text-gray-600">
                  To create a confident and positive stepping stone
                  for every child entering the world of mathematics.
                </p>
              </motion.div>

            </div>
          </section>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
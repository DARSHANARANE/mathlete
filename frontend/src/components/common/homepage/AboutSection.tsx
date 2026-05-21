import { motion } from "framer-motion";
import AboutImages from "../../ui/constants/images";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

export default function AboutSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-white px-6 py-12 md:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2">
        
        {/* LEFT CONTENT */}
        <div>
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
              <Button
                className="mt-8"
                onClick={() => navigate("/about")}
              >
              Learn More
              </Button>
        </div>
        {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="w-full max-w-[450px] h-[320px] md:h-[400px] overflow-hidden flex items-center justify-center">

                <img
                  src={AboutImages.AboutImg}
                  alt="About"
                  className="max-w-full max-h-full object-contain"
                />

              </div>
            </motion.div>
      </div>
    </section>
  );
}
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col items-center lg:flex-row gap-16 max-lg:text-center">
        <img
          src={assets.about_img}
          alt="About Image"
          className="w-full lg:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 lg:w-2/4 text-gray-600">
          <p>
            Forever was born out of a passion for innovation and a desire
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase wide range of products from the
            comfort of their own homes.
          </p>
          <p>
            Since our inception, we&apos;ve worked tirelessly to curate a
            diverse selection of high-quality products that cater to every taste
            and preference. Form fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <b className="text-gray-800">Our Mission:</b>
          <p>
            Our mission At Forever, we&apos;re committed to delivering
            exceptional customer experiences through our user-friendly
            interface, seamless checkout process, and responsive customer
            support. We strive to build long-lasting relationships with our
            customers, partners and suppliers, and to contribute positively to
            the communities we serve.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col lg:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-2 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We ensure that all products meet the highest standards of quality,
            safety, and performance.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-2 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Our user-friendly interface and seamless checkout process make it
            easy for you to find and purchase the products you need.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-2 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our dedicated customer support team is always available to assist
            you with any questions or concerns you may have.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;

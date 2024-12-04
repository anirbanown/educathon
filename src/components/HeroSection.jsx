import video1 from "../assets/robot.gif";
import video2 from "../assets/video2.mp4";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide bg-gradient-to-r from-purple-500 to-red-400 text-transparent bg-clip-text">
        EDUC-A-THON
        
      </h1>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center tracking-wide">
        
        <span className="bg-gradient-to-r text-white">
          {" "}
          2024
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Innovate the Future of Technology
      </p>
      <div className="flex justify-center my-10">
        <a
          href="#"
          className="bg-gradient-to-r from-purple-500 to-purple-600 py-3 px-4 mx-3 rounded-md"
        >
          Register Now
        </a>
        <a href="#" className="py-3 px-4 mx-3 rounded-md border">
          Join our Community
        </a>
      </div>
      <div className="flex mt-10 justify-center">
        
        {/* <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-purple-600 shadow-sm shadow-purple-400 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
      </div>
    </div>
  );
};

export default HeroSection;

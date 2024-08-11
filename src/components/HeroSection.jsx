
// import React from 'react';
// import { motion } from 'framer-motion';

// const HeroSection = () => {
//   return (
//     <div className="hero min-h-screen  relative">
//       <motion.div
//         className="hero-content text-center"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <div className="max-w-md">
//           <motion.h1
//             className="text-5xl font-bold"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.5, duration: 0.7 }}
//           >
//             Welcome to Indian Webify
//           </motion.h1>
//           <motion.p
//             className="py-6"
//             initial={{ opacity: 0, x: -100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 1, duration: 0.7 }}
//           >
//             Your one-stop solution for web and app development. We craft digital experiences that drive business success.
//           </motion.p>
//           <motion.button
//             className="btn btn-primary"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             transition={{ duration: 0.2 }}
//           >
//             Get Started
//           </motion.button>
//         </div>
//       </motion.div>
//       <motion.div
//         className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white to-transparent"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5, duration: 1 }}
//       />
//     </div>
//   );
// };

// export default HeroSection;

import React from 'react';
// import heroimg from 'https://picsum.photos/seed/ecommerce/400/300';

const HeroSection = () => {
  return (
    <div className='min-h-screen relative overflow-hidden z-0 bg-no-repeat bg-cover 'style={{ backgroundImage: `url('https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}>
      <div className='herodesign relative h-[800px] -left-96 lg:-left-40 w-[300px] rounded-3xl   bg-blue-500 rotate-45  overflow-hidden -top-48 lg:-top-60'></div>
      <div className='herodesign absolute -bottom-60 -right-96 lg:-right-44 h-[800px] w-[300px] rounded-3xl -z-20 bg-blue-500 rotate-45 overflow-hidden'></div>
      <div className='flex flex-col lg:flex-row justify-center items-center absolute inset-0 mt-6'>
        <div className='flex flex-col justify-center items-center p-10 lg:p-24 mt-24 lg:mt-0 glass lg:w-[50%] text-white rounded-3xl '>
          <h1 className='text-2xl lg:text-4xl text-center font-extrabold'>Welcome to Indian Webify</h1>
          <p className='lg:px-24 mt-6 px-4'>Transforming ideas into powerful web solutions. We craft stunning websites and robust web applications tailored to your needs.</p>
          <div className='flex justify-center items-center gap-4'>
          <button className='bg-blue-500 hover:bg-indigo-500 mt-10 px-4 py-2 rounded-3xl text-white font-bold'>Appointment</button>
          <button className='hover:bg-blue-500 bg-indigo-500 mt-10 px-4 py-2 rounded-3xl text-white font-bold'>About Us</button>
          </div>
        </div>
        <div className='p-6'>
          {/* <img src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Physiotherapy" className=' w-[80%] mx-auto lg:mx-0 object-cover' /> */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

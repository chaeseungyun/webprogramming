import { motion, useScroll } from "framer-motion"
import './index.css';
import { useEffect } from "react";
import myTrello from '../assets/myTrello.png'
import dDay from '../assets/default.png'
import clock from '../assets/clock.json'
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

export default function Introduce() {
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }, [])

  return (
    <div>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="progress-bar"
      />
      <div
        className="intro-container"
        style={{ backgroundColor: '#C6D4E5' }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ delay: 1, duration: 2 }}
          whileInView={{
            opacity: 0.7,
            scale: [0, 1.7, 1.7, 1.7, 1.5],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "100%"],
          }}
          className="circle"
        />
        <motion.h1
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          style={{ margin: 0, position: 'relative', color: '#09405C' }}
        >
          편리한 일정 관리가 필요하세요?
        </motion.h1>
      </div>
      <motion.div
        className="intro-box"
      >
        <motion.h1
          initial={{ opacity: 0, y: '100%' }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          저희 앱으로 일정을 단계별로 관리해보세요
        </motion.h1>
        <motion.img
          src={myTrello}
          className='intro-img'
          initial={{ opacity: 0, y: '100%' }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
      </motion.div>
      <motion.div
        className="intro-box"
      >
        <div>
          <motion.h1
            initial={{ opacity: 0, y: '100%' }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            기념일을 함께 관리해보세요
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: '100%' }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            디데이도 확인할 수 있어요
          </motion.h2>
        </div>
        <motion.img
          src={dDay}
          className='intro-img'
          initial={{ opacity: 0, y: '100%' }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
      </motion.div>
      <motion.div
        className="intro-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div>
          <h1>지금 시작해보세요</h1>
          <button
            type="button"
            onClick={() => navigate('/login')
            }
            className="add-button"
          >Get Started
          </button>
        </div>
        <Lottie animationData={clock} />
      </motion.div>
    </div>
  )
}
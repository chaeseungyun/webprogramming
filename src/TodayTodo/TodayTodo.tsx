import { motion } from 'framer-motion'
import './TodayTodo.css'
import { useGetTrello } from '../Trello/useGetTrello'
import run from '../assets/run.json';
import note from '../assets/note.json';
import Lottie from 'lottie-react';
import good from '../assets/goodday.png';
import plan from '../assets/plan.png';
import { instance } from '../api';
import { useQuery, useQueryClient } from 'react-query';
import { useState } from 'react';
import AddTodo from './AddTodo';
import trash from '../assets/trash.png';

interface Celeb {
  id: number;
  name: string;
  date: string;
  order_num: number;
}

const getCeleb = async (userId: number) => {
  const response = await instance.get<Celeb[]>(`/anniversaries/${userId}`)

  return response.data;
};

const useGetCeleb = (userId: number) => {
  const { data } = useQuery({
    queryKey: ['celeb'],
    queryFn: () => getCeleb(userId)
  });

  return { data }
}


export default function TodayTodo() {
  const [isOpen, setIsOpen] = useState(false);
  const userId = sessionStorage.getItem('token');
  const { data } = useGetTrello(Number(userId));
  const { data: celeb } = useGetCeleb(Number(userId));
  const queryClient = useQueryClient();
  const date = new Date();
  const makeDday = data?.filter(item => item.type !== 'done').map(item => {
    const month = Number(item.date.slice(5, 7));

    const day = new Date(Number(item.date.slice(0, 4)), month === 0 ? month : month - 1, Number(item.date.slice(8, 10)));

    const dDay = day.getTime() - date.getTime();

    const remain = Math.ceil(dDay / (1000 * 60 * 60 * 24));
    const title = item.title;
    const id = item.id

    return { remain, title, id }
  })

  const deleteTrello = async (id: number) => {
    try {
      await instance.delete(`/trellos/${id}`)
      queryClient.invalidateQueries(['trello']);
    }
    catch {
      alert('항목 삭제에 실패했습니다.')
    }
  }

  const deleteCeleb = async (id: number) => {
    try {
      await instance.delete(`/anniversaries/${id}`)
      alert('기념일을 삭제했습니다.')
      queryClient.invalidateQueries(['celeb']);
    }
    catch {
      alert('기념일 삭제에 실패했습니다.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: '-100%' }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        duration: 1,
      }}
      onMouseDown={e => e.stopPropagation()}
      className='todaytodo-container'>
      <div
        className="today-container"
      >
        <h3 className='today-title'>
          기념일
          <img src={good} alt='기념일' className='good-icon' />
        </h3>
        <div className='todo-content'>
          {celeb && celeb.map(item => (
            <motion.div
              key={item.id}
              className='todo-card'
              whileHover={{ scale: 1.02 }}
            >
              <h4>{item.name}</h4>
              <div className='todo-set'>
                {item.date.slice(0, 10)}
                <img src={trash} alt='쓰레기통' className='good-icon close' onClick={() => deleteCeleb(item.id)} />
              </div>
            </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ opacity: 1 }}
          className='add-celeb'
          onClick={() => setIsOpen(true)}
        >
          기념일 추가하기
        </motion.button>
        <Lottie
          animationData={note}
          className='todo-lottie'
        />
      </div>
      <div
        className="today-container"
      >
        <h3 className='today-title'>
          D-DAY
          <img src={plan} alt='계획 이미지' className='good-icon' />
        </h3>
        <div className='todo-content'>
          {makeDday && makeDday.map(item => (
            item.remain >= 0 ?
              <motion.div
                key={item.id}
                className='todo-card'
                whileHover={{ scale: 1.02 }}
              >
                <h4>{item.title}</h4>
                <div className='todo-set'>
                  <span>D-{item.remain === 0 ? 'day' : item.remain}</span>
                  <img src={trash} alt='쓰레기통' className='good-icon close' onClick={() => deleteTrello(item.id)} />
                </div>
              </motion.div>
              : null
          ))}
        </div>
        <Lottie
          animationData={run}
          className='todo-lottie'
        />
      </div>
      {isOpen && <AddTodo closeModal={() => setIsOpen(false)} />}
    </motion.div >
  )
}
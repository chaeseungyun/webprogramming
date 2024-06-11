import { motion } from "framer-motion";
import '../Trello/AddTrello.css';
import { ChangeEvent, useState } from "react";
import { instance } from "../api";
import { useQueryClient } from "react-query";

interface Props {
  closeModal: () => void;
}

export default function AddTodo({ closeModal }: Props) {
  const [name, setName] = useState('');
  const [orderNum, setOrderNum] = useState(0);
  const [date, setDate] = useState('');
  const queryClient = useQueryClient();

  const user_id = sessionStorage.getItem('token')!;

  const addTodo = async () => {
    try {
      await instance.post('/anniversaries', {
        name, order_num: orderNum, date, user_id
      })
      alert('기념일을 추가했습니다!');
      queryClient.invalidateQueries(['celeb']);
    }
    catch {
      alert('기념일 추가에 실패했습니다.');
    }
  }


  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleContent = (e: ChangeEvent<HTMLInputElement>) => setOrderNum(Number(e.target.value));
  const handleDate = (e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value);

  return (
    <div className="overay" onMouseDown={e => e.stopPropagation()}>
      <motion.div
        className="add-modal"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <div className="modal">
          <label htmlFor="title">* 기념일
            <input id='title' value={name} placeholder="기념일을 입력해주세요" onChange={handleTitle} className="add-input" />
          </label>
          <label htmlFor="content">중요도
            <input id='content' value={orderNum} placeholder="중요도는 어느정도인가요?" onChange={handleContent} className="add-input" />
          </label>
          <label htmlFor="date">* 날짜
            <input id='date' value={date} placeholder="yyyy-mm-dd" onChange={handleDate} className="add-input" />
          </label>
          <div>
            <motion.button
              className='modal-button'
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => addTodo()}
            >
              추가하기
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              className='modal-button'
              type="button"
              onClick={closeModal}>
              닫기
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
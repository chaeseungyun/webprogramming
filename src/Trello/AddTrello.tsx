import { motion } from "framer-motion";
import './AddTrello.css'
import { ChangeEvent, useState } from "react";
import { instance } from "../api";
import { useQueryClient } from "react-query";

interface Props {
  closeModal: () => void;
  type: string;
}

export default function AddTrello({ closeModal, type }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const queryClient = useQueryClient();

  const user_id = sessionStorage.getItem('token')!;

  const addTrello = async () => {
    try {
      await instance.post('/trellos', {
        title, content, date, user_id: Number(user_id), type
      });
      alert('성공적으로 추가했습니다.');
      queryClient.invalidateQueries(['trello'])
      setContent('');
      setTitle('');
      setDate('')
    }
    catch {
      alert('항목 추가에 실패했습니다.')
    }
  }

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleContent = (e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value);
  const handleDate = (e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value);

  return (
    <div className="overay" onMouseDown={e => e.stopPropagation()}>
      <motion.div
        className="add-modal"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ type: "spring", duration: 0.3 }}
      >
        <div className="modal">
          <div className="input-set">
            <label htmlFor="title">* 제목</label>
            <input id='title' value={title} placeholder="제목을 입력해주세요" onChange={handleTitle} className="add-input" />
          </div>
          <div className="input-set">
            <label htmlFor="content">내용</label>
            <input id='content' value={content} placeholder="내용을 입력해주세요" onChange={handleContent} className="add-input" />
          </div>
          <div className="input-set">
            <label htmlFor="date">* 기한</label>
            <input id='date' value={date} placeholder="yyyy-mm-dd" onChange={handleDate} className="add-input" />
          </div>
          <div>
            <motion.button
              className='modal-button'
              type="button"
              onClick={addTrello}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
            >추가하기</motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              className='modal-button'
              type="button"
              onClick={closeModal}>닫기</motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
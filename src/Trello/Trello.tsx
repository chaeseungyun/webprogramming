import { motion, AnimatePresence } from "framer-motion";
import './Trello.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { instance } from "../api";
import { useQueryClient } from "react-query";
import { useState } from "react";
import AddTrello from "./AddTrello";
import { useGetTrello } from './useGetTrello'
import trash from '../assets/trash.png';

export default function Trello() {
  const userId = sessionStorage.getItem('token')!;
  const { data } = useGetTrello(Number(userId));
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const todoArray = data?.filter(item => item.type === 'todo');
  const progressArray = data?.filter(item => item.type === 'progress');
  const doneArray = data?.filter(item => item.type === 'done');
  const queryClient = useQueryClient();

  const modifyTrello = async (id: number, type: string) => {
    try {
      await instance.put(`/trellos/${id}`, {
        type
      });
      queryClient.invalidateQueries(['trello'])
    } catch {
      alert('항목을 변경할 수 없습니다.')
    }
  }

  const deleteTrello = async (id: number) => {
    try {
      await instance.delete(`/trellos/${id}`)
      queryClient.invalidateQueries(['trello']);
    }
    catch {
      alert('항목 삭제에 실패했습니다.')
    }
  }

  const date = new Date();
  const today = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate()}`

  return (
    <motion.div
      className="trello-page"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', duration: 1 }}
    >
      <div
        onMouseDown={(e) =>
          e.stopPropagation()
        }
        className="trello"
      >
        <DragDropContext
          onDragEnd={(result) => {
            modifyTrello(Number(result.draggableId), result.destination!.droppableId)
          }
          }
        >
          <Droppable
            droppableId="todo"
          >
            {(provided, snapshot) => (
              <div
                className="droppable-container"
                ref={provided.innerRef} {...provided.droppableProps}
                style={{ backgroundColor: snapshot.isDraggingOver ? '#cacaca' : 'white' }}
              >
                <div className="draggable-content">
                  <h4>To Do</h4>
                  <AnimatePresence mode="sync">
                    {todoArray && todoArray.map((item, idx) => (
                      <Draggable draggableId={`${item.id}`} index={idx} key={`${item.id}`}>
                        {(provided, snapshot) => (
                          <motion.div
                            layout
                          >
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="card"
                              style={{
                                backgroundColor: snapshot.isDragging
                                  ?
                                  '#09405C' :
                                  item.date < today ? '#cacaca' : 'white'
                                ,
                                color: snapshot.isDragging
                                  ?
                                  'white' : 'black',
                                ...provided.draggableProps.style,
                              }}
                            >
                              <h4>{item.title}</h4>
                              <div className="todo-set">
                                {item.date.slice(0, 10)}까지!
                                <img
                                  src={trash}
                                  className="good-icon"
                                  onClick={() => {
                                    console.log(item.id)
                                    deleteTrello(item.id)
                                  }
                                  }
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                  </AnimatePresence>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setSelectedButton('todo')}
                  className="add-button"
                >+ Add Item
                </motion.button>
              </div>
            )}
          </Droppable>
          <Droppable droppableId="progress">
            {(provided, snapshot) => (
              <div
                className="droppable-container"
                ref={provided.innerRef} {...provided.droppableProps}
                style={{ backgroundColor: snapshot.isDraggingOver ? '#cacaca' : 'white' }}
              >
                <div className="draggable-content">
                  <h4>In Progress</h4>
                  <AnimatePresence mode="sync">
                    {progressArray && progressArray.map((item, idx) => (
                      <Draggable draggableId={`${item.id}`} index={idx} key={`${item.id}`}>
                        {(provided, snapshot) => (
                          <motion.div
                            layout>
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="card"
                              style={{
                                backgroundColor: snapshot.isDragging
                                  ?
                                  '#09405C' :
                                  item.date < today ? '#cacaca' : 'white'
                                ,
                                color: snapshot.isDragging
                                  ?
                                  'white' : 'black',
                                ...provided.draggableProps.style,
                              }}
                            >
                              <h4>{item.title}</h4>
                              <div className="todo-set">
                                {item.date.slice(0, 10)}까지!
                                <img
                                  src={trash}
                                  className="good-icon"
                                  onClick={() => deleteTrello(item.id)}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                  </AnimatePresence>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  type="button"
                  onClick={() => setSelectedButton('progress')}
                  className="add-button"
                >+ Add Item
                </motion.button>
              </div>
            )}
          </Droppable>
          <Droppable droppableId="done">
            {(provided, snapshot) => (
              <div
                className="droppable-container"
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ backgroundColor: snapshot.isDraggingOver ? '#cacaca' : 'white' }}
              >
                <div className="draggable-content">
                  <h4>Done</h4>
                  <AnimatePresence mode="sync">
                    {doneArray && doneArray.map((item, idx) => (
                      <Draggable draggableId={`${item.id}`} index={idx} key={`${item.id}`}>
                        {(provided, snapshot) => (
                          <motion.div
                            layout
                          >
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="card"
                              style={{
                                backgroundColor: snapshot.isDragging
                                  ?
                                  '#09405C' :
                                  item.date < today ? '#cacaca' : 'white'
                                ,
                                color: snapshot.isDragging
                                  ?
                                  'white' : 'black',
                                ...provided.draggableProps.style,
                              }}
                            >
                              <h4>{item.title}</h4>
                              <div className="todo-set">
                                {item.date.slice(0, 10)}까지!
                                <img
                                  src={trash}
                                  className="good-icon"
                                  onClick={() => deleteTrello(item.id)}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                  </AnimatePresence>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  type="button"
                  onClick={() => setSelectedButton('done')}
                  className="add-button"
                >+ Add Item
                </motion.button>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <AnimatePresence>
        {selectedButton && (
          <AddTrello
            closeModal={() => setSelectedButton(null)} type={selectedButton} />
        )}
      </AnimatePresence>
    </motion.div >
  )
}
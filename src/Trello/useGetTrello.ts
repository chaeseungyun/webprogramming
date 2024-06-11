import {useQuery} from 'react-query';
import { instance } from "../api";

interface Trello {
  title: string;
  content: string;
  date: string;
  type: string;
  id: number;
}

const getTrello = async (userId: number) => {
  const response = await instance.get<Trello[]>(`/trellos/${userId}`);
  return response.data;
}

const useGetTrello = (userId: number) => {
  const { data } = useQuery({
    queryKey: 'trello',
    queryFn: () => getTrello(userId),
  });

  return { data }
}

export {useGetTrello}
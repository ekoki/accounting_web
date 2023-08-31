import { useCallback, useState } from "react"
import axios from "axios"

import { Question } from "../types/api/Question"
import { useMessage } from "./useMessage"

export const useQuestions = () => {
  const [loading, setLoading] = useState(false);

  // useMessageフックからshowMessage関数を取ってきている。
  const { showMessage } = useMessage();
  
  const [questions, setQuestions] = useState<Array<Question>>([]);

  // APIからquestionの情報を取得している。
  const getQuestions = useCallback(() => {
    setLoading(true);

    axios.get<Array<Question>>("http://localhost:3010/questions")
    .then((res) => { setQuestions(res.data) })
    .catch(() => { showMessage({ title: "問題の取得に失敗しました", status: "error" })})
    .finally(() => { setLoading(false) })
  },[]);

  return { getQuestions, questions };
};


import { useCallback, useState } from "react"
import axios from "axios"

import { Question } from "../types/api/Question"
import { useMessage } from "./useMessage"

export const useQuestions = () => {
  // useMessageフックからshowMessage関数を取ってきている。
  const { showMessage } = useMessage();
  
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState<Array<Question>>([]);

  // APIからquestionの情報を取得している。
  const getQuestions = useCallback(() => {
    setLoading(true);

    axios.get<Array<Question>>("https://accounting-api-ncq1.onrender.com/index")
    .then((res) => { setQuestions(res.data) })
    .catch(() => { showMessage({ title: "問題の取得に失敗しました", status: "error", duration: 800 })})
    .finally(() => { setLoading(false)})
  },[]);

  return { getQuestions, questions, loading };
};


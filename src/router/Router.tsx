import { memo, VFC } from "react"
import { Switch, Route } from "react-router-dom"

import { StaticPages } from "../components/pages/StaticPages"
import { Questions } from "../components/pages/Questions"
import { Answers } from "../components/pages/Answers"
import { Page404 } from "../components/pages/Page404"

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <Route exact path="/">
        <StaticPages />
      </Route>
      <Route exact path="/questions">
        <Questions />
      </Route>
      <Route exact path="/answers">
        <Answers />
      </Route>
      <Route exact path="*">
        <Page404 />
      </Route>
      
    </Switch>
  )
})
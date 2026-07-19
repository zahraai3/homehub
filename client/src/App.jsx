import { Route , Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import MembersPage from "./features/members/MembersPage"
import ExpensesPage from "./features/expenses/ExpensesPage"


const App = () => {
  return(
      <Routes>
        <Route element={<MainLayout/>}>
          <Route index element={<MembersPage/>} />
          <Route path="expenses" element={<ExpensesPage/>}/>
        </Route>
      </Routes>
  )
}

export default App

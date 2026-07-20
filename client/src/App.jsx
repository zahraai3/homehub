import { Route , Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"

import DashboardPage from './features/dashboard/DashboardPage'
import MembersPage from './features/members/MembersPage'
import SettingPage from './features/settings/SettingPage'
import TasksPage from './features/tasks/TasksPage'
import ShoppingListPage from './features/shoppingList/ShoppingListPage'
import ExpensesPage from './features/expenses/ExpensesPage'



const App = () => {
  return(
      <Routes>
        <Route element={<MainLayout/>}>
          <Route index element={<DashboardPage/>} />
          <Route path="expenses" element={<ExpensesPage/>}/>
          <Route path="tasks" element={<TasksPage/>}/>
          <Route path="shoppinglist" element={<ShoppingListPage/>}/>
          <Route path="members" element={<MembersPage/>}/>
          <Route path="settings" element={<SettingPage/>}/>
        </Route>
      </Routes>
  )
}

export default App

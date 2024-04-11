import React from 'react'
import NotesForm from './components/NotesForm'
import TaskProvider, { TaskContext } from './components/NotesContext';
import AllCollapseExample from './components/NewAccordion';


const App = () => {
  return (
    <div>
      <TaskProvider>
      {/* <NotesForm/> */}
      <AllCollapseExample/>
      </TaskProvider>
     
    </div>
  )
}

export default App
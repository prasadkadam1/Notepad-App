import { createContext, useState } from "react";
export let TaskContext = createContext()
import { useEffect } from "react";
// import { v1 as uuid } from 'uuid'

let TaskProvider = ({ children }) => {
let [filterType, setFilterType] = useState("all")
const [searchTerm, setSearchTerm] = useState('');

    let [state, setState] = useState(
        {
            title: "",
            details: "",
            category : "",
            today : ""
            // id: uuid()
        }
    )
    const getLocoalItems = () => {
        let list = localStorage.getItem('lists')
        // console.log(list);

        if (list) {
            return JSON.parse(localStorage.getItem('lists'))
        } else {
            return []
        }
    }
   


    let [note, setNote] = useState(getLocoalItems())
    let addNote = (title, details, category , today) => {
        setNote([...note, { title, details , category, today }])
    }
    return (
        <TaskContext.Provider value={{ state, setState, addNote, note, setNote, filterType, setFilterType, searchTerm, setSearchTerm }} >{children}</TaskContext.Provider>
    )
}
export default TaskProvider

import React, { Fragment, useContext, useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineSetting } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'
import { TaskContext } from './NotesContext';
// import {v1 as uuid} from 'uuid'
const NotesForm = () => {

    let { state, setState, addNote, note, setNote } = useContext(TaskContext)
    // console.log(note);
    // let id = uuid()

    

    let { title, details } = state
    // console.log(id);
    let handleSubmit = (e) => {
        e.preventDefault()
        try {
            addNote(title, details)
            setState({ title: "", details: "" })
        }
        catch (error) {
            console.log(error);
        }

    }
    let handleChange = (e) => {
        let { name, value } = e.target
        setState({ ...state, [name]: value })
        // localStorage.removeItem('lists');
    }

    let handleDelete = (index) => {
        console.log(index);
        let filteredItem = note.filter((item, p) => p !== index)

        setNote(filteredItem)

    }
    let handleUpdate = (index) => {

        console.log(index);
        let findItem = note.find((tem, p) => p === index)
        let filteredItem = note.filter((item, p) => p !== index)
        setState(findItem)
        setNote(filteredItem)

       


    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(note))
    }, [handleSubmit])

    

    return (
        <main className='mainDiv'>
            <nav>
                <article className='plusSign'><AiOutlinePlus /></article>
                <article className='rightArticle'>
                    <div className='settings'><AiOutlineSetting /></div>
                    <div className='close'><AiOutlineClose /></div>
                </article>
            </nav>

            <form onSubmit={handleSubmit}>
                <h3 className='heading'>Sticky Notes</h3>
                <input required type="text" name='title' value={title}  onChange={handleChange} className='Title' placeholder='Title' />
                <textarea required  type="text" name='details'  value={details} onChange={handleChange} className='addNewNoteHere' placeholder='Add New Note' />
                <div><button type='submit' className='saveButton'>Save Your Note</button></div>

                <div className='search'>
                    <input type="text" className='search' placeholder='Search Your Notes..' />
                </div>
            </form>
            <div>
                <p className='AllNotes'>All Notes</p>
                <div className='allNotesWrapper'>
                    <div className='innerDiv'>

                        {
                            note == [] ? "add new notes....." : note.length > 0 && note.map((ele, index) => {
                                let { title, details } = ele
                                return (
                                    <Fragment key={index}>


                                        <div className='outputDiv'>

                                            <p className='titleP' >Title : {title.slice(0, 29)}</p>
                                            <p className='noteP'>    {details}</p>
                                            <button className='updateBtn' onClick={() => { handleUpdate(index) }}>Update</button>
                                            <button className='deleteBtn' onClick={() => { handleDelete(index) }}>Delete</button>
                                        </div>

                                    </Fragment>
                                )
                            }
                            )
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}
export default NotesForm
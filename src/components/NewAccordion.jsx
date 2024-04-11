import Accordion from 'react-bootstrap/Accordion';
import React, { Children, Fragment, useContext, useEffect, useRef } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineSetting } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'
import { TaskContext } from './NotesContext';

function AllCollapseExample() {
    let { state, setState, addNote, note, setNote, filterType, setFilterType, searchTerm, setSearchTerm } = useContext(TaskContext)
    let { title, details, category } = state
    let todaysDate = new Date()
    let today = todaysDate.toDateString()
    console.log(today);

    let handleSubmit = (e) => {
        e.preventDefault()
        try {
            addNote(title, details, category, today)
            setState({ title: "", details: "", category: "select category" })
            console.log(state);
        }
        catch (error) {
            console.log(error);
        }
    }
    let handleChange = (e) => {
        let { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    let handleDelete = (index) => {
        console.log(index);
        let filteredItem = note.filter((item, p) => p !== index)

        setNote(filteredItem)

    }
    let handleUpdate = (index) => {

        console.log(index);
        let findItem = note.find((item, p) => p === index)
        let filteredItem = note.filter((item, p) => p !== index)
        setState(findItem)
        setNote(filteredItem)
    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(note))
    }, [handleSubmit])

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    const filteredData = note.filter((item) => filterType === 'all' || item.category === filterType);
    console.log(filteredData);




    const getNoteColor = (type) => {
        // Add logic to determine color based on the note type
        console.log(type);
        switch (type) {
            case 'all':
                return 'orange';
            case 'General':
                return '5px solid green';
            // console.log("im general");
            case 'Educational':
                return '5px solid orange';
            case 'Personal':
                return '5px solid blue';
            case 'Other':
                return '5px solid yellow';

            default:
                return '5px solid blue';
        }
    };


    // let today = 




    // console.log(filteredData);

    // let outputDivRef = useRef("")

    // let searchInput = ()=>{
    //     let val = outputDivRef.target.style.background=  "red" 
    //     console.log(val);

    // }


    // switch (state.category){
    //     case state.category:general : ()=>{outputDivRef.style.borderTop=  "red"}
    //     // case education : 
    //     // case personal :
    //     // case other :     
    // }


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredNotes = note.filter((item) => {
        let searchedData = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    }
    );
    console.log(filteredNotes);



    return (
        <Accordion className='accMain'>
            <Accordion.Item eventKey="0" className='acc1'>
                <Accordion.Header className='AccordionHeader'>Add New Note</Accordion.Header>
                <Accordion.Body className='AccordionBody' >
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
                            <input required type="text" autoFocus="on" name='title' value={title} onChange={handleChange} className='Title' placeholder='Title' />
                            <textarea required type="text" name='details' value={details} onChange={handleChange} className='addNewNoteHere' placeholder='Add New Note' />
                            <div className='selectDiv'>
                                <label htmlFor='category' className='categoryHeading'>Choose a category : </label>
                                <select required onClick={handleChange} name="category" id="category">
                                    <option></option>
                                    <option value="General">General</option>
                                    <option value="Educational">Educational</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div><button type='submit' className='saveButton'>Save Your Note</button></div>
                        </form>
                    </main>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className='acc2'>
                <Accordion.Header>View Saved Notes</Accordion.Header>
                <Accordion.Body className='AccordionBody'>
                    <main>
                        <div>
                            <div>
                                <p className='AllNotes'>All Notes</p>
                                <div className='search'>
                                    <input type="text" className='search' onChange={handleSearchChange} value={searchTerm} placeholder='Search Your Notes..' />
                                </div>
                                <div>
                                    <div className='selectDiv' >
                                        <label htmlFor='category' className='categoryHeading'>Or sort by category : </label>
                                        <select required
                                            onChange={handleFilterChange}
                                            value={filterType}
                                            id="category">
                                            <option className='selectOptions' value="all">All</option>
                                            <option
                                                value="General"
                                                className='selectOptions' >General</option>
                                            <option
                                                value="Educational"
                                                className='selectOptions' >Educational</option>
                                            <option value="Personal"
                                                className='selectOptions' >Personal</option>
                                            <option value="Other"
                                                className='selectOptions' >Other</option>
                                        </select>
                                        <div className='allNotesWrapper'>
                                            <div className='innerDiv'>
                                                {note.length == 0 ? "Currently no notes available....." : note.length > 0 && filteredData.map((item, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            <div className='outputDiv'
                                                                style={{ borderTop: getNoteColor(item.category) }}>
                                                                <p className='titleP' >{item.title.slice(0, 29)}</p>
                                                                <div >
                                                                    <p className='categoryP'>{item.category}</p>
                                                                    <p className='dateP'>{item.today} </p>
                                                                </div>
                                                                <p className='noteP'>{item.details}</p>
                                                                <button className='updateBtn' onClick={() => { handleUpdate(index) }}>Update</button>
                                                                <button className='deleteBtn' onClick={() => { handleDelete(index) }}>Delete</button>
                                                            </div>
                                                        </Fragment>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion >
    );
}

export default AllCollapseExample;










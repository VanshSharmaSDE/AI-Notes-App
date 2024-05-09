import React, { useState } from 'react'
import './NoteContainer.css'
import Note from '../Note/Note'
import { Context } from "../../context/Context";
import { useContext } from 'react';

export default function NoteContainer(props) {
    const reverArray = (arr) => {
        const array = [];

        for (let i = arr.length - 1; i >= 0; --i) {
            array.push(arr[i]);
        }

        return array;
    };

    const notes = reverArray(props.notes);

    const {
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input,
        submitData
    } = useContext(Context);

    const[aiSection,setAiSection] = useState(false)

    return (
        <>
            <div className="note-container">
                <h1>HH Notes</h1>
                <i className="ri-bard-line menu" onClick={()=>setAiSection(!aiSection)}></i>
                <div className="note-container-notes custom-scroll">
                    {notes?.length > 0 ? (
                        notes.map((item) => (
                            <Note
                                key={item.id}
                                note={item}
                                deleteNote={props.deleteNote}
                                updateText={props.updateText}
                            />
                        ))
                    ) : (
                        <h3>No Notes present</h3>
                    )}
                    <div className={aiSection?"note-ai-feature showAISection":"note-ai-feature"}>
                        <h1>AI Assistent</h1>
                        <div className="ai-main">
                            <div className="result">
                                <h2>{recentPrompt}</h2>
                                {loading ? (
                                    <div className="loader">
                                        <hr />
                                        <hr />
                                        <hr />
                                        <hr />
                                    </div>
                                ) : (
                                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                )}
                            </div>
                            <div className="prompt">
                                <input type="text" onKeyUp={(e) => submitData(e)}
                                    onChange={(e) => setInput(e.target.value)}
                                    value={input} placeholder='search here...' />
                                <svg
                                    onClick={() => onSent()}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                >
                                    <path d="M3.5 1.34558C3.58425 1.34558 3.66714 1.36687 3.74096 1.40747L22.2034 11.5618C22.4454 11.6949 22.5337 11.9989 22.4006 12.2409C22.3549 12.324 22.2865 12.3924 22.2034 12.4381L3.74096 22.5924C3.499 22.7255 3.19497 22.6372 3.06189 22.3953C3.02129 22.3214 3 22.2386 3 22.1543V1.84558C3 1.56944 3.22386 1.34558 3.5 1.34558ZM5 4.38249V10.9999H10V12.9999H5V19.6174L18.8499 11.9999L5 4.38249Z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

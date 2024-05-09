import React, { useState } from 'react'
import './Sidebar.css'

export default function Sidebar(props) {
    const colors = ["#fe9b72", "#fec971", " #00d4fe", "#b693fd", "#e4ee91"];
    const [listOpen, setListopen] = useState(false)
    return (
        <>
            <div className="Sidebar">
                <i class="ri-information-line info"></i>
                <div className="information">


                    "Welcome to our notes app, designed to enhance your productivity and convenience. Upon clicking the plus icon, a palette of vibrant colors appears, allowing you to personalize your notes according to your preferences. Simply select a color, and a note will be generated with the chosen hue, providing visual organization and clarity to your thoughts.

                    <br />
                    <hr />

                    Moreover, for seamless input, our app offers dual input methods: keyboard typing and voice dictation. By clicking the microphone icon, which becomes visible upon hovering over a note, you can effortlessly transcribe your thoughts through speech.

                    <br />
                    <hr />

                    In addition, a convenient copy feature is available, situated in the bottom-right corner of each note. This functionality enables you to easily duplicate the entire contents of your notes for sharing or reference purposes.

                    <br />
                    <hr />

                    Furthermore, our app incorporates an advanced AI section powered by Google Gemini. This AI section harnesses the cutting-edge capabilities of machine learning to provide powerful assistance. It's crucial to note that this AI operates on a freeform model, ensuring privacy and security by not retaining any user history or references.

                    <br />
                    <hr />

                    Explore the potential of our app's features and elevate your note-taking experience to new heights."
                </div>
                <i className="ri-add-line plus" onClick={() => setListopen(!listOpen)}></i>
                <div className={`Sidebar-list ${listOpen ? "Sidebar-list-active" : ""}`}>
                    {
                        colors.map((item, index) => (
                            <li
                                key={index}
                                className="Sidebar-list-item"
                                style={{ backgroundColor: item }}
                                onClick={() => props.addNote(item)}
                            />
                        ))}
                </div>
            </div>
        </>
    )
}

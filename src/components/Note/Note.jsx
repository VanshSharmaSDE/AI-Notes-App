import React, { useState } from 'react'
import { useRef } from 'react';
import './Note.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Note(props) {

  const notify = (event) => toast.info(event);

  const [typedText, setTypedText] = useState('');
  const [spokenText, setSpokenText] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(new window.webkitSpeechRecognition());

  recognitionRef.current.lang = 'en-IN';
  recognitionRef.current.continuous = true; // Keep listening continuously

  recognitionRef.current.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        setSpokenText((prevText) => prevText + event.results[i][0].transcript + ' ');
      } else {
        interimTranscript += event.results[i][0].transcript + ' ';
        setSpokenText((prevText) => prevText + interimTranscript);
      }
    }
  };

  recognitionRef.current.onend = () => {
    if (listening) {
      recognitionRef.current.start();
    }
  };

  const handleSpeechInput = () => {
    if (!listening) {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  const stopSpeechInput = () => {
    setListening(false);
    recognitionRef.current.stop();
  };

  const handleInputChange = (event) => {
    setTypedText(event.target.value);
    setSpokenText('');
  };

  const handleCopyToClipboard = () => {
    const combinedText = typedText + spokenText;
    navigator.clipboard.writeText(combinedText);
    alert('Text copied to clipboard!');
  };

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);
    const monthNames = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    let hrs = date.getHours();
    let amPm = hrs >= 12 ? "PM" : "AM";
    hrs = hrs % 12 || 12; // Convert hours to 12-hour format

    let min = date.getMinutes();
    min = min < 10 ? "0" + min : min;

    let day = date.getDate();
    const month = monthNames[date.getMonth()];

    return `${hrs}:${min} ${amPm} ${day} ${month}`;
  };

  return (
    <>
      <div className="note" style={{ backgroundColor: props.note.color }}>
        <textarea className='note-text'
          value={typedText + spokenText}
          onChange={handleInputChange}
          placeholder="Type or Speak..."
          defaultValue={props.note.text}></textarea>
        <div className="note-footer">
          <p>{formatDate(props.note.time)}</p>
          <div className="note-mic">
            {
              listening
              ?
              <i className="ri-mic-off-line" onClick={()=>{
                stopSpeechInput()
                notify("Listening Stopped")
              }} disabled={!listening}></i>
              :
              <i className="ri-mic-line" onClick={()=>{
                handleSpeechInput()
                notify("Listening")
              }} disabled={listening}></i>
            }
          </div>
          <div className="note-Copy-Delete">
            <i className="ri-clipboard-line" onClick={handleCopyToClipboard}></i>
            <i className="ri-delete-bin-6-line" onClick={() => props.deleteNote(props.note.id)}></i>
          </div>
        </div>
      </div>
    </>
  )
}

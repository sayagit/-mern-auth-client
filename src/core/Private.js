import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import Layout from '../core/Layout';

function Private() {
    const [notes, setNotes] = useState([]);

    function addNote(newNote) {
        setNotes(prevNotes => {
            return [...prevNotes, newNote];
        });
    }

    function deleteNote(id) {
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id;
            });
        });
    }

    return (
        <Layout>
            <div>
                <CreateArea onAdd={addNote} />
                {notes.map((noteItem, index) => {
                    return (
                        <Note
                            key={index}
                            id={index}
                            title={noteItem.title}
                            content={noteItem.content}
                            onDelete={deleteNote}
                        />
                    );
                })}
            </div>
        </Layout>
    );
}

export default Private;
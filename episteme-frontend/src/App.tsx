import "bootstrap/dist/css/bootstrap.min.css"
import {Routes, Route, Navigate} from "react-router-dom";
import {Container} from "react-bootstrap";
import {NewNote} from "./NewNote.tsx";
import {useLocalStorage} from "./useLocalStorage.tsx";
import {useMemo} from "react";
import {v4 as uuidV4} from "uuid";

export type RawNote = {
    id: string
} & RawNoteData

export type RawNoteData = {
    title: string
    markdown: string
    tagIds: string[]
}

export type Note = {
    id: string
} & NoteData

export type NoteData = {
    title: string
    markdown: string
    tags: Tag[]
}

export type Tag = {
    id: string
    label: string
}

function App() {

  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note, tags: tags.filter(tag=> note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  function onCreateNote({tags, ...data}: NoteData) {
      setNotes(prevNotes => {
          return [...prevNotes, {...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)}]
      })
  }

  function addTag(tag: Tag){
      setTags(prev => [...prev, tag])
  }

    return (
      <Container className={"my-4"}>
        <Routes>
          <Route path="/" element={
              <div>
                  <h1>Episteme</h1>
              </div>
          }/>
          <Route path="/new" element={
              <NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags}/>
          }/>
          <Route path="/:id">
            <Route index element={
              <div>
                <h1>Show</h1>
              </div>
            }/>
            <Route path={"edit"} element={
              <div>
                <h1>Edit</h1>
              </div>
            }/>
          </Route>

          // This route will reroute users to the home page no matter what they put in
          <Route path="*" element={
            <Navigate to={"/"}/>
          }/>
        </Routes>
      </Container>
  )
}

export default App

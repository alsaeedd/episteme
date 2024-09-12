import {Badge, Button, Card, Col, Form, FormControl, Modal, Row, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import ReactSelect from "react-select";
import {Note, Tag} from "./App.tsx";
import {useEffect, useMemo, useState} from "react";
import styles from "./NoteList.module.css"

type NoteListProp = {
    availableTags: Tag[]
    notes: Note[]
    onUpdateTag: (id: string, label: string) => void
    onDeleteTag: (id: string) => void
}

type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}

type EditTagsModalProps = {
    availableTags: Tag[]
    show: boolean
    handleClose: () => void
    onUpdateTag: (id: string, label: string) => void;
    onDeleteTag: (id: string) => void;
}

export function NoteList ({availableTags, notes, onUpdateTag, onDeleteTag}: NoteListProp) {

    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState("");
    const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

    const filteredNotes = useMemo(() => {
        return notes.filter(note =>{
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase()) &&
                (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(
                    noteTag => noteTag.id === tag.id
                ))))
        })
    }, [title, selectedTags, notes]);

    useEffect(() => {
        console.log(editTagsModalIsOpen)
    }, [editTagsModalIsOpen]);

    return (
        <div>
            <Row className={"align-items-center mb-4"}>
                <Col>
                    <h1 className={"mb-4"}>Notes</h1>
                </Col>
                <Col xs={"auto"}>
                    <Stack gap={2} direction={"horizontal"}>
                        <Button
                            onClick={() => setEditTagsModalIsOpen(true)}
                            variant={"outline-secondary"}>
                            Edit Tags
                        </Button>
                        <Link to={"/new"}>
                            <Button variant={"primary"}>Create</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <Form className={"mb-4"}>
                <Row>
                    <Col>
                        <Form.Group controlId={"title"}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type={"text"} value = {title} onChange={
                                e => {setTitle(e.target.value)}
                            }/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={"tags"}>
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect isMulti value={selectedTags.map(tag => {
                                return {label: tag.label, value: tag.id}
                            })}
                                             options={availableTags.map(tag => {
                                                 return {label: tag.label, value: tag.id}
                                             })}
                                             onChange={tags => {
                                                 setSelectedTags(tags.map((tag) => {
                                                         return {label: tag.label, id: tag.value}
                                                     })
                                                 )
                                             }
                                             }/>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} s={2} lg={3} xl={4} className={"g-3"}>
                {filteredNotes.map(note => (
                    <Col key={note.id}>
                        <NoteCard id={note.id} title={note.title} tags={note.tags}/>
                    </Col>))
                }
            </Row>
            <EditTagsModal
                availableTags={availableTags}
                show={editTagsModalIsOpen}
                handleClose={() => setEditTagsModalIsOpen(false)}
                onUpdateTag={onUpdateTag}
                onDeleteTag={onDeleteTag}
            />
        </div>
    )
}

function EditTagsModal({availableTags, show, handleClose, onUpdateTag, onDeleteTag}: EditTagsModalProps) {
    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Tags</Modal.Title>
        </ Modal.Header>
        <Modal.Body>
            <Form>
                <Stack gap={2}>
                    {availableTags.map(tag => (
                        <Row key={tag.id}>
                            <Col>
                                <FormControl
                                    type={"text"}
                                    value={tag.label}
                                    onChange={event => {
                                        event.stopPropagation();
                                        onUpdateTag(tag.id, event.target.value)}}

                                />
                            </Col>
                            <Col xs={"auto"}>
                                <Button
                                    variant={"outline-danger"}
                                    onClick={() => onDeleteTag(tag.id)}
                                >&times;</Button>
                            </Col>
                        </Row>
                    ))}
                </Stack>
            </Form>
        </Modal.Body>
    </Modal>
}

function NoteCard({id, title, tags}: SimplifiedNote) {
    return <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
        <Card.Body>
            <Stack gap={2} className={"h-100 align-items-center justify-content-center"}>
                <span className={"fs-5"}>{title}</span>
                {tags.length > 0 && (
                    <Stack gap={1} direction={"horizontal"} className={"justify-content-center flex-wrap"}>
                        {tags.map(tag => (
                            <Badge key={tag.id} className={"text-truncate"}>{tag.label}</Badge>
                        ))}
                    </Stack>
                )}
            </Stack>
        </Card.Body>
    </Card>
}

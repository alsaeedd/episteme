import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useRef, useState} from "react";
import {NoteData, Tag} from "./App.tsx";
import {v4 as uuidV4} from "uuid";

type NoteFormProps = {
    //This (first line) means we pass it note data and expect nothing (void) in return
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<NoteData>

export function NoteForm({onSubmit, onAddTag, availableTags, title="", markdown="", tags=[],}: NoteFormProps) {

    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
    const navigate = useNavigate();

    function handleSubmit(event: FormEvent) {
        // This function prevents the form from submitting and allows us to handle it using JS
        event.preventDefault();

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags
        });

        navigate("..")
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required ref={titleRef} defaultValue={title}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableSelect isMulti value={selectedTags.map(tag => {
                                return {label: tag.label, value: tag.id}
                            })}
                                onCreateOption={label => {
                                    const newTag = {id: uuidV4(), label}
                                    onAddTag(newTag)
                                    setSelectedTags(prev => [...prev, newTag])
                                }
                                }
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
                <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as="textarea" rows={15} ref={markdownRef} defaultValue={markdown}/>
                </Form.Group>
                <Stack direction={"horizontal"} gap={2} className={"justify-content-end"}>
                    <Link to={".."}>
                        <Button variant={"secondary"} type={"button"}>Cancel</Button>
                    </Link>
                    <Button variant={"primary"} type={"submit"}>Save</Button>
                </Stack>
            </Stack>
        </Form>
    )
}

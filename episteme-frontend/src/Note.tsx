import {useNote} from "./NoteLayout.tsx";
import {Badge, Button, Col, Row, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import ReactMarkdown from "react-markdown";

export function Note() {
    const note = useNote();

    return(
        <div>
            <Row className={"align-items-center mb-4"}>
                <Col>
                    <h1>{note.title}</h1>
                    {note.id.length > 0 && (
                        <Stack gap={1} direction={"horizontal"} className={"flex-wrap"}>
                            {note.tags.map(tag => (
                                <Badge key={tag.id} className={"text-truncate"}>{tag.label}</Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col xs={"auto"}>
                    <Stack gap={2} direction={"horizontal"}>
                        <Button variant={"outline-danger"}>Delete</Button>
                        <Link to={"/"}>
                            <Button variant={"outline-secondary"}>Back</Button>
                        </Link>
                        <Link to={`/${note.id}/edit`}>
                            <Button variant={"primary"}>Edit</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </div>
    )
}

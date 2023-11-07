import { Button, Col, Row } from "reactstrap";
import { TaskList } from "../../components/TaskList";
import { useState } from "react";
import { ModalForm } from "../../components/ModalForm";

export const TaskManager = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Col>
      <Row style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          style={{ width: 200 }}
          color="primary"
          onClick={() => setOpen(true)}
        >
          Add task
        </Button>
      </Row>
      <Row className="mt-4">
        <Col>
          <TaskList />
        </Col>
      </Row>
      <ModalForm isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
    </Col>
  );
};

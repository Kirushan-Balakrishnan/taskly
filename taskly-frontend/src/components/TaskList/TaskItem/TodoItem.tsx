import { Badge, Button, ListGroupItem } from "reactstrap";
import "./todoItem.scss";
import { Task, TaskStatus } from "../../../types/Forms";
import { useTask } from "../../../providers/TaskProvider";
import EditLogo from "../../../assets/images/pen.svg?react";
import { ModalForm } from "../../ModalForm";
import { useState } from "react";

export const TaskItem = ({ task }: { task: Task }) => {
  const { title, description, status, id } = task;

  const { deleteTask } = useTask();

  const [updateModal, setUpdateModal] = useState(false);

  const handleDelete = async () => {
    await deleteTask(id);
  };

  const handleUpdate = async () => {
    setUpdateModal(true);
  };

  const getStatus = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TO_DO:
        return <Badge color="info">{status}</Badge>;
      case TaskStatus.IN_PROGRESS:
        return <Badge color="warning">{status}</Badge>;
      case TaskStatus.DONE:
        return <Badge color="success">{status}</Badge>;
      default:
        return <></>;
    }
  };

  return (
    <ListGroupItem>
      <div className="main_div">
        <div className="main_flex">
          <div className="content_with_button">
            <div
              id="title_pending_todo"
              className="title_with_duration"
              aria-labelledby="title_pending_todo"
            >
              <label
                htmlFor="title_pending_todo"
                aria-labelledby="title_pending_todo"
              >
                {title}
              </label>
              {description && (
                <label
                  htmlFor="title_pending_todo"
                  aria-labelledby="title_pending_todo"
                >
                  {description}
                </label>
              )}

              <label
                htmlFor="title_pending_todo"
                aria-labelledby="title_pending_todo"
              >
                {getStatus(status)}
              </label>
            </div>
          </div>

          <div className="content_with_button">
            <Button outline onClick={handleUpdate}>
              <EditLogo className="edit-button" />
            </Button>

            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              style={{ marginLeft: 20 }}
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
      <ModalForm
        isOpen={updateModal}
        toggle={() => setUpdateModal(!updateModal)}
        task={task}
      />
    </ListGroupItem>
  );
};

import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { TaskForm } from "../TaskForm";
import { Task } from "../../types/Forms";

export const ModalForm = ({
  isOpen,
  toggle,
  task,
}: {
  isOpen: boolean;
  toggle: () => void;
  task?: Task;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered={true}
      fade={true}
      backdrop={true}
    >
      <ModalHeader toggle={toggle} />
      <ModalBody>
        <TaskForm onComplete={toggle} task={task} />
      </ModalBody>
    </Modal>
  );
};

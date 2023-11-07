import {
  ListGroup,
  Alert,
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { TaskItem } from "./TaskItem/TodoItem";

import { useTask } from "../../providers/TaskProvider";
import { taskFilters } from "../../types/Forms";
import { Loading } from "../Loading/loading";

export const TaskList = () => {
  const { tasks, filter, handleFilter, loadingTasks } = useTask();

  if (tasks.length === 0) {
    return <Alert>No tasks to show.</Alert>;
  }

  if (loadingTasks) {
    return <Loading />;
  }

  return (
    <>
      <Navbar color="light" expand="md" light>
        <Nav className="ms-auto" navbar>
          <UncontrolledDropdown setActiveFromChild>
            <DropdownToggle caret className="nav-link" tag="a">
              Status
            </DropdownToggle>
            <DropdownMenu>
              {taskFilters.map((n) => (
                <DropdownItem
                  key={n}
                  active={filter === n}
                  onClick={() => handleFilter(n)}
                >
                  {n}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
      <ListGroup className="mt-4">
        {tasks.map((item) => (
          <TaskItem key={item.id} task={item} />
        ))}
      </ListGroup>
    </>
  );
};

import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Button, FormFeedback } from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Task, TaskItem, TaskStatus } from "../../types/Forms";
import { FormInput } from "../FormInput/formInput";
import { useTask } from "../../providers/TaskProvider";

const schema = yup
  .object({
    title: yup.string().required("Required"),
    description: yup.string().optional(),
    status: yup.string().oneOf(Object.values(TaskStatus)).required("Required"),
  })
  .required();

export const TaskForm = ({
  onComplete,
  task,
}: {
  onComplete: () => void;
  task?: Task;
}) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { addTask, updateTask } = useTask();

  const isEditMode = !!task?.id;

  const {
    handleSubmit,
    trigger,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<TaskItem>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      status: TaskStatus.TO_DO,
    },
  });

  const onSubmit = async (data: TaskItem) => {
    setLoading(true);
    try {
      isEditMode ? await updateTask(data, task.id) : await addTask(data);
      reset();
      onComplete();
    } catch (error) {
      setError("Could not add task");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isEditMode) {
      const fields: Array<keyof TaskItem> = ["title", "description", "status"];
      fields.forEach((field) => setValue(field, task[field]));
    }
  }, [isEditMode, setValue, task]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup style={{ width: "100%" }}>
        <Label for="Title">Title</Label>
        <FormInput
          id="title"
          name="title"
          placeholder="Add task title"
          type="text"
          invalid={!!(errors.title && errors.title.message)}
          onBlur={() => trigger("title")}
          onChange={(e) => setValue("title", e.target.value)}
          control={control}
        />
        <FormFeedback>{errors.title && errors.title.message}</FormFeedback>
      </FormGroup>{" "}
      <FormGroup style={{ width: "100%" }}>
        <Label for="Description">Description</Label>
        <FormInput
          id="description"
          name="description"
          placeholder="Add task description"
          type="text"
          invalid={!!(errors.description && errors.description.message)}
          onBlur={() => trigger("description")}
          onChange={(e) => setValue("description", e.target.value)}
          control={control}
        />
        <FormFeedback>
          {errors.description && errors.description.message}
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="Status">Status</Label>
        <FormInput
          id="status"
          name="status"
          type="select"
          onChange={(e) => setValue("status", e.target.value as TaskStatus)}
          control={control}
        >
          {Object.values(TaskStatus).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </FormInput>
      </FormGroup>
      <Button style={{ marginTop: 20 }} color="secondary" disabled={loading}>
        {isEditMode ? "Update" : "Add"}
      </Button>
      <FormFeedback>{error}</FormFeedback>
    </Form>
  );
};

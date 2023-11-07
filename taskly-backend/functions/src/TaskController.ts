/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import { Response } from "express";
import { admin, db } from "./config/firebase";

enum TaskStatus {
  TO_DO = "To Do",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
}

const taskFilters = [
  TaskStatus.TO_DO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.DONE,
  "All",
] as const;
type TaskFilter = (typeof taskFilters)[number];

type TaskItem = {
  title: string;
  description?: string;
  status: TaskStatus;
};

type Request = {
  body: TaskItem;
  params: { taskId: string };
  query: {
    filter: TaskFilter;
  };
};

const addEntry = async (req: Request, res: Response) => {
  const { title, description, status } = req.body;
  try {
    const entry = db.collection("tasks").doc();
    const entryObject = {
      id: entry.id,
      title,
      description,
      status,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await entry.set(entryObject);

    res.status(200).send({
      status: "success",
      message: "Task added successfully",
      data: entryObject,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json(err.message);
  }
};

const getAllEntries = async (req: Request, res: Response) => {
  const filter = req?.query.filter;
  try {
    const allEntries: TaskItem[] = [];
    const querySnapshot = await db
      .collection("tasks")
      .orderBy("updatedAt", "desc")
      .get();
    querySnapshot.forEach((doc: any) => allEntries.push(doc.data()));
    const filtered =
      filter === "All" || !filter
        ? allEntries
        : allEntries.filter((item) => item.status === filter);
    return res.status(200).json(filtered);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json(err.message);
  }
};

const updateEntry = async (req: Request, res: Response) => {
  const {
    body: { title, description, status },
    params: { taskId },
  } = req;

  try {
    const entry = db.collection("tasks").doc(taskId);
    const currentData = (await entry.get()).data() || {};

    const entryObject = {
      title: title || currentData.title,
      text: description || currentData.description,
      status: status || currentData.status,
      createdAt: currentData.createdAt,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await entry.set(entryObject).catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    });

    return res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      data: entryObject,
    });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json(err.message);
  }
};

const deleteEntry = async (req: Request, res: Response) => {
  const { taskId } = req.params;

  try {
    const entry = db.collection("tasks").doc(taskId);

    await entry.delete().catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    });

    return res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json(err.message);
  }
};

export { addEntry, getAllEntries, updateEntry, deleteEntry };

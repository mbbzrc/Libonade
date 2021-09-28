const questionsRouter = require("express").Router();

const { requireAdmin } = require("./utils");

const {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getAllQuestions,
  getQuestionById,
  getQuestionsByTypeCatForm,
} = require("../db");

questionsRouter.post("/admin", requireAdmin, async (req, res, next) => {
  try {
    const { content, type, category, form } = req.body;
    const question = await createQuestion({ content, type, category, form });

    res.send({ message: "Question successfully created.", question });
  } catch (error) {
    next(error);
  }
});

questionsRouter.patch("/admin", requireAdmin, async (req, res, next) => {
  try {
    const { id, content, type, category, form } = req.body;
    const question = await updateQuestion({
      id,
      content,
      type,
      category,
      form,
    });

    if (!question) {
      return next({
        name: "UpdateQuestionError",
        message: "There is no question with this ID to update!",
      });
    }

    res.send({ message: "Question successfully updated.", question });
  } catch (error) {
    next(error);
  }
});

questionsRouter.delete("/admin/:id", requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await deleteQuestion({ id });

    if (!question) {
      return next({
        name: "DeleteQuestionError",
        message: "Unable to locate question for deletion.",
      });
    }

    res.send({ message: "Question successfully deleted.", question });
  } catch (error) {
    next(error);
  }
});

questionsRouter.get("/admin", requireAdmin, async (req, res, next) => {
  try {
    const questions = await getAllQuestions();

    res.send(questions);
  } catch (error) {
    next(error);
  }
});

questionsRouter.get("/admin/:id", requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await getQuestionById({ id });

    if (!question) {
      return next({
        name: "QuestionNotFoundError",
        message: "This question does not exist in the database.",
      });
    }

    res.send(question);
  } catch (error) {
    next(error);
  }
});

questionsRouter.get("/", async (req, res, next) => {
  try {
    const { type, category, form } = req.body;
    let searchFields = {};
    if (type) searchFields.type = type;
    if (category) searchFields.category = category;
    if (form) searchFields.form = form;

    const questions = await getQuestionsByTypeCatForm(searchFields);

    if (questions.length < 1) {
      return res.send({ message: "No questions available!" });
    }

    res.send(questions);
  } catch (error) {
    next(error);
  }
});

module.exports = questionsRouter;

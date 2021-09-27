const questionsRouter = require("express").Router();

const { requireAdmin } = require("./utils");

const {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getAllQuestions,
} = require("../db");

questionsRouter.post("/", requireAdmin, async (req, res, next) => {
  try {
    const { content, type, category, form } = req.body;
    const question = await createQuestion({ content, type, category, form });

    res.send({ message: "Question successfully created.", question });
  } catch (error) {
    next(error);
  }
});

questionsRouter.patch("/", requireAdmin, async (req, res, next) => {
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

questionsRouter.delete("/:id", requireAdmin, async (req, res, next) => {
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

questionsRouter.get("/", requireAdmin, async (req, res, next) => {
  try {
    const questions = await getAllQuestions();

    res.send(questions);
  } catch (error) {
    next(error);
  }
});

// questionsRouter.post("/", requireAdmin, async (req, res, next) => {
//     try {
//         const question = await
//     } catch (error) {
//         next(error)
//     }
// })

// getQuestionById**
// getQuestionsByTypeCatForm

module.exports = questionsRouter;

const questionsRouter = require("express").Router();

const { requireAdmin } = require("./utils");

const { createQuestion, updateQuestion } = require("../db");

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

// questionsRouter.post("/", async (req, res, next) => {
//     try {
//         const question = await
//     } catch (error) {
//         next(error)
//     }
// })

// updateQuestion**
// deleteQuestion**
// getAllQuestions**
// getQuestionById**
// getQuestionByTypeCatForm

module.exports = questionsRouter;

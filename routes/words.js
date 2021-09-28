const wordsRouter = require("express").Router();

const { requireAdmin } = require("./utils");

const {
  createWord,
  updateWord,
  deleteWord,
  getAllWords,
  getWordById,
  getWordsByTypeCatForm,
} = require("../db");

wordsRouter.post("/admin", requireAdmin, async (req, res, next) => {
  try {
    const { content, type, category, form } = req.body;
    const word = await createWord({ content, type, category, form });

    res.send({ message: "Word successfully created.", word });
  } catch (error) {
    next(error);
  }
});

wordsRouter.patch("/admin", requireAdmin, async (req, res, next) => {
  try {
    const { id, content, type, category, form } = req.body;
    const word = await updateWord({
      id,
      content,
      type,
      category,
      form,
    });

    if (!word) {
      return next({
        name: "UpdateWordError",
        message: "There is no word with this ID to update!",
      });
    }

    res.send({ message: "Word successfully updated.", word });
  } catch (error) {
    next(error);
  }
});

wordsRouter.delete("/admin/:id", requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const word = await deleteWord({ id });

    if (!word) {
      return next({
        name: "DeleteWordError",
        message: "Unable to locate word for deletion.",
      });
    }

    res.send({ message: "Word successfully deleted.", word });
  } catch (error) {
    next(error);
  }
});

wordsRouter.get("/admin", requireAdmin, async (req, res, next) => {
  try {
    const words = await getAllWords();

    res.send(words);
  } catch (error) {
    next(error);
  }
});

wordsRouter.get("/admin/:id", requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const word = await getWordById({ id });

    if (!word) {
      return next({
        name: "WordNotFoundError",
        message: "This word does not exist in the database.",
      });
    }

    res.send(word);
  } catch (error) {
    next(error);
  }
});

wordsRouter.get("/", async (req, res, next) => {
  try {
    const { type, category, form } = req.body;
    let searchFields = {};
    if (type) searchFields.type = type;
    if (category) searchFields.category = category;
    if (form) searchFields.form = form;

    const words = await getWordsByTypeCatForm(searchFields);

    if (words.length < 1) {
      return res.send({ message: "No words available!" });
    }

    res.send(words);
  } catch (error) {
    next(error);
  }
});

module.exports = wordsRouter;

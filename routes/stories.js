const storiesRouter = require("express").Router();

const {
  createStory,
  getAllStories,
  getStoryById,
  updateStory,
  deleteStory,
  getStoriesByCategory,
  getStoriesByPlayers,
} = require("../db/stories");
const { requireAdmin } = require("./utils");

storiesRouter.post("/admin", requireAdmin, async (req, res, next) => {
  try {
    const { title, content, category, players } = req.body;
    const story = await createStory({ title, content, category, players });

    if (!story) {
      return next({
        name: "StoryExistsError",
        message: "A story with this title already exists!",
      });
    }

    res.send({ message: `Successfully created story: ${title}`, story });
  } catch (error) {
    next(error);
  }
});

storiesRouter.patch("/admin", requireAdmin, async (req, res, next) => {
  try {
    const { id, title, content, category, players } = req.body;
    let updateFields = { id };
    if (title) updateFields.title = title;
    if (content) updateFields.content = content;
    if (category) updateFields.category = category;
    if (players) updateFields.players = players;

    const story = await updateStory(updateFields);

    res.send({ message: `Successfully updated story: ${title}` });
  } catch (error) {
    next(error);
  }
});

storiesRouter.delete("/admin", requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.body;
    const story = await deleteStory({ id });

    res.send({ message: "Story successfully deleted.", story });
  } catch (error) {
    next(error);
  }
});

storiesRouter.get("/", async (req, res, next) => {
  try {
    const stories = await getAllStories();

    res.send({ stories });
  } catch (error) {
    next(error);
  }
});

storiesRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const story = await getStoryById({ id });

    if (!story) {
      return next({
        name: "NoStoryError",
        message: "No story matches this ID.",
      });
    }

    res.send(story);
  } catch (error) {
    next(error);
  }
});

storiesRouter.get("/category/:category", async (req, res, next) => {
  try {
    const { category } = req.params;
    const stories = await getStoriesByCategory({ category });

    res.send(stories);
  } catch (error) {
    next(error);
  }
});

storiesRouter.get("/players/:players", async (req, res, next) => {
  try {
    const { players } = req.params;
    const stories = await getStoriesByPlayers({ players });

    res.send(stories);
  } catch (error) {
    next(error);
  }
});

module.exports = storiesRouter;

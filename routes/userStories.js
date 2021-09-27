const userStoriesRouter = require("express").Router();

const {
  createUserStory,
  getUserStoriesByUserId,
  getUserStoryById,
  deleteUserStory,
} = require("../db");

const { requireUser } = require("./utils");

userStoriesRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { title, content } = req.body;
    const userStory = await createUserStory({ userId, title, content });

    res.send({ message: "Your Libonade has been saved!", userStory });
  } catch (error) {
    next(error);
  }
});

userStoriesRouter.get("/user", requireUser, async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const userStories = await getUserStoriesByUserId({ userId });

    res.send(userStories);
  } catch (error) {
    next(error);
  }
});

userStoriesRouter.get("/:id", requireUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const userStory = await getUserStoryById({ id, userId });

    res.send(userStory);
  } catch (error) {
    next(error);
  }
});

userStoriesRouter.delete("/:id", requireUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const userStory = await deleteUserStory({ id, userId });

    if (!userStory) {
      return next({
        name: "DeleteUserStoryError",
        message: "Unable to locate user story for deletion!",
      });
    }

    res.send({ message: "User story successfully deleted.", userStory });
  } catch (error) {
    next(error);
  }
});

module.exports = userStoriesRouter;

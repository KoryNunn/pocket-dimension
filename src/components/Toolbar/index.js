const SearchBar = require("../SearchBar");
const Button = require("../Button");

module.exports = function createToolBar(fastn, app) {
  var createPostIcon = fastn("span", { class: "icon" }, "☵");
  var createPost = fastn(
    "div",
    { class: "create-post" },
    Button(fastn, app, "Create Post", createPostIcon).on("click", () => {
      app.showCreatePost();
    })
  );
  return fastn(
    "div",
    { class: "toolbar" },
    fastn("div", { class: "search-and-create" }, SearchBar(fastn, app), createPost)
  );
};
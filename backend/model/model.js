const { v4: uuidv4 } = require('uuid');

const { films } = require('../data/films');
const { comments } = require('../data/comments');

const COMMENT_AUTHOR = 'MovieBuff';

function getFilmById(id) {
  const foundFilm = films.find((film) => film.id === id);
  return foundFilm ?? null;
}

function getFilmByCommentId(id) {
  const foundFilm = films.find((film) => film.comments.includes(id));
  return foundFilm ?? null;
}

function getCommentById(id) {
  const foundComment = comments.find((comment) => comment.id === id);
  return foundComment ?? null;
}

function getCommentsOfFilm(film) {
  const commentIds = film.comments;
  return comments.filter((comment) => commentIds.includes(comment.id));
}

function updateFilm(film, userDetails) {
  film['user_details'] = userDetails;
  return film;
}

function addCommentToFilm(comment, film) {
  const commentId = uuidv4();

  comments.push({
    id: commentId,
    author: COMMENT_AUTHOR,
    ...comment,
  });

  film.comments.push(commentId);

  return {
    film,
    comments: getCommentsOfFilm(film),
  };
}

function deleteCommentFromFilm(comment, film) {
  const commentIndex = comments.indexOf(comment);
  comments.splice(commentIndex, 1);

  const { comments: commentIds } = film;
  const commentIdIndex = commentIds.indexOf(comment.id);
  commentIds.splice(commentIdIndex, 1);
}

module.exports = {
  getFilmById,
  getFilmByCommentId,
  getCommentById,
  getCommentsOfFilm,
  updateFilm,
  addCommentToFilm,
  deleteCommentFromFilm,
};

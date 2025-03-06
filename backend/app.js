const express = require('express');

const { films } = require('./data/films');

const { NotFoundError } = require('./model/not-found-error');
const { AuthorizationError } = require('./model/authorization-error');

const {
  getFilmById,
  getFilmByCommentId,
  getCommentById,
  getCommentsOfFilm,
  updateFilm,
  addCommentToFilm,
  deleteCommentFromFilm,
} = require('./model/model');

const PORT = 8081;
const AUTH_REGEXP = /^Basic [a-zA-Z0-9]+$/;

const app = express();

const filmsRouter = express.Router();
const commentsRouter = express.Router();

app.use(express.json());
app.use(express.static('public'));

app.use((request, response, next) => {
  const isAuthPassed = AUTH_REGEXP.test(request.headers.authorization);
  if (!isAuthPassed) {
    return response.status(401).json(new AuthorizationError());
  }
  next();
});

app.use((_, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

//  Получение всех фильмов
filmsRouter.get('/', (_, response) => {
  response.json(films);
});

//  Обновление пользовательской информации в фильме
filmsRouter.put('/:id', (request, response) => {
  const filmId = request.params.id;
  const film = getFilmById(filmId);

  if (!film) {
    return response.status(404).json(new NotFoundError());
  }

  const { 'user_details': userDetails } = request.body;
  const updatedFilm = updateFilm(film, userDetails);
  response.json(updatedFilm);
});

//  Получение комментариев к фильму
commentsRouter.get('/:filmId', (request, response) => {
  const filmId = request.params.filmId;
  const film = getFilmById(filmId);

  if (!film) {
    return response.status(404).json(new NotFoundError());
  }

  response.json(getCommentsOfFilm(film));
});

//  Добавление комментария к фильму
commentsRouter.post('/:filmId', (request, response) => {
  const filmId = request.params.filmId;
  const film = getFilmById(filmId);

  if (!film) {
    return response.status(404).json(new NotFoundError());
  }

  const comment = request.body;
  const { updatedFilm, filmComments } = addCommentToFilm(comment, film);

  response.json({
    film: updatedFilm,
    comments: filmComments,
  });
});

//  Удаление комментария
commentsRouter.delete('/:id', (request, response) => {
  const commentId = request.params.id;
  const comment = getCommentById(commentId);
  const film = getFilmByCommentId(commentId);

  if (!comment || !film) {
    return response.status(404).json(new NotFoundError());
  }

  deleteCommentFromFilm(comment, film);
  response.sendStatus(200);
});

app.use('/movies', filmsRouter);
app.use('/comments', commentsRouter);

app.listen(PORT, 'localhost', function() {
  console.log(`Server is started at port ${PORT}`);
});

import { STATS_SHOWN_GENRES_COUNT } from './consts';
import { getFilmsCountByGenres } from './get-statistics';
import type Film from './types/film';

const Y0 = 60;
const COLUMN_WIDTH = 50;
const COLUMN_GAP = 2 * COLUMN_WIDTH;
const GENRE_NAME_GAP = 30;
const FILMS_COUNT_GAP = 60;
const MAX_COLUMN_HEIGHT_COEFFICIENT = 0.7;

const GOLD = '#ffe800';
const ORANGE = '#e49a27';
const WHITE = '#ffffff';

const FONT_FAMILY = '"Open Sans", "Arial", sans-serif';
const FONT_SIZE = '24px';
const TEXT_ALIGN = 'center';

const renderColumn = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
): void => {
  const gradient = ctx.createLinearGradient(x, y, x, y + height);

  gradient.addColorStop(0, ORANGE);
  gradient.addColorStop(1, GOLD);

  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, width, height);
};

const renderGenreName = (
  ctx: CanvasRenderingContext2D,
  genreName: string,
  x: number,
  y: number,
): void => {
  ctx.fillStyle = WHITE;
  ctx.font = `${FONT_SIZE} ${FONT_FAMILY}`;
  ctx.textAlign = TEXT_ALIGN;
  ctx.fillText(genreName, x, y);
};

const renderFilmsCount = (
  ctx: CanvasRenderingContext2D,
  filmsCount: number,
  x: number,
  y: number,
): void => {
  ctx.fillStyle = GOLD;
  ctx.font = `bold ${FONT_SIZE} ${FONT_FAMILY}`;
  ctx.textAlign = TEXT_ALIGN;
  ctx.fillText(filmsCount.toFixed(0), x, y);
};

const renderGenreColumns = (
  ctx: CanvasRenderingContext2D,
  filmsCountByGenres: [string, number][],
  canvasWidth: number,
  canvasHeight: number,
): void => {
  const columnsCount = filmsCountByGenres.length;
  if (columnsCount === 0) {
    return;
  }

  const x0 = (canvasWidth - columnsCount * COLUMN_WIDTH - (columnsCount - 1) * COLUMN_GAP) / 2;
  const maxColumnHeight = MAX_COLUMN_HEIGHT_COEFFICIENT * canvasHeight;
  const topGenreFilmsCount = filmsCountByGenres[0][1];

  for (let i = 0; i < columnsCount; ++i) {
    const genreName = filmsCountByGenres[i][0];
    const filmsCount = filmsCountByGenres[i][1];

    const columnHeight = maxColumnHeight * (filmsCount / topGenreFilmsCount);

    const x = x0 + i * (COLUMN_WIDTH + COLUMN_GAP);
    const y = canvasHeight - Y0 - columnHeight;

    const genreNameY = y + columnHeight + GENRE_NAME_GAP;
    const filmsCountY = y + columnHeight + FILMS_COUNT_GAP;

    renderColumn(ctx, x, y, COLUMN_WIDTH, columnHeight);
    renderGenreName(ctx, genreName, x + COLUMN_WIDTH / 2, genreNameY);
    renderFilmsCount(ctx, filmsCount, x + COLUMN_WIDTH / 2, filmsCountY);
  }
};

const renderStatisticsChart = (films: Film[], canvasElement: HTMLCanvasElement): void => {
  const ctx = canvasElement.getContext('2d');
  if (ctx) {
    let filmsCountByGenres = Array.from(getFilmsCountByGenres(films));
    filmsCountByGenres.sort((a, b) => b[1] - a[1]);
    filmsCountByGenres = filmsCountByGenres.slice(0, STATS_SHOWN_GENRES_COUNT);

    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    renderGenreColumns(ctx, filmsCountByGenres, canvasElement.width, canvasElement.height);
  }
};

export default renderStatisticsChart;

export type Handler = (evt: Event) => void;

export type FilmCardsHandlers = {
    markWatchedButtonClickHandler: Handler,
    watchlistButtonClickHandler: Handler,
    favoritesButtonClickHandler: Handler,
    popupOpenClickHandler: Handler,
    showMoreButtonClickHandler: Handler
};

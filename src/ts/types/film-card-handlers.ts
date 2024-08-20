export type Handler = (evt: Event) => void;

export type FilmCardHandlers = {
    markWatchedButtonClickHandler: Handler,
    watchlistButtonClickHandler: Handler,
    favoritesButtonClickHandler: Handler,
    popupOpenClickHandler: Handler
};

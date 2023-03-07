import { uuid } from "uuidv4";

export interface Game {
  id: string;
  players: { name: string; pointsHistory: number[] }[];
}

export const createGame = (players: string[]) => {
  const game: Game = {
    id: uuid(),
    players: players.map((player) => ({
      name: player,
      pointsHistory: [],
    })),
  };

  localStorage.setItem(`game.${game.id}`, JSON.stringify(game));

  return game;
};

export const listAllGames = () => {
  const games: Game[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("game.")) {
      const game = localStorage.getItem(key);

      if (!game) continue;

      games.push(JSON.parse(game) as Game);
    }
  }

  return games;
};

export const getGameById = (id: string) => {
  const game = localStorage.getItem(`game.${id}`);

  if (!game) return null;

  return JSON.parse(game) as Game;
};

export const updateGameById = (id: string, game: Game) => {
  localStorage.setItem(`game.${id}`, JSON.stringify({ ...game, id }));
  return game;
};

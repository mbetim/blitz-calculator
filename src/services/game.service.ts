import { uuid } from "uuidv4";

interface Game {
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

interface IPlayer {
  first_name: string;
  last_name: string;
  rating: number | string;
  handedness: string;
  submitted: boolean;
  id: number;
}
interface IPlayerList {
  players: [IPlayer?];
}

let playerList: IPlayerList = {
  players: []
};

// Check if playerlist is in stored locally and retrieve it
const getLocalPlayers = (): IPlayerList | void => {
  const localPlayerList = localStorage.getItem('players');
  if (localPlayerList !== null) {
    return JSON.parse(localPlayerList);
  } else {
    localStorage.setItem(
      'players',
      JSON.stringify({
        players: []
      })
    );
  }
  return;
};

// Save playerlist in local storage
const createLocalPlayers = (playersList: IPlayerList): IPlayerList | void => {
  localStorage.setItem('players', JSON.stringify(playersList));
};

export const getAllService = (): IPlayerList => {
  const localPlayers = getLocalPlayers();

  if (localPlayers !== undefined) {
    playerList = localPlayers;
  }

  return playerList;
};

export const delService = (id: number): IPlayerList => {
  playerList.players.splice(id, 1);
  createLocalPlayers(playerList);
  return playerList;
};

export const createService = (player: IPlayer): IPlayerList => {
  if (playerList.players !== undefined) {
    player.id = playerList.players.length;
  } else {
    player.id = 0;
  }
  playerList.players.push(player);
  createLocalPlayers(playerList);
  return playerList;
};

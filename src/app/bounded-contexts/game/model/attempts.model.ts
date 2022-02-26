import {User} from "../../menu/model/user.model";
import {EndGameInformations} from "./end-game.informations";

export class Attempts {
  id!: number;
  createdAt!: string;
  user!: User;
  endGameInformations!: EndGameInformations;
  phase!: string;
}

import {Idea} from '../ideas/idea';

export interface Game {
  id: string;
  left: Idea;
  right: Idea;
  winnerId?: string;
}

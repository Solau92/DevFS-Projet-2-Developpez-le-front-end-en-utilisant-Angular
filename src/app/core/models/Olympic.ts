// TODO: create here a typescript interface for an olympic country
/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/
import { Participation } from "./Participation";

// Classe 
export class Olympic {
    id!: number;
    country!: string;
    participations!: Participation[];
} 

// Ou interface :
/* export interface Olympic {
    id: number;
    country: string;
    participations: Participation[];
}
 */


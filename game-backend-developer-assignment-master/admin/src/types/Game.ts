/**
 * Represents a board game or expansion from the games.json dataset.
 *
 * This interface is based on structured metadata describing classic board games
 * and their relationships. Games can be either a "BaseGame" or an "Expansion".
 *
 * BaseGames may have a list of `expansions`.
 * Expansions refer back to a `baseGame` and may be `standalone`.
 * Some fields like `releaseYear` or `publisher` are optional for expansions.
 * The `players` field indicates the supported player count range.
 */
export interface Game {
  /** Unique ID of the game  */
  id: string;

  /** Game name
   * e.g. Catan, Pandemic: On the Brink */
  name: string;

  /** Publisher name
   * e.g. Kosmos, Z-Man Games */
  publisher?: string;

  releaseYear?: number;
  players?: {
    min: number;
    max?: number;
  };

  /** Distinguishes between 2 options: 
   * Base Game and Expansion */
  type: "BaseGame" | "Expansion";

  /** List of expansion IDs
   * (only present on base games) */
  expansions?: string[];

  /** ID of the base game this expansion belongs to */
  baseGame?: string;

  standalone?: boolean;
}

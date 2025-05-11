import { getFirestore } from "../../../src/apis/firestore/getFirestore";
import { getGames } from "../../../src/apis/firestore/games";

process.env.FIRESTORE_EMULATOR_HOST = "localhost:5005";

describe("Firestore: getGames()", () => {
  const db = getFirestore();

  beforeAll(async () => {
    // Seed a known game into Firestore
    await db.collection("games").doc("test-game").set({
      id: "test-game",
      name: "Test Game",
      releaseYear: 2023,
      publisher: "UnitTest Inc.",
      type: "BaseGame",
    });
  });

  afterAll(async () => {
    // Clean up after the test
    await db.collection("games").doc("test-game").delete();
  });

  it("should return an array including the seeded game", async () => {
    const games = await getGames();
    const match = games.find((g: any) => g.id === "test-game");

    expect(match).toBeDefined();
    expect(match).toBeDefined();
    if (!match) return;
    expect(match.name).toBe("Test Game");
  });
});

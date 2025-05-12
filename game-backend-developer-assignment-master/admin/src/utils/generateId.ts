export function generateId(): string {
    return 'game_' + Math.random().toString(36).substring(2, 10);
  }
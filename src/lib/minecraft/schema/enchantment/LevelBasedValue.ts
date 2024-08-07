type LevelBasedValue =
    | number
    | { type: "linear"; base: number; per_level_above_first: number }
    | { type: "clamped"; value: LevelBasedValue; min: number; max: number }
    | {
          type: "fraction";
          numerator: LevelBasedValue;
          denominator: LevelBasedValue;
      }
    | { type: "levels_squared"; added: number };

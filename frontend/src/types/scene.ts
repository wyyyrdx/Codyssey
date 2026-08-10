export type ActionType = "walk" | "jump" | "plant" | "pick" | "speak" | "idle";
export type Direction = "left" | "right" | "up" | "down";
export type Concept = "variable" | "if_else" | "loop" | "function";
export type Environment = "forest" | "city" | "desert" | "space";
export type FeedbackType = "success" | "error" | "warning" | "info";
export type ObjectType = "box" | "tree" | "rock" | "coin" | "flag" | "npc";

export interface Position {
  x: number;
  y: number;
}

export interface Action {
  type: ActionType;
  direction?: Direction;
  steps?: number;
  duration_ms?: number;
  repeat?: number;
  message?: string;
}

export interface SceneObject {
  id: string;
  type: ObjectType;
  label?: string;
  value?: number | string | boolean;
  position: Position;
  sprite?: string;
}

export interface Branch {
  condition: string;
  true_path: Action[];
  false_path: Action[];
  taken_path: "true" | "false";
}

export interface FunctionCall {
  name: string;
  action: Action;
  args?: Record<string, any>;
}

export interface Character {
  id: string;
  sprite: string;
  start_position: Position;
}


export interface Feedback {
  type: FeedbackType;
  message: string;
  explanation?: string;
  concept_detected?: Concept;
}

export interface ConsoleOutput {
  output: string[];
  errors: string[];
}

export interface SceneData {
  concept: Concept;
  environment: Environment;
  character: Character;
  actions: Action[];
  objects: SceneObject[];
  branches: Branch | null;
  function_calls: FunctionCall[];
}


export interface ScenePayload {
  success: boolean;
  feedback: Feedback;
  console: ConsoleOutput;
  scene: SceneData;
}


export interface RunCodeRequest {
  code: string;
  lesson_id?: string;
  concept_hint?: Concept;
}

from typing import list, Optional, Literal, Union
from pydantic import BaseModel, Field



class Position (BaseModel) :
    x : int
    y : int

class Action (BaseModel) :
    type : str
    direction : Optional [str] = None
    steps : Optional [int] = 1
    duration_ms : int=800
    repeat : int=1
    message : Optional [str] = None

class SceneObject (BaseModel) :
    id : str
    type : str 
    label : Optional [str] = None
    value : Optional [Union[int, str, bool]] = None
    position : Position
    sprite : Optional [str] = None 

class Branch (BaseModel) :
    condition : str
    true_path : List [Action]
    false_path : List [Action]
    taken_path : str 

class FunctionCall (BaseModel) :
    name : str
    action : Action
    args : Optional [dict] = None


class Character (BaseModel) :
    id : str = "hero"
    sprite : str = "hero_default"
    start_position : Position = Field(default_factory=lambda: Position(x=100, y=300))


class Feedback (BaseModel) :
    type : str
    message : str 
    explanation : Optional [str] = None
    concept_detected : Optional [str] = None


class ConsoleOutput (BaseModel) :
    output : List [str] = []
    errors : List [str] = []
 

class SceneData(BaseModel):
    concept : str 
    environment : str = "forest"
    character : Character = Field(default_factory=Character)
    actions : List [Action] = []
    objects : List [SceneObject] = []
    branches : Optional [Branch] = None
    function_calls : List [FunctionCall] = []


class ScenePayload (BaseModel) :
    success : bool
    feedback : Feedback
    console : ConsoleOutput
    scene : SceneData


class RunCodeRequest (BaseModel) :
    code : str
    lesson_id : Optional [str] = None
    concept_hint : Optional [str] = None



EXAMPLE_LOOP = {
    "success": True,
    "feedback": {
        "type": "success",
        "message": "Your loop ran 5 times successfully!",
        "explanation": "The for loop repeated the walk action 5 times.",
        "concept_detected": "loop"
    },
    "console": {
        "output": ["Starting loop...", "Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Done!"],
        "errors": []
    },
    "scene": {
        "concept": "loop",
        "environment": "forest",
        "character": {
            "id": "hero",
            "sprite": "hero_default",
            "start_position": {"x": 100, "y": 300}
        },
        "actions": [
            {
                "type": "walk",
                "direction": "right",
                "steps": 1,
                "duration_ms": 700,
                "repeat": 5
            }
        ],
        "objects": [],
        "branches": None,
        "function_calls": []
    }
}
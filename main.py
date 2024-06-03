from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import subprocess
import models, database

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to allow specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeExecutionRequest(BaseModel):
    code: str

@app.post("/api/execute")
def execute_code(request: CodeExecutionRequest, db: Session = Depends(database.get_db)):
    try:
        # Execute the code using subprocess
        process = subprocess.run(['python', '-c', request.code], capture_output=True, text=True)
        if process.returncode != 0:
            raise HTTPException(status_code=400, detail=process.stderr)

        # Save the code and output to the database
        code_execution = models.CodeExecution(code=request.code, output=process.stdout)
        #db.add(code_execution)
        #db.commit()
        #db.refresh(code_execution)
        return {"status": "success", "result": process.stdout}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/submit")
def submit_code(request: CodeExecutionRequest, db: Session = Depends(database.get_db)):
    try:
        # Execute the code using subprocess
        process = subprocess.run(['python', '-c', request.code], capture_output=True, text=True)
        if process.returncode != 0:
            raise HTTPException(status_code=400, detail=process.stderr)
        # Save the code to the database
        code_execution = models.CodeExecution(code=request.code, output=process.stdout)
        db.add(code_execution)
        db.commit()
        db.refresh(code_execution)
        return {"status": "success", "id": code_execution.id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))



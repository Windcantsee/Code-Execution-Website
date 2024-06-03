from sqlalchemy import create_engine, Column, Integer, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class CodeExecution(Base):
    __tablename__ = "code_executions"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(Text, nullable=False)
    output = Column(Text, nullable=False)

def create_tables():
    Base.metadata.create_all(bind=engine)
from fastapi import FastAPI
from vlp.src.routers import calculate_router
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(calculate_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешить все источники
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы
    allow_headers=["*"],  # Разрешить все заголовки
)

if __name__ == '__main__':
    uvicorn.run("main:app", port=8080, reload=True)
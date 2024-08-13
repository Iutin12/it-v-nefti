from fastapi import FastAPI
from routers import calculate_router
import uvicorn

app = FastAPI()
app.include_router(calculate_router)


if __name__ == '__main__':
    uvicorn.run("main:app", port=8080, reload=True)
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import sqlite3
import os

app = FastAPI(title="Web3 Tax Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = "taxlayer.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS compliance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            country TEXT,
            profit REAL,
            sales_volume REAL,
            tax_liability REAL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

class KYCSubmission(BaseModel):
    name: str = Field(default="John Doe", description="User name")
    country: str = Field(..., description="Country of taxation")
    profit: float = Field(..., description="Total Profit (USD)")
    sales_volume: float = Field(default=0.0, description="Total Sales Volume (USD)")
    tax_liability: float = Field(..., description="Computed Tax Liability (USD)")

@app.post("/api/kyc")
async def submit_kyc(submission: KYCSubmission):
    try:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute('''
            INSERT INTO compliance (name, country, profit, sales_volume, tax_liability)
            VALUES (?, ?, ?, ?, ?)
        ''', (submission.name, submission.country, submission.profit, submission.sales_volume, submission.tax_liability))
        conn.commit()
        record_id = c.lastrowid
        conn.close()
        return {"status": "success", "message": "KYC & Tax securely saved", "id": record_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/user/status")
async def get_user_status():
    try:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        # Just grab the latest record for hackathon demo
        c.execute('SELECT id, name, country, profit, sales_volume, tax_liability FROM compliance ORDER BY id DESC LIMIT 1')
        row = c.fetchone()
        conn.close()
        
        if row:
            return {
                "status": "verified",
                "data": {
                    "id": row[0],
                    "name": row[1],
                    "country": row[2],
                    "profit": row[3],
                    "sales_volume": row[4],
                    "tax_liability": row[5]
                }
            }
        return {"status": "pending", "data": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "ok"}


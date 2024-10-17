package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnvs() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file..")
	}
}

func GetServerAddr() string {
	return os.Getenv("PORT")
}

func GetMongoURI() string {
	return os.Getenv("MONGODB_URI")
}

func GetDbName() string {
	return os.Getenv("DB_NAME")
}

func GetSolanaRPC() string {
	return os.Getenv("SOLANA_RPC")
}

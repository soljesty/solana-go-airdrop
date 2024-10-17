package main

import (
	"solana-faucet/cmd"
	"solana-faucet/config"
	"solana-faucet/database"
)

func main() {

	config.LoadEnvs()

	database.InitMongodb()
	server := cmd.NewAPIServer(config.GetServerAddr())
	server.Run()
}

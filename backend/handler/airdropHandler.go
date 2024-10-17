package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"solana-faucet/database"
	"solana-faucet/models"
	"solana-faucet/service"
)

type AirdropRequestPayload struct {
	WalletAddress string `json:"wallet_address,omitempty"`
	Amount        int    `json:"amount,omitempty"`
}

func AirdropHandler(w http.ResponseWriter, r *http.Request) {
	var payload AirdropRequestPayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		log.Printf("Error decoding request: %v", err)
		http.Error(w, "Invalid request", http.StatusBadRequest)
	}

	log.Printf("Recived request for airdrop: %v", payload)

	// Check if wallet address is provided (validation)
	if payload.WalletAddress == "" {
		http.Error(w, "Wallet address cannot be empty", http.StatusBadRequest)
		return
	}

	//check the request limits (2 request per hour)
	requestCount, err := database.GetRequestCount(payload.WalletAddress)
	if err != nil || requestCount >= 2 {
		http.Error(w, "Too many request", http.StatusTooManyRequests)
		return
	}

	//process airdrop
	txHash, err := service.RequestAirdrop(payload.WalletAddress, payload.Amount)
	if err != nil {
		http.Error(w, "Airdrop Failed", http.StatusInternalServerError)
		return
	}

	//save request in database
	request := models.AirdropRequest{
		WalletAddress: payload.WalletAddress,
		Amount:        payload.Amount,
	}

	database.SaveAirDropRequest(request)

	///response with transactin hash
	json.NewEncoder(w).Encode(map[string]string{"transaction_hash": txHash})
}

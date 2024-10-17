package service

import (
	"context"
	"fmt"

	"github.com/blocto/solana-go-sdk/client"
	"github.com/blocto/solana-go-sdk/rpc"
)

func RequestAirdrop(walletAddress string, amount int) (string, error) {
	//c := client.NewClient(rpc.DevnetRPCEndpoint)
	c := client.NewClient(rpc.LocalnetRPCEndpoint)

	//8BnvFnjw8LgVSczRTsQG8vepCs6vdoH9TNYRL5UV81VD

	// Convert amount from SOL to lamports (1 SOL = 1e9 lamports)
	lamports := amount * 1e9

	txHash, err := c.RequestAirdrop(context.TODO(), walletAddress, uint64(lamports))
	if err != nil {
		return "", fmt.Errorf("failed to request airdrop: %v", err)
	}

	return txHash, nil
}

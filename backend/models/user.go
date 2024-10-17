package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type AirdropRequest struct {
	ID            primitive.ObjectID `bson:"id,omitempty"`
	WalletAddress string             `bson:"wallet_address,omitempty"`
	Amount        int                `bson:"amount,omitempty"`
	Timestamp     int64              `bson:"timestamp,omitempty"`
	GithubUser    string             `bson:"github_user,omitempty"`
	RequestCount  int                `bson:"request_count,omitempty"`
}

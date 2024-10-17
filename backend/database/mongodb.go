package database

import (
	"context"
	"log"
	"solana-faucet/config"
	"solana-faucet/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var db *mongo.Database

func InitMongodb() {
	clientOptions := options.Client().ApplyURI(config.GetMongoURI())
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("mongodb database connected...")

	db = client.Database(config.GetDbName())
}

func SaveAirDropRequest(request models.AirdropRequest) error {
	collection := db.Collection("airdrops")
	request.Timestamp = time.Now().Unix()
	_, err := collection.InsertOne(context.TODO(), request)
	return err
}

func GetRequestCount(wallet string) (int, error) {
	collection := db.Collection("airdrops")
	filter := bson.M{"wallet_address": wallet}

	count, err := collection.CountDocuments(context.TODO(), filter)
	if err != nil {
		return 0, err
	}
	return int(count), nil
}

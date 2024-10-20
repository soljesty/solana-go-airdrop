package cmd

import (
	"log"
	"net/http"
	"solana-faucet/handler"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

// server struct
type APIServer struct {
	listenAddr string
}

func NewAPIServer(listenAddr string) *APIServer {
	return &APIServer{
		listenAddr: listenAddr,
	}
}

func (s *APIServer) Run() {
	router := mux.NewRouter()

	router.HandleFunc("/airdrop", handler.AirdropHandler).Methods("POST")

	//add CORS middleware
	// Add CORS middleware
	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	log.Printf("Server running on http://localhost%s", s.listenAddr)
	err := http.ListenAndServe(s.listenAddr, handlers.CORS(originsOk, headersOk, methodsOk)(router))
	if err != nil {
		log.Fatal(err.Error())
	}
}

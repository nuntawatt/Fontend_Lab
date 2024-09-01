"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  sprites: { other: { "official-artwork": { front_default: string } } };
}

export default function Page() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((res) => res.json())
      .then((data) => setPokemons(data.results))
      .catch((err) => console.error("Error fetching Pokemon data:", err));
  }, []);

  const handleShowDetails = (name: string) => {
    router.push(`/pokemon/${name}`);
  };

  return (
    <div className="container">
      <h1>Pokedex Lab</h1>
      <div className="row">
        {pokemons.map((pokemon, index) => (
          <div className="col-3" key={index}>
            <div
              className="card"
              style={{ marginBottom: "1rem", cursor: "pointer" }}
              onClick={() => handleShowDetails(pokemon.name)}
            >
              <img
                className="card-img-top"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`}
                alt={`Image of ${pokemon.name}`}
                style={{ width: "100%", height: "auto" }}
              />
              <div className="card-body">
                <h5 className="card-title">{pokemon.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

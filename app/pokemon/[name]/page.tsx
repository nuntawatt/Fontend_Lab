"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: { other: { "official-artwork": { front_default: string } } };
}

export default function Page() {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    const getPokemonDetails = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data: PokemonDetails = await res.json();
        setPokemon(data);
      } catch (err) {
        console.error("Error fetching Pokémon details:", err);
      }
    };
    getPokemonDetails();
  }, [name]);

  if (!pokemon) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>{pokemon.name}</h1>
      <Image
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        width={300}
        height={300}
      />
      <p><strong>Height:</strong> {pokemon.height / 10} m</p>
      <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
      <p><strong>Stats:</strong></p>
      {pokemon.stats.map((stat) => (
        <div key={stat.stat.name}>
          {stat.stat.name}: {stat.base_stat}
        </div>
      ))}
    </div>
  );
}

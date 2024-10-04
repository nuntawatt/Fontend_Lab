"use client";
import Link from "next/link";
import React from "react";

interface PokemonList {
  count: number;
  next: string;
  previous?: any;
  results: Pokemon[];
}

interface Pokemon {
  name: string;
  url: string;
}

export default function Page() {
  const [pokemonData, setPokemonData] = React.useState<PokemonList>({} as PokemonList);
  const [displayCount, setDisplayCount] = React.useState(20);

  React.useEffect(() => {
    const getData = async () => {
      const result = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1500")
        .then((res) => res.json())
        .then((res) => {
          const pokemonData: PokemonList = res as PokemonList;
          setPokemonData(pokemonData);
        })
        .catch((err) => console.error(err));
    };
    getData();
  }, []);

  const DisplayPokemonList = () => {
    if (pokemonData && pokemonData.results) {
      const displayedPokemons = pokemonData.results.slice(0, displayCount); 
      return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {displayedPokemons.map((p) => {
            const pokemonId = p.url.split('/')[6];
            const imgURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`; 
            return (
              <li key={p.name} className="bg-red-200 shadow-md rounded-lg p-1 text-center">
                <img src={imgURL} alt={p.name} className="mx-auto w-24 h-24" /> 
                <Link href={`/pokemon/${p.name}`} className="text-red-600 hover:text-yellow-600 font-semibold text-2xl">
                  {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                </Link>
              </li>
            );
          })}
        </ul>
      );
    } else {
      return (
        <div className="flex justify-center items-center h-screen">
          <img 
            src="https://media.tenor.com/AN7EVQ3CG0UAAAAi/pikachu-pokemon.gif"
            alt="Loading..."
            className="mx-auto w-56 h-56" 
          />
        </div>
      );
    }
  };

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 20); 
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold text-center mb-6 text-red-600">Pokémon List</h1>
      <DisplayPokemonList />
      <div className="text-center mt-5">
        <button onClick={handleShowMore} className="btn btn-primary">
          Show More
        </button>
      </div>
    </div>
  );
}

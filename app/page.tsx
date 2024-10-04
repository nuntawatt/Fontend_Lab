"use client";

import React, { useEffect, useState } from 'react';

const PokedexPage = () => {
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true); // Loading state
    const limit = 8;

    const loadPokemon = async (offset: number, limit: number) => {
        try {
            setLoading(true); // Set loading to true before fetching
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            const data = await response.json();
            const newPokemonList = await Promise.all(data.results.map(async (element: any, index: number) => {
                const id = offset + index + 1;
                const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const pokemonData = await pokemonResponse.json();

                return {
                    id,
                    name: element.name.charAt(0).toUpperCase() + element.name.slice(1),
                    imgURL: pokemonData.sprites.other['official-artwork'].front_default, 
                };
            }));

            if (offset === 0) {
                setPokemonList(newPokemonList);
            } else {
                setPokemonList((prev) => [...prev, ...newPokemonList]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    useEffect(() => {
        loadPokemon(offset, limit);
    }, [offset]);

    return (
        <div 
            className="container mx-auto mt-5 p-5"
            style={{ 
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            <h1 className="text-4xl font-bold mb-5 text-red-600"> Pokémon </h1>

            {loading ? ( 
                <div className="flex justify-center items-center">
                    <img 
                        src="https://media.tenor.com/AN7EVQ3CG0UAAAAi/pikachu-pokemon.gif" 
                        alt="Loading Pokémon"
                        className="w-32 h-32"
                    />
                </div>
            ) : (
                <div id="name" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {pokemonList.map((pokemon) => (
                        <div key={pokemon.id} className="card bg-red-200 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img src={pokemon.imgURL} alt={pokemon.name} className="w-48 h-48 lg:w-64 lg:h-64 rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title text-red-600">{pokemon.name}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && ( // Show button only when not loading
                <div className="text-center mt-5">
                    <button id="show-more" className="btn btn-primary" onClick={() => setOffset(offset + limit)}>Show More</button>
                </div>
            )}
        </div>
    );
};

export default PokedexPage;

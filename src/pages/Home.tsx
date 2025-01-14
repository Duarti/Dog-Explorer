import React from 'react';
import { Link } from 'react-router-dom';
import StyledButton from '@components/shared/StyledButton';
import StyledImage from '@components/shared/StyledImage';

const homeDogInfo = [
    {
        name: 'Labrador Retriever',
        imageUrl: '/assets/images/labrador.jpg',
        description:
            'Friendly, outgoing, and high-spirited companions. Perfect for families and active owners.',
    },
    {
        name: 'German Shepherd',
        imageUrl: '/assets/images/german_shepherd.jpg',
        description:
            'Intelligent and versatile, known for their loyalty and protective nature.',
    },
    {
        name: 'Golden Retriever',
        imageUrl: '/assets/images/golden_retriever.jpg',
        description:
            'Kind and trustworthy dogs, famous for their friendly temperament and intelligence.',
    },
];

const Home: React.FC = () => {
    return (
        <div
            className="flex flex-col text-center p-6 min-h-[100%]"
            style={{
                backgroundImage: 'url(/assets/images/dog_wallpaper.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <section className="mb-8 bg-white bg-opacity-75 p-6 rounded">
                <h2 className="text-3xl font-bold mb-4">Explore Dog Breeds</h2>
                <p className="text-lg mb-6">
                    Discover different dog breeds, filter by size, temperament,
                    and more, and learn how to care for your favorite breeds.
                </p>
                <Link to="/dashboard">
                    <StyledButton>Browse Dog Breeds</StyledButton>
                </Link>
            </section>

            <section className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr p-4">
                {homeDogInfo.map((dog, index) => (
                    <div
                        key={index}
                        className="p-4 border rounded shadow-sm bg-white bg-opacity-75 min-h-72"
                    >
                        <StyledImage
                            src={dog.imageUrl}
                            alt={dog.name}
                            className="w-full h-48 object-contain md:object-cover rounded mb-4"
                        />
                        <h3 className="text-xl font-bold mb-2">{dog.name}</h3>
                        <p className="text-sm">{dog.description}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Home;

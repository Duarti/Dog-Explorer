export enum VOTE_ENUM {
    DOWNVOTE,
    UPVOTE,
}

export interface DogData {
    weight: {
        imperial: string;
        metric: string;
    };
    height: {
        imperial: string;
        metric: string;
    };
    id: number;
    name: string;
    bred_for?: string;
    breed_group?: string;
    life_span: string;
    temperament?: string;
    origin?: string;
    reference_image_id?: string;
    image: {
        id: string;
        width: number;
        height: number;
        url: string;
    };
}

export interface Dog {
    id: number;
    name: string;
    bredFor?: string;
    lifeSpan: string;
    referenceImageId: string;
    image: {
        url: string;
    };
}

export type SortOption =
    | 'name-asc'
    | 'name-desc'
    | 'lifespan-asc'
    | 'lifespan-desc';

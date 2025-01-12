export enum VOTE_ENUM {
    DOWNVOTE,
    UPVOTE,
}

export enum SORT_OPTION_ENUM {
    NAME_ASC,
    NAME_DESC,
    LIFESPAN_ASC,
    LIFESPAN_DESC,
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
    reference_image_id: string;
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
    temperament?: string;
    origin?: string;
    referenceImageId: string;
    image: {
        url: string;
    };
}

export type ButtonType = 'primary' | 'secondary';

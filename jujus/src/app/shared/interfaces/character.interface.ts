export interface Character {
    id: number;
    name: string;
    image: string;
    species: string;
    gender: string;
    created: string;
    status: string;
    episodeName: string;
    episode:  string[];
    location: {
        name:string;
        url: string;
    };

}

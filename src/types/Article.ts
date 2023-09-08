
interface Expedition {
    dateExp : Date | null;
    dejaExp : number;
}

export interface Article {
    ligne : number;
    code : string;
    quantite : number;
    delai? : Date | null;
    precedent? : Date | null;
    expedition : Expedition;
    montant : number;
    valid: boolean;
}
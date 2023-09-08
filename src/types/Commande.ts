import { Article } from './Article';
import { Message } from './Message';

interface address {
    street2: string | null;
    street3: string | null;
    livName: string | null;
    city: string | null;
    zip: string | null;
    country: string | null;
    tel: string | null;
}
export interface Commande {
    cde: string;
    reference: string;
    client: string;
    messages?: Array<Message>;
    address: address;
    articles: Array<Article>;
}

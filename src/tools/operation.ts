import { Commande } from './../types/Commande';
import { Article } from '../types/Article';
import { Message } from '../types/Message';

export class DelaiOperation {
    public static pbDelai = (article: Article): boolean => {
        return article.valid && article.delai !== article.precedent ? true : false;
    };
    public static pbDelaibyCommande = (commande: Commande): boolean => {
        return commande.articles.some(
            (article: Article) =>
                article.delai?.getTime() !== article.precedent?.getTime() && article.valid
        );
    };

    public static sortByPbDelai = (a: Article, b: Article): number => {
        return DelaiOperation.pbDelai(a) && !DelaiOperation.pbDelai(b)
            ? -1
            : !DelaiOperation.pbDelai(a) && DelaiOperation.pbDelai(b)
            ? 1
            : 0;
    };

    public static numberOfCdesWithPbDelai = (cdes: Commande[]): number => {
        let count = 0;
        cdes.forEach((cde: Commande) => {
            if (
                cde.articles.some(
                    (article) =>
                        article.delai?.getTime() !== article.precedent?.getTime() && article.valid
                )
            ) {
                count++;
            }
        });
        return count;
    };

    public static newCommande = (commande: Commande): boolean => {
        return commande.articles.some(
            (article) =>
                article.delai?.getTime() !== article.precedent?.getTime() &&
                article.valid &&
                !article.precedent
        );
    };

    // showIfAlert(): boolean {
    //     return this.state.commande.articles.some(
    //         (article) => article.delai?.getTime() !== article.precedent?.getTime() && article.valid
    //     );
    // }
    // showIfNew(): boolean {
    //     return this.state.commande.articles.some(
    //         (article) =>
    //             article.delai?.getTime() !== article.precedent?.getTime() && article.valid && !article.precedent
    //     );
    // }
}

export class MessageOperation {
    public static sortByMostRecent = (a: Message, b: Message): number => {
        return a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0;
    };

    public static numberOfUnreadByCde = (cdes: Commande, userEmail: string): number => {
        let count = 0;
        cdes.messages?.forEach((message) => {
            if (message.isRead === false && message.spAccount !== userEmail) {
                count++;
            }
        });

        return count;
    };

    public static numberOdCdeWithUnRead = (cdes: Commande[], userEmail: string): number => {
        let count = 0;
        cdes.forEach((cde) => {
            if (MessageOperation.numberOfUnreadByCde(cde, userEmail) > 0) {
                count++;
            }
        });

        return count;
    };
}

// 024822

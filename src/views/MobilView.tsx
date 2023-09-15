import * as React from 'react';
import DataManager from '../services/dataManager';
import { ICommercialViewProps } from '../types/ICommercialViewProps';
import { Container } from '@mui/material';
import MainComponent from '../components/MainComponent';
import AlertComponent from '../alert/AlertComponent';
import { Commande } from '../types/Commande';
import { Representant } from '../types/Representant';
import { Article } from '../types/Article';
import { Message } from '../types/Message';
type state = {
    reps: Representant[];
    openSpedDial: boolean;
    snackbar: {
        open: boolean;
        message: string;
        severity: 'success' | 'info' | 'warning' | 'error' | undefined;
    };

    randomInfo: {
        title: string;
        content: string;
        color: 'success' | 'info' | 'warning' | 'error';
    };
};
export default class MobilView extends React.Component<ICommercialViewProps, state> {
    constructor(props: ICommercialViewProps) {
        super(props);
        this.state = {
            reps: [
                {
                    repName: 'aucun représentant',
                    cdes: [
                        {
                            cde: 'aucune commande',
                            client: 'aucun client',
                            reference: 'aucune référence',
                            messages: [],
                            articles: [
                                {
                                    ligne: 0,
                                    code: 'aucun code',
                                    quantite: 0,
                                    expedition: {
                                        dejaExp: 0,
                                        dateExp: null
                                    },
                                    delai: new Date(),
                                    valid: false
                                }
                            ],
                            address: {
                                street2: "Pas d'adresse",
                                street3: '',
                                livName: '',
                                city: '',
                                zip: '',
                                country: 'France',
                                tel: '0000000'
                            }
                        }
                    ]
                }
            ],
            openSpedDial: false,
            snackbar: {
                open: false,
                message: '',
                severity: undefined
            },
            randomInfo: {
                title: '',
                content: '',
                color: 'info'
            }
        };
    }

    componentDidMount(): void {
        const orders = DataManager.getCommands(this.props.userEmail);
        DataManager.haveVersion()
            .then((res: any) => {
                res.data.status !== 'error'
                    ? orders
                          .then((representants) => {
                              const newRepresntants: Representant[] = representants.data.map(
                                  (representant: any) => {
                                      const { repName, commandes } = representant;
                                      const newCdes = commandes.map((commande: any) => {
                                          const { cde, client, reference, address, messages } =
                                              commande;

                                          const newArticles = commande.articles.map(
                                              (article: any) => {
                                                  const {
                                                          ligne,
                                                          code,
                                                          quantite,
                                                          delai,
                                                          precedent,
                                                          expedition,
                                                          valid
                                                      } = article,
                                                      year = delai.substring(0, 4),
                                                      month = delai.substring(4, 6) - 1,
                                                      day = delai.substring(6, 8);
                                                  const art: Article = {
                                                      valid,
                                                      ligne,
                                                      code,
                                                      quantite: quantite,

                                                      delai: new Date(year, month, day),
                                                      precedent: precedent
                                                          ? new Date(
                                                                precedent.substring(0, 4),
                                                                precedent.substring(4, 6) - 1,
                                                                precedent.substring(6, 8)
                                                            )
                                                          : null,
                                                      expedition: {
                                                          dejaExp: expedition.dejaExp,
                                                          dateExp: expedition.dateExp
                                                              ? new Date(
                                                                    expedition.dateExp.substring(
                                                                        0,
                                                                        4
                                                                    ),
                                                                    expedition.dateExp.substring(
                                                                        4,
                                                                        6
                                                                    ) - 1,
                                                                    expedition.dateExp.substring(
                                                                        6,
                                                                        8
                                                                    )
                                                                )
                                                              : null
                                                      }
                                                  };
                                                  return art;
                                              }
                                          );
                                          const cd: Commande = {
                                              cde,
                                              client,

                                              messages:
                                                  messages !== undefined
                                                      ? messages.map((message: any) => {
                                                            const {
                                                                rep,
                                                                message: messageContent,
                                                                spAccount,
                                                                createdAt,
                                                                cde,
                                                                isRead,
                                                                contact,
                                                                pbDelai
                                                            } = message;
                                                            const newMessage: Message = {
                                                                rep,
                                                                message: messageContent,
                                                                spAccount,
                                                                createdAt: new Date(createdAt),
                                                                cde,
                                                                isRead,
                                                                pbDelai,
                                                                contact: {
                                                                    firstName: contact.firstName,
                                                                    lastName: contact.lastName
                                                                }
                                                            };
                                                            return newMessage;
                                                        })
                                                      : [],
                                              reference,
                                              address: {
                                                  tel: address.tel,
                                                  city: address.city,
                                                  zip: address.zip,
                                                  street2: address.street,
                                                  street3: address.street,
                                                  country: address.country,
                                                  livName: address.livName
                                              },

                                              articles: newArticles
                                          };
                                          return cd;
                                      });

                                      const rep: Representant = {
                                          repName,

                                          cdes: newCdes
                                      };
                                      return rep;
                                  }
                              );
                              this.setState({ reps: newRepresntants, randomInfo: res.data.info });
                          })
                          .catch((error) => {
                              this.setState({
                                  randomInfo: {
                                      title: 'Erreur',
                                      content:
                                          'Une erreur est survenue lors de la récupération des données',
                                      color: 'error'
                                  }
                              });
                          })
                    : this.setState({ randomInfo: res.data.info });
            })
            .catch((err: any) => {
                this.setState({
                    randomInfo: {
                        title: 'Erreur',
                        content: 'Impossible de vérifier la version',
                        color: 'error'
                    }
                });
            });
    }

    showSnackbar = (message: string, severity: 'success' | 'info' | 'warning' | 'error'): void => {
        this.setState({
            snackbar: {
                open: message.trim().length > 0,
                message: message,
                severity: severity
            }
        });
    };

    render(): JSX.Element {
        return (
            <Container maxWidth={false}>
                <MainComponent
                    reps={this.state.reps}
                    usermail={this.props.userEmail}
                    showSnackbar={this.showSnackbar}
                />

                <AlertComponent
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    severity={this.state.snackbar.severity}
                    onClose={(): void => {
                        this.setState({
                            snackbar: { open: false, message: '', severity: undefined }
                        });
                    }}
                />
            </Container>
        );
    }
}

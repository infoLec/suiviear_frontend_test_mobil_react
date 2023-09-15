// import { TableRows } from '@mui/icons-material';
import { LocalShipping as LocalShippingIcon, Factory as FactoryIcon } from '@mui/icons-material';
import { TableCell, TableRow, Tooltip, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import { SxProps } from '@mui/system';

import { Article } from '../types/Article';
import { red } from '@mui/material/colors';
import { DelaiOperation } from '../tools/operation';
import { dateFormate } from '../tools/formate';

type cell = {
    name: React.ReactNode;
    sx?: SxProps;
};

interface ArticleElementProps {
    article: Article;
}

interface ArticleElementState {
    openExpTooltip: boolean;
    onpenDelaiTooltip: boolean;
}

export default class ArticleElement extends React.Component<
    ArticleElementProps,
    ArticleElementState
> {
    constructor(props: ArticleElementProps) {
        super(props);
        this.state = {
            openExpTooltip: false,
            onpenDelaiTooltip: false
        };
    }

    public getTooltipContent(article: Article): JSX.Element {
        const { expedition, quantite } = article;

        return expedition.dejaExp !== 0 ? (
            <Tooltip
                open={this.state.openExpTooltip}
                onClose={(): void => this.setState({ openExpTooltip: false })}
                title={
                    <React.Fragment>
                        <p>Quantité expédiée : {expedition.dejaExp}</p>
                        <p>
                            Date expédition :{' '}
                            {expedition.dateExp !== null
                                ? expedition.dateExp.toLocaleDateString('fr-FR', {
                                      year: 'numeric',
                                      month: 'numeric',
                                      day: 'numeric'
                                  })
                                : 'pas de date'}
                        </p>
                    </React.Fragment>
                }
                placement="top">
                <IconButton
                    onClick={(): void =>
                        this.setState({ openExpTooltip: !this.state.openExpTooltip })
                    }
                    size="small"
                    sx={{
                        color: expedition.dejaExp === quantite ? 'success.main' : 'warning.main'
                    }}>
                    <LocalShippingIcon />
                </IconButton>
            </Tooltip>
        ) : (
            <Tooltip
                open={this.state.openExpTooltip}
                onClose={(): void => this.setState({ openExpTooltip: false })}
                title="Non expédié"
                placement="top">
                <IconButton
                    onClick={(): void =>
                        this.setState({ openExpTooltip: !this.state.openExpTooltip })
                    }
                    size="small"
                    sx={{ color: 'error.main' }}>
                    <FactoryIcon />
                </IconButton>
            </Tooltip>
        );
    }

    render(): React.ReactNode {
        const { code, quantite, delai, ligne } = this.props.article;
        const cells: cell[] = [
            {
                name: code,
                sx: {
                    backgroundColor: DelaiOperation.pbDelai(this.props.article)
                        ? red[500]
                        : undefined,
                    color: DelaiOperation.pbDelai(this.props.article) ? 'white' : undefined
                }
            },
            {
                name: ligne,
                sx: {
                    backgroundColor: DelaiOperation.pbDelai(this.props.article)
                        ? red[500]
                        : undefined,
                    color: DelaiOperation.pbDelai(this.props.article) ? 'white' : undefined
                }
            },
            {
                name: quantite,
                sx: {
                    backgroundColor: DelaiOperation.pbDelai(this.props.article)
                        ? red[500]
                        : undefined,
                    color: DelaiOperation.pbDelai(this.props.article) ? 'white' : undefined
                }
            },
            {
                name: delai ? (
                    <Tooltip
                        placement="top"
                        open={this.state.onpenDelaiTooltip}
                        onClose={() => this.setState({ onpenDelaiTooltip: false })}
                        title={dateFormate(delai)}>
                        <Typography
                            onClick={() =>
                                this.setState({ onpenDelaiTooltip: !this.state.onpenDelaiTooltip })
                            }
                            sx={{
                                padding: 0,
                                minWidth: 0,
                                margin: 0
                            }}
                            variant="button">
                            {dateFormate(delai)}
                        </Typography>
                    </Tooltip>
                ) : (
                    'Pas de date'
                ),
                sx: {
                    backgroundColor: DelaiOperation.pbDelai(this.props.article)
                        ? red[500]
                        : undefined,
                    color: DelaiOperation.pbDelai(this.props.article) ? 'white' : undefined
                }
            },
            {
                name: this.getTooltipContent(this.props.article),
                sx: {
                    backgroundColor: DelaiOperation.pbDelai(this.props.article)
                        ? red[500]
                        : undefined,
                    color: DelaiOperation.pbDelai(this.props.article) ? 'white' : undefined
                }
            }
        ];

        return (
            <TableRow>
                {cells.map((cell, index) => (
                    <TableCell sx={cell.sx} key={index}>
                        {cell.name}
                    </TableCell>
                ))}
            </TableRow>
        );
    }
}

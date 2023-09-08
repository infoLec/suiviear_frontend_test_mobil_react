// import { TableRows } from '@mui/icons-material';
import { TableCell, TableRow } from '@mui/material';
import * as React from 'react';
import { SxProps } from '@mui/system';
import { LocalShipping } from '@mui/icons-material';
import { Article } from '../types/Article';

type cell = {
    name: string | React.ReactNode;
    sx?: SxProps;
};

interface ArticleElementProps {
    article: Article;
}

export class ArticleElement extends React.Component<ArticleElementProps> {
    render(): React.ReactNode {
        const { code, quantite, delai, ligne } = this.props.article;
        const cells: cell[] = [
            {
                name: code
            },
            {
                name: ligne
            },
            {
                name: quantite
            },
            {
                name: delai?.toDateString()
            },
            {
                name: <LocalShipping />
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

// import { TableRows } from '@mui/icons-material';
import { TableCell, TableRow } from '@mui/material';
import * as React from 'react';

type cell = {
    name: string | React.ReactNode;
    sx: any | undefined;
};

export class ArticleElement extends React.Component {
    render(): React.ReactNode {
        const cells: cell[] = [
            {
                name: 'Article',
                sx: {
                    width: '50%'
                }
            },
            {
                name: 'Quantité',
                sx: {
                    width: '25%'
                }
            }
        ];

        return (
            <TableRow>
                {cells.map((cell, index) => (
                    <TableCell sx={cell.sx} key={index} align="center" variant="head">
                        {cell.name}
                    </TableCell>
                ))}
            </TableRow>
        );
    }
}

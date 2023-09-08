import * as React from 'react';

import {
    Container,
    // TableCell,
    // TableRow,
    // Typography,
    Table
} from '@mui/material';
import { ArticleElement } from './ArticleElement';
// const header = ['Article', 'ligne', 'quantité', 'délai', 'expédition'];
export class ArticleList extends React.Component {
    render(): React.ReactNode {
        return (
            <Container
                maxWidth="md"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflow: 'auto', // added overflow property
                    maxHeight: '400px',
                    border: '1px solid black',
                    borderRadius: '5px'
                }}>
                <Table
                    sx={{
                        width: 'auto'
                    }}>
                    {
                        /* <TableRow>
                        {header.map((item, index) => (
                            <TableCell key={index}>
                                <Typography>{item}</Typography>
                            </TableCell>
                        ))}
                    </TableRow> */

                        Array.from({ length: 10 }).map((_, index) => (
                            <ArticleElement
                                key={index}
                                article={{
                                    code: '-COFSP-1R7562M',
                                    ligne: 32,
                                    quantite: 1,
                                    delai: new Date('2021-10-01T00:00:00.000Z'),
                                    expedition: {
                                        dateExp: new Date('2021-10-01T00:00:00.000Z'),
                                        dejaExp: 0
                                    },
                                    valid: true
                                }}
                            />
                        ))
                    }
                </Table>
            </Container>
        );
    }
}

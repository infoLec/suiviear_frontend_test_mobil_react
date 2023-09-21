import * as React from 'react';

import {
    Container,
    // TableCell,
    // TableRow,
    // Typography,
    Table
} from '@mui/material';
import ArticleElement from './ArticleElement';
import { Article } from '../../types/Article';
// const header = ['Article', 'ligne', 'quantité', 'délai', 'expédition'];

type props = {
    articles: Article[];
};
export default class ArticleList extends React.Component<props> {
    render(): React.ReactNode {
        return (
            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflow: 'auto', // added overflow property
                    overflowX: 'hidden',
                    height: '375px',
                    border: '1px solid black',
                    borderRadius: '5px'
                    // width: '100%'
                }}>
                <Table
                    sx={{
                        width: '100%'
                    }}>
                    {this.props.articles.map((article: Article, index) => (
                        <ArticleElement key={index} article={article} />
                    ))}
                </Table>
            </Container>
        );
    }
}

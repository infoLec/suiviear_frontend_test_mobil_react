import * as React from 'react';
import { ICommercialViewProps } from '../types/ICommercialViewProps';
import { Container } from '@mui/material';
import { HeaderComponent } from '../components/HeaderComponent';
import { CommandInfo } from '../components/CommandInfo';
import { ArticleList } from '../components/ArticleList';

export class MobilView extends React.Component<ICommercialViewProps> {
    render() {
        return (
            <Container maxWidth={false}>
                <HeaderComponent />
                <CommandInfo />
                <ArticleList />
            </Container>
        );
    }
}

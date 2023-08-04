import React from 'react';
import Sites from '../components/Site';
import { Grid, Item, Image, Icon, Container, Header } from 'semantic-ui-react';

export default function Home(){
    return(
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>留白</Grid.Column>
                    <Grid.Column width={10}>
                        <Header>場館選擇</Header>
                        <Sites/>
                    </Grid.Column>
                    <Grid.Column width={3}>留白</Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )

}
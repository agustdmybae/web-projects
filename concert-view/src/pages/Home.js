import React from 'react';
import Sites from '../components/Site';
import { Grid, Item, Image, Icon, Container } from 'semantic-ui-react';

export default function Home(){
    return(
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}><Sites/></Grid.Column>
                    <Grid.Column width={10}>中間</Grid.Column>
                    <Grid.Column width={3}>留白</Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )

}
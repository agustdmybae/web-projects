import React from 'react';
import { Grid } from 'semantic-ui-react';

export default function Home(){
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={3}>主題</Grid.Column>
                <Grid.Column width={10}>貼文</Grid.Column>
                <Grid.Column width={3}>留白</Grid.Column>
            </Grid.Row>

        </Grid>
    )
}
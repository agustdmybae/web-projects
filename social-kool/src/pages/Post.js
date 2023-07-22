import React from 'react';
import { Grid, Container, Image } from 'semantic-ui-react';
import Topics from '../components/Topics';
import { useParams } from 'react-router-dom';

import firebase from '../utils/firebase';

export default function Post(){
    const{ postId }=useParams();
    const [post, setPost]= React.useState({});
    React.useEffect(()=>{
        firebase.firestore().collection("posts").doc(postId).get().then((docSnapshot)=>{
            const data = docSnapshot.data();
            setPost(data);
        })
    })
    return(
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Topics/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Image src={post.author.photoURL}/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        留白
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        </Container>
    );
}
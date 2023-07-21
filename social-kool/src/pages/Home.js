import React from 'react';
import firebase from '../utils/firebase';
import 'firebase/compat/firestore';
import Topics from '../components/Topics'
import { Grid } from 'semantic-ui-react';

export default function Posts(){
    const [posts, setPosts] = React.useState([]);
    React.useEffect(()=>{
        firebase.firestore().collection("posts").get().then((collectionSnapshot)=>{
            const data = collectionSnapshot.docs.map(docSnapShot => {
                return docSnapShot.data();
            })
            setPosts(data);
        })
    })
    return(
        <Grid>
            <Grid.Row>
                <Grid.Column width={3}>
                    <Topics/>
                </Grid.Column>
                <Grid.Column width={10}>{
                    posts.map(post=>{
                        return <p>{post.title}</p>
                    })
                }</Grid.Column>
                <Grid.Column width={3}>
                    留白
                </Grid.Column>

            </Grid.Row>
        </Grid>
    )

}
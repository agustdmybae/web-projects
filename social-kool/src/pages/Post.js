import React from 'react';
import { Grid, Container, Image, Header, Segment,Icon } from 'semantic-ui-react';
import Topics from '../components/Topics';
import { useParams } from 'react-router-dom';

import firebase from '../utils/firebase';
import 'firebase/compat/firestore'

export default function Post(){
    const{ postId }=useParams();
    const [post, setPost]= React.useState({
        author: {},
    });
    React.useEffect(()=>{
        firebase.firestore().collection("posts").doc(postId).get().then((docSnapshot)=>{
            const data = docSnapshot.data();
            setPost(data);
        })
    })
    //判斷文章是否有被收藏過
    const isCollected = post.collectedBy?.includes(firebase.auth().currentUser.uid);
    //function for collecting posts 收藏文章
    function toggleCollected(){
        const uid = firebase.auth().currentUser.uid;
        if (isCollected){
            firebase.firestore().collection("posts").doc(postId).update({
                collectedBy: firebase.firestore.FieldValue.arrayRemove(uid),
            })
        } else {
            firebase.firestore().collection("posts").doc(postId).update({
                collectedBy: firebase.firestore.FieldValue.arrayUnion(uid),
            })
        }
        
    }

    return(
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Topics/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Image src={post.author.photoURL ? post.author.photoURL : <Icon name="user circle"/>}/> {post.author.displayName || "user"}
                        <Header>
                            {post.title}
                            <Header.Subheader>
                                {post.topic}/{post.createdAt ? post.createdAt.toDate().toLocaleDateString() : "time"}
                            </Header.Subheader>
                        </Header>
                        <Image src={post.imageURL}/>
                        <Segment basic vertical>{post.content}</Segment>
                        <Segment basic vertical>
                            留言0 * 讚 0 * 
                            <Icon name="thumbs up outline" color="grey"></Icon> * 
                            <Icon 
                                name={`bookmark ${isCollected ? "" : "outline"}`} 
                                color= {isCollected ? "blue" : "grey" }
                                link 
                                onClick={toggleCollected}
                            />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}
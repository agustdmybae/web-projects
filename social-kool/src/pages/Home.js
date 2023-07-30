import React from 'react';
import firebase from '../utils/firebase';
import 'firebase/compat/firestore';
import Topics from '../components/Topics'
import { Grid, Item, Image, Icon, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Posts(){
    const [posts, setPosts] = React.useState([]);
    React.useEffect(()=>{
        firebase.firestore().collection("posts").get().then((collectionSnapshot)=>{
            const data = collectionSnapshot.docs.map(docSnapShot => {
                const id = docSnapShot.id;
                return {...docSnapShot.data(), id};
            })
            setPosts(data);
        })
    })
    return(
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Topics/>
                    </Grid.Column>
                    <Grid.Column width={10}>{
                        <Item.Group>
                            {posts.map(post=>{
                                return (
                                    <Item key={post.id} as={Link} to={`/posts/${post.id}`}>
                                        <Item.Image src={post.imageURL||"https://react.semantic-ui.com/images/wireframe/image.png"} size="small"/>
                                        <Item.Content>
                                            <Item.Meta>
                                                {post.author.photoURL ? <Image src={post.author.photoURL}/> : <Icon name="user circle"/>}
                                                {post.topic}。{post.author.displayName || "user"}
                                            </Item.Meta>
                                            <Item.Header>{post.title}</Item.Header>
                                            <Item.Description>{post.content}</Item.Description>
                                            <Item.Extra>
                                                留言 {post.commentsCount}。讚 {post.likedBy ? post.likedBy.length : 0}
                                            </Item.Extra>
                                        </Item.Content>
                                    </Item>
                                )
                            })}
                        </Item.Group>
                    }</Grid.Column>
                    <Grid.Column width={3}>
                        留白
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        </Container>
    )

}
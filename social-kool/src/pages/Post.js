import React from 'react';
import { Grid, Container, Image, Header, Segment,Icon, Comment, Form } from 'semantic-ui-react';
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
        //用 onSnaptshot 即時監聽、取代原本的 get+then
        firebase.firestore().collection("posts").doc(postId).onSnapshot((docSnapshot)=>{
            const data = docSnapshot.data();
            setPost(data);
        })
    })
    //判斷文章是否有被收藏過
    const isCollected = post.collectedBy ? post.collectedBy.includes(firebase.auth().currentUser.uid) : false;
    //判斷文章是否有被按讚過
    const isLiked = post.likedBy ? post.likedBy.includes(firebase.auth().currentUser.uid) : false;
    //檢查文章 active 功能 e.g. isLiked, isCollected
    function toggle(isActive, field){
        const uid = firebase.auth().currentUser.uid;
        firebase.
            firestore().
            collection("posts").
            doc(postId).
            update({
                [field]: isActive
                    ? firebase.firestore.FieldValue.arrayRemove(uid)
                    : firebase.firestore.FieldValue.arrayUnion(uid),
            })
    }



    return(
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Topics/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        {post.author.photoURL ? <Image src={post.author.photoURL}/> : <Icon name="user circle"/>}
                        {post.author.displayName || "user"}
                        <Header>
                            {post.title}
                            <Header.Subheader>
                                {post.topic}*{post.createdAt ? post.createdAt.toDate().toLocaleDateString() : "time"}
                            </Header.Subheader>
                        </Header>
                        <Image src={post.imageURL}/>
                        <Segment basic vertical>{post.content}</Segment>
                        <Segment basic vertical>
                            留言0 * 讚 {post.likedBy ? post.likedBy.length : 0} * 
                            <Icon 
                                name={`thumbs up ${isLiked ? "" : "outline"}`}
                                color= {isLiked ? "blue" : "grey" } 
                                link
                                onClick={()=>toggle(isLiked, 'likedBy')}
                            /> * 
                            <Icon 
                                name={`bookmark ${isCollected ? "" : "outline"}`} 
                                color= {isCollected ? "blue" : "grey" }
                                link 
                                onClick={()=>toggle(isCollected, 'collectedBy')}
                            />
                        </Segment>
                        <Comment.Group>
                            <Form reply>
                                <Form.TextArea/>
                                <Form.Button>留言</Form.Button>
                            </Form>
                            <Header>共1則留言</Header>
                            <Comment>
                                <Comment.Avatar src=''/>
                                <Comment.Content>
                                    <Comment.Author as="span">留言者名稱</Comment.Author>
                                    <Comment.Metadata>{new Date().toLocaleString}</Comment.Metadata>
                                    <Comment.Text>留言內容</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        </Comment.Group>
                        
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}
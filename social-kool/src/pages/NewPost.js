import React from "react";
import firebase from "../utils/firebase";
import 'firebase/compat/firestore';
import { Container, Header, Form } from "semantic-ui-react";

export default function NewPost(){
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [topics, setTopics] = React.useState([]);
    const [topicName, setTopicName] = React.useState("");

    React.useEffect(()=>{
        firebase
        .firestore()
        .collection("topics")
        .get()
        .then((collectionSnapshot)=>{
            const data = collectionSnapshot.docs.map(doc=>{
                return doc.data();
            })
            setTopics(data);
        })
    })

    const options = topics.map(topic=>{
        return({
            text:topic.name,
            value:topic.name,
        }) 
    })

    return (
        <Container>
            <Header>發表文章</Header>
            <Form>
                <Form.Input 
                    placeholder='輸入文章標題' 
                    value={title} 
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <Form.TextArea
                    placeholder='輸入文章內容' 
                    value={content} 
                    onChange={(e)=>setContent(e.target.value)}
                />
                <Form.Dropdown
                    placeholder='選擇文章主題'
                    options={options}
                    selection
                    value={topicName}
                    onChange={(e, {value})=>setTopicName(value)}
                />
            </Form>
        </Container>
    )
}
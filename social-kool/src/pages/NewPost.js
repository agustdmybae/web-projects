import React from "react";
import firebase from "../utils/firebase";
import 'firebase/compat/firestore';
import { Container, Header, Form, Image, Button } from "semantic-ui-react";

export default function NewPost(){
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [topics, setTopics] = React.useState([]);
    const [topicName, setTopicName] = React.useState("");
    const [image, setImage] = React.useState(null);

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

    const previewURL = image ? URL.createObjectURL(image) : "https://react.semantic-ui.com/images/wireframe/image.png"

    return (
        <Container>
            <Header>發表文章</Header>
            <Form>
                <Image src={previewURL} size="small" floated="left"/>
                <Button basic as="label" htmlFor="post-image">上傳文章圖片</Button>
                <Form.Input 
                    type="file" 
                    id="post-image" 
                    style={{display: 'none'}}
                    onChange={(e)=>setImage(e.target.files[0])}
                />
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
                <Button>送出</Button>
            </Form>
        </Container>
    )
}
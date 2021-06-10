import {useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getConversations} from "../utils/requests/message";

function Conversations() {
    const user = useSelector(userSelector);

    const [updateValue, setUpdateValue] = useState(false);
    const update = () => setUpdateValue(updateValue + 1);

    const [conversationViewed, setConversationViewed] = useState({id:0})
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    console.log("conversations", conversations)

    useEffect(() => {
        getConversations().then(value => setConversations(value));
        // getConversations().then(value => setConversations(value));
    }, [updateValue]);



    const scrollDown = () => {
        const element = document.getElementById("messageDiv");
        element.scrollTop = element.scrollHeight;
    }

    const handleSendClick = () => {
        ;
    }


    return <>

        <div style={{height: '85vh', width: '99vw'}} className={"d-lg-inline-flex justify-content-evenly"}> {/* Contient tout */}

            <div style={{width: '25vw', display: 'block', overflowY: "auto"}} className={"border-end container-fluid"}>{/* La partie contact */}
                <div style={{width: '22vw', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    {
                        conversations.map((conversation, i) => (
                            <div className={"p-3 border-bottom "+  (conversationViewed.id === conversation.id ? "fw-bold" : "")} key={i} style={{cursor:"pointer"}} onClick={() => setConversationViewed(conversation)}>
                                {conversation.user.name}
                            </div>
                        ))
                    }

                    {/*<div className={"p-3 border-bottom"}>*/}
                    {/*    Contact 2*/}
                    {/*</div>*/}
                    {/*<div className={"p-3 border-bottom"}>*/}
                    {/*    Contact 3*/}
                    {/*</div>*/}
                    {/*<div className={"p-3 border-bottom"}>*/}
                    {/*    Contact 4*/}
                    {/*</div>*/}

                </div>
            </div>

            <div style={{width: '75vw'}} className={""}>{/* La partie messages */}

                <div id={"messageDiv"} style={{scrollBehavior: 'revert', height: '67vh', display: 'block', overflowY: "auto"}} className={"container-fluid"}>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>

                        <Message content={user?.mail} isMyMessage={false}/>
                        <Message content={user?.name} isMyMessage={true}/>
                        <Message content={user?.mail} isMyMessage={false}/>
                        <Message content={user?.name} isMyMessage={true}/>
                        <Message content={user?.mail} isMyMessage={false}/>
                        <Message content={user?.name} isMyMessage={true}/>
                        <Message content={user?.name} isMyMessage={true}/>
                        <Message content={user?.mail} isMyMessage={false}/>
                        <Message content={user?.name} isMyMessage={true}/>
                        <Message content={"hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola " +
                                          "hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola " +
                                          "hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola"} isMyMessage={false}/>
                        <Message content={user?.name} isMyMessage={true}/>
                        <Message content={user?.mail} isMyMessage={false}/>

                    </div>
                </div>


                <hr/>


                <div className={"d-lg-inline-flex justify-content-center container pt-2"}>

                    <div className={"w-75"}>
                        <div className={"container-fluid"}>
                            <Form.Control
                                type={"text"}
                                className={"bg-light text-fogra29 border"}
                                placeholder={"Enter new message here ..."}/>
                        </div>
                    </div>

                    <div className={""}>
                        <Button className={"float-end"}
                                variant={"outline-primary"}
                                onClick={() => handleSendClick()}>
                            Send
                        </Button>
                    </div>

                </div>

            </div>
        </div>

    </>
}


const Message = ({content, isMyMessage}) => {
    return <div className={"container-fluid px-2 py-3 my-1"}>
        <div style={{display: "block"}} className={"py-3 container-fluid"}>
            <div
                style={{borderRadius: 25, maxWidth: '50vw'}}
                className={"text-fogra29 p-2 " + (isMyMessage ? "float-end mr-1 bg-honey" : "float-start ml-1 bg-silver")}>
                {content ? content : ""}
            </div>
        </div>
    </div>
}

export default Conversations;

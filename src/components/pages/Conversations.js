import {useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {addMessage, getConversations, getMessages} from "../utils/requests/message";
import {useParams} from "react-router-dom";

function Conversations() {
    const user = useSelector(userSelector);
    const conversationIdFromParam = parseInt(useParams().conversationId)


    const [updateValue, setUpdateValue] = useState(0);
    const update = () => setUpdateValue((value) => value + 1);

    const [isConversationSelected, setIsConversationSelected] = useState(false);
    const [text, setText] = useState("");
    const [conversationViewed, setConversationViewed] = useState({id: conversationIdFromParam || 0})
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        getConversations().then(value => setConversations(value));
    }, [updateValue]);

    useEffect(() => {
        if (conversationViewed.id !== 0) {
            getMessages(conversationViewed.id).then(value => {
                setMessages(prevState => {
                    if (
                        prevState.length
                        !==
                        value.length) {
                        setTimeout(() => scrollDown(), 5)
                        return value;
                    }
                    return prevState;
                })

            })
        }
    }, [updateValue, conversationViewed])

    useEffect(() => {
        const interval = setInterval(() => {
            update()
        }, 3000)
        return () => clearInterval(interval);
    }, [])


    const scrollDown = () => {
        const element = document.getElementById("messageDiv");
        element.scrollTop = element?.scrollHeight;
    }

    const handleSendSubmit = (event) => {
        event.preventDefault();
        if (conversationViewed.id !== 0 && text !== "") {
            addMessage(conversationViewed.id, text).then(() => {
                update();
            })
            setText("");
        }
    }


    return <>

        <div style={{minHeight: '87vh', width: '99vw'}}
             className={"d-lg-inline-flex justify-content-evenly"}> {/* Contient tout */}

            <div style={{width: '25vw', display: 'block', overflowY: "auto"}}
                 className={"border-end container-fluid"}>{/* La partie contact */}
                <div style={{width: '22vw', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    {
                        conversations.length > 0 ?

                            conversations.map((conversation, i) => (
                                <div
                                    className={"p-3 border-bottom " + (conversationViewed.id === conversation.id ? "fw-bold" : "")}
                                    key={i} style={{cursor: "pointer"}}
                                    onClick={() => {
                                        setConversationViewed(conversation);
                                        setIsConversationSelected(true)
                                    }}>
                                    {conversation.user.name}
                                </div>
                            ))
                            :
                            <div className={"text-center text-muted mt-5 text-size-2"}>
                                <div>
                                    On dirait que vous n'avez pas de contacts
                                </div>
                                <br/>
                                <div>
                                    Contactez quelqu'un en vous rendant sur la page d'une de ses résidences
                                </div>
                            </div>
                    }


                </div>
            </div>

            <div style={{width: '75vw'}} className={""}>{/* La partie messages */}

                <div id={"messageDiv"}
                     style={{scrollBehavior: 'revert', height: '67vh', display: 'block', overflowY: "auto"}}
                     className={"container-fluid"}>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>

                        {
                            messages.length > 0 ?
                                messages.map((message, i) => (
                                    <Message key={i} content={message.text} isMyMessage={message.fromUser}/>
                                ))
                                :
                                isConversationSelected ?
                                    <div className={"text-center text-muted mt-5 pt-5 text-size-2"}>
                                        Pas de messages
                                    </div>
                                    :
                                    <div className={"text-center text-muted mt-5 pt-5 text-size-4"}>
                                        Sélectionnez un contact <br/>
                                        <i className={"bi-arrow-left"}/>
                                    </div>
                        }


                    </div>
                </div>


                <hr/>

                <Form onSubmit={event => handleSendSubmit(event)}>
                    <div className={"d-lg-inline-flex justify-content-center container pt-2"}>

                        <div className={"w-75"}>
                            <div className={"container-fluid"}>
                                <Form.Control
                                    type={"text"}
                                    value={text}
                                    onChange={(event) => setText(event.target.value)}
                                    className={"bg-light text-fogra29 border"}
                                    placeholder={"Enter new message here ..."}/>
                            </div>
                        </div>

                        <div>

                            <Button className={"float-end"}
                                    variant={"outline-primary"}
                                    type={"submit"}
                                    disabled={conversationViewed.id === 0}>
                                Send
                            </Button>

                        </div>


                    </div>
                </Form>

            </div>
        </div>

    </>
}


const Message = ({content, isMyMessage}) => {
    return <div className={"container-fluid px-2 py-2 my-1"}>
        <div style={{display: "block"}} className={"container-fluid"}>
            <div
                style={{borderRadius: 25, maxWidth: '50vw'}}
                className={"text-fogra29 p-2 " + (isMyMessage ? "float-end mr-1 bg-honey" : "float-start ml-1 bg-silver")}>
                {content ? content : ""}
            </div>
        </div>
    </div>
}

export default Conversations;

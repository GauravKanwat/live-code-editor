import { React, useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import Client from '../Components/Client';
import Editor from '../Components/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

const EditorPage = () => {
    const socketRef = useRef(null);
    const location = useLocation();
    const { roomId } = useParams();
    const reactNavigator = useNavigate();
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();

            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(err) {
                console.log('socket error', err);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }
            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                userName:location.state?.userName,
            });

            // Listening for Joined event
            socketRef.current.on(ACTIONS.JOINED, ({clients, userName}) => {
                
                // notify to clients other than the current user
                if(userName != location.state?.userName) {
                    toast.success(`${userName} has joined the room`);
                    console.log(`${userName} joined`);
                }
                setClients(clients);
            })

            // Listening for disconnected
            socketRef.current.on(ACTIONS.DISCONNECTED, ({socketId, userName}) => {
                toast.success(`${userName} has left the roomm`);
                console.log(`${userName} has left`);
                setClients((prev) => {
                    return prev.filter(
                        (client) => client.socketId !== socketId
                    )
                })
            })
        }
        init();

        return () => {
            if(socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current.off(ACTIONS.JOINED);
                socketRef.current.off(ACTIONS.DISCONNECTED);
            }
        }
    }, []);

    if(!location.state) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='mainWrap'>
            <div className="aside">
                <div className="asideInner">
                    <div className="logo">
                        <img className='logoImage' src="/code-sync.png" alt="logo" />
                    </div>
                    <h3>Connected</h3>
                    <div className="clientsList">
                        {clients.map((client) => (
                            <Client 
                                key = {client.socketId}
                                userName = {client.userName} 
                            />
                        ))}
                    </div>
                </div>
                <button className='btn copyBtn'>Copy Room ID</button>
                <button className='btn leaveBtn'>Leave</button>
            </div>
            <div className="editorWrap">
                <Editor socketRef= {socketRef} roomId={roomId}/>
            </div>
        </div>
    )
}

export default EditorPage

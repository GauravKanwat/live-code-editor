import { React, useState } from 'react';
import Client from '../Components/Client';
import Editor from '../Components/Editor';

const EditorPage = () => {
    const [clients, setClients] = useState([
        { socketId: 1, userName: 'Gaurav'},
        { socketId: 2, userName: 'John doe'},
        { socketId: 3, userName: 'Rakesh K'},
    ]);
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
                <Editor />
            </div>
        </div>
    )
}

export default EditorPage

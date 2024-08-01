import React, { useState } from 'react'
import {v4 as uuidV4} from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        console.log(id)
        toast.success('Created a new room!');
    }

    const joinRoom = () => {
        if(!roomId || !userName) {
            toast.error("Room ID & User Name is required!");
            return;
        }

        // Redirect
        navigate(`/editor/${roomId}`, {
            state: {
                userName,
            }
        })

    }

    const handleInputEnter = (e) => {
        if(e.code === 'Enter')
            joinRoom();
    }

    return (
        <div className='homePageWrapper'>
            <div className="formWrapper">
                <img className='homePageLogo' src="/code-sync.png" alt="code-sync-logo" />
                <h4 className='mainLabel'>Paste invitation Room ID</h4>
                <div className="inputGroup">
                    <input
                        type="text"
                        className='inputBox'
                        placeholder='Room ID'
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />
                    <input
                        type="text"
                        className='inputBox'
                        placeholder='UserName'
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        onKeyUp={handleInputEnter}
                    />
                    <button className='btn join-btn' onClick={joinRoom}>Join</button>
                    <span className="createInfo">
                        Don't have an invite? &nbsp;
                        <a onClick={createNewRoom} href="" className='createNewBtn'>Create new room</a>
                    </span>
                </div>
            </div>
            <footer>
                <h4>Built with 💛 by <a href="https://github.com/GauravKanwat">Gaurav Kanwat</a></h4>
            </footer>
        </div>
    )
}

export default Home

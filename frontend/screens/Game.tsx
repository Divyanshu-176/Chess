import Chessboard from "../components/Chessboard"
import Button from "../components/Button"
import {useSocket} from "../hooks/useSocket"
import { useEffect, useState } from "react"
import { Chess } from "chess.js"

export const INIT_GAME = "init_game"
export const MOVE = "move"
export const GAME_OVER = "game_over"


export const Game = ()=>{
    const socket = useSocket()
    const [chess, setChess] = useState(new Chess())
    const [board, setBoard] = useState(chess.board())
    const [started, setStarted] = useState(false)
    const [color, setColor] = useState(null)

    useEffect(()=>{
        if(!socket){
            return
        }
        socket.onmessage=(event)=>{
            const message = JSON.parse(event.data)
            console.log(message)
            switch(message.type){
                case INIT_GAME:
                    setBoard(chess.board())
                    setStarted(true)
                    setColor(message.payload.color)
                    console.log(color)
                    console.log("Game initialized")
                    break;
                case MOVE:
                    const move = message.payload
                    chess.move(move)
                    setBoard(chess.board())
                    console.log("move made");
                    break;
                case GAME_OVER:
                    console.log("Game over");
                    break; 
            }
        }
    },[socket])

    if(!socket) return <div>connecting.....</div>

    return <div className="min-h-screen text-white flex justify-center items-center">
        <div className="pt-8 max-w-screen w-full">
            <div className="flex gap-4 w-full ">
                
                <div className="col-span-4 w-full flex justify-center  ">
                    <Chessboard chess={chess} setBoard={setBoard} board={board} socket={socket}/>
                </div>

                <div className="w-full   ">
                    <div className="pt-4 w-100  px-10 h-full rounded-2xl bg-[#262522] flex justify-center items-start">
                        {!started ? <Button onClick={()=>{
                            socket.send(JSON.stringify({
                                type:INIT_GAME
                            }))
                        }}>Play</Button> : <div className="font-semibold text-4xl">{`You are  ${color}!`}</div> } 
                    </div>         
                </div>
                
            </div>
        </div>
    </div>
}
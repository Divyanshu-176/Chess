import { useState } from "react";
import { MOVE } from "../screens/Game";
import { type Color, type PieceSymbol, type Square } from "chess.js";


const Chessboard = ({board, socket, setBoard, chess}:{
    board: ({
            square: Square;
            type: PieceSymbol;
            color: Color;
        } | null)[][];
    socket:WebSocket;
    setBoard:any;
    chess:any
}) => {

  const [from, setFrom] = useState<Square | null>(null)

  return (
    <div className="text-black ml-10">
      {board.map((row,i)=>{
        return <div key={i} className="flex">
            {row.map((square,j)=>{
              const squareRepresentation = String.fromCharCode(97 + (j%8)) + "" + (8- i) as Square
                return <div onClick={()=>{
                  if(!from){
                    setFrom(squareRepresentation)
                  }else{
                    
                    socket.send(JSON.stringify({
                      type:MOVE,
                      payload:{
                        move:{
                          from:from,
                          to:squareRepresentation
                        }
                      }
                    }))

                    setFrom(null)
                    chess.move({
                      from,
                      to:squareRepresentation
                    });
                    setBoard(chess.board())
                  }
                }} key={j} className={`w-20 h-20  ${(i+j)%2 === 0 ? 'bg-[#EBECD0]' : "bg-[#779556]"}`}>
                    <div className="w-full justify-center flex h-full">
                        <div className="h-full justify-center flex flex-col">
                            {square ? <img  className="" src={`/assets/${square?.color === "w" ? square?.type: `${square?.type?.toUpperCase()} copy`}.png`} /> : null }
                        </div>
                        
                    </div>
                </div>
            })}
        </div>
      })}
    </div>
  )
}

export default Chessboard

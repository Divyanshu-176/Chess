import { useNavigate } from "react-router-dom"
import Button from "../components/Button"

export const Landing = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex flex-col text-white">
               
            <main className="grow flex items-center justify-center  bg-cover">
                <img src="/Chessboard.gif" className="w-150 h-150 rounded "/>

                <div className="bg-[#262522] bg-opacity-60 p-8 rounded-2xl text-center max-w-lg">
                    <h1 className="text-5xl font-extrabold mb-4">Play Chess Online</h1>
                    <p className="mb-6">
                        Join players from around the world. Free. Fast. Fun.
                    </p>
                    <Button onClick={()=>{navigate("/game")}}>
                        <div className="flex gap-2">
                            <img src="https://www.chess.com/bundles/web/images/color-icons/play-white.svg" className="w-7 h-7"/>
                            <span >Play Now</span>
                        </div>                    
                    </Button>
                </div>
            </main>

        </div>
    )
}
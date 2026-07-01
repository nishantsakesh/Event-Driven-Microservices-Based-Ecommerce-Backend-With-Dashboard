function AudioToast({

    message

}){

    if(!message) return null;

    return(

        <div
            className="
            fixed
            bottom-10
            right-10
            bg-white
            text-black
            px-6
            py-4
            rounded-full"
        >

            {message}

        </div>

    );

}

export default AudioToast;
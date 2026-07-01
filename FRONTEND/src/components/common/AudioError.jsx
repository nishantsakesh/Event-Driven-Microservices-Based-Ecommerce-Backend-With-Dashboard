function AudioError({

    message="Something went wrong."

}){

    return(

        <div className="text-center py-20 text-red-400">

            {message}

        </div>

    );

}

export default AudioError;
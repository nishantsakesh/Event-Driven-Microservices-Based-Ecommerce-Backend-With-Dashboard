function AudioInput({

    ...props

}) {

    return (

        <input

            {...props}

            className="
            w-full
            rounded-2xl
            bg-white/5
            border
            border-white/10
            px-6
            py-4
            text-white
            outline-none
            focus:border-white"

        />

    );

}

export default AudioInput;
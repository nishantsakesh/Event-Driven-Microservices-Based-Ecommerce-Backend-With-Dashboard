import { stats } from "../../constants/stats";

export default function Stats() {
    return (
        <div className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4">

            {stats.map((item) => (

                <div
                    key={item.title}
                    className="text-center"
                >
                    <h2 className="text-4xl font-bold">
                        {item.number}
                    </h2>

                    <p className="mt-2 text-slate-400">
                        {item.title}
                    </p>
                </div>

            ))}

        </div>
    );
}